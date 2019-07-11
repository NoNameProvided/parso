# Parso [![Build Status](https://travis-ci.com/NoNameProvided/parso.svg?token=vtTA9yuf6Qfrwwgxq3tZ&branch=develop)](https://travis-ci.com/NoNameProvided/parso) [![codecov](https://codecov.io/gh/NoNameProvided/parso/branch/develop/graph/badge.svg?token=vAJEca7nbI)](https://codecov.io/gh/NoNameProvided/parso)

_Parso_ is a lightweight and performant date parser for terrible date formats, it aims to help you with parsing inconsistently formatted dates.

**Details TL;DR**

- includes a sane predefined set of parsers for ISO-ish date-time strings
- supports customization via custom parsers
- tree shakable structure, so you bundle only what you use

**What is not included?**

- modifying Date objects - use [date-fns][date-fns] for that!
- timezone handling - use [spacetime][spacetime] for that!

## Installation

Install with npm:

```bash
npm install --save parso
```

Install with yarn:

```bash
yarn add parso
```

## Usage

```ts
import { parse } from 'parso';

const easter = parse('20180401');
const christmas = parse('2018-12-24');
const newYear = parse('2010.01.01');
```

## Documentation

### Parsing dates

Parso has a simple API, it exposes two functions - `parse` and `parseOrThrow` to parse _dateish_ or _date-timeish_ strings. Neither of them require any default options, but their behaviour can be customized via an optional second settings object. The only difference between them is the latter will throw an error if none of the registered parsers can process the passed in value.

```ts
import { parse, parseOrThrow, ParsoParseError } from 'parso';

const validValue = '2023.08-21';
const invalidValue = 'you-will-never-parse-me';

try {
  parse(validValue); // returns new Date('2023-08-21T00:00:00Z')
  parseOrThrow(validValue); // returns new Date('2023-08-21T00:00:00Z')

  parse(invalidValue); // returns null
  parseOrThrow(invalidValue); // throws ParsoParseError
} catch (error) {
  error instanceof ParsoParseError; // true
}
```

### Registering non default parsers

By default only a sane set of parsers for the ISO 8601-ish formats are included in the default registry. You can register non-default or your custom handlers with the `defaulParserRegistry.registerParser` function.

Extra parsers are included for extreme formats, you can import them from 'parso/parsers'. You can read more about the included parsers in [their documentation][parsers].

### Writing custom parsers

Parsers are simple functions which implement the `DateParser` type. They must meet the following criteria:

- must be sync
- must return `undefined` when failed to parse the recieved value

Example:

```ts
/**
 * Parses a valid date string.
 */
export const validDateParser: DateParser = (value: string | number): Date | undefined => {
  const invalidDate = Number.isNaN(new Date(value).getTime());

  return invalidDate ? undefined : new Date(value);
};
```

You can read more about custom parsers in [their documentation][parsers].

## API

### `parse` function

Tries to parse the recieved value into a `Date` object with the registered parsers, returns `null` when the parsing attempt fails.

**Possible return values:**

- `Date` instance
- `null` value when none of the parsers can parse the recieived value

**Possible errors:**

- `ParsoInvalidInputError` when the recieved value is not a `string`, `number` or `Date` type.

**Signature:**

```ts
parse(value: string | number | Date, parseOptions: ParseOptions): Date | null
```

---

### `parseOrThrow` function

Tries to parse the recieved value into a `Date` object with the registered parsers, throws an instance of `ParsoParseError` error when the parsing attempt fails.

**Possible return values:**

- `Date` instance

**Possible errors:**

- `ParsoInvalidInputError` when the recieved value is not a `string`, `number` or `Date` type.
- `ParsoParseError` when none of the registered parsers can parser the recieved value.

**Signature:**

```ts
parseOrThrow(value: string | number | Date, parseOptions: ParseOptions): Date
```

### `ParserRegistry` class

A `ParserRegistry` instance can be used to store parsers. Which later can be passed into the parse functions via the `parseOptions.customRegistry` option.

```ts
import { ParserRegistry, parse } from 'parso';
import { myCustomParser } from './my-custom-parser';

const customRegistry = new ParserRegistry();

customRegistry.registerParsers(myCustomParser);

parse('2019_08_01', { customRegistry });
```

Parso exports a default registry instance named `defaulParserRegistry` which is used by the parser functions when no custom registry is specified.

---

### `DateParser` type

See the [parser documentation][parsers] for details.

[parsers]: docs/parsers.md
[date-fns]: https://github.com/date-fns/date-fns
[spacetime]: https://github.com/spencermountain/spacetime

## License

[MIT](./LICENSE)

[schd-official-page]: https://fireflyworlds.com/games/strongholdcrusader/
