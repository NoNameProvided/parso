# parso

_parso_ is a lightweight and performant date parser for terrible date formats, it aims to help you with parsing inconsistently formatted dates.

**Details TL;DR**

* includes a sane predefined set of parsers for ISO-ish date-time strings
* supports customization via custom parsers
* tree shakable structure, so you bundle only what you use

**What is not included?**

* modifying Date objects - use [date-fns][date-fns] for that!
* timezone handling - use [spacetime][spacetime] for that!

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

The API of parso includes two functions - `parse` and `parseOrThrow` to parse _dateish_ or _date-timeish_ strings. Neither of them require any default options, but their behaviour can be customized via an optional second settings object. The only difference between them is the latter will throw an error if none of the registered parsers can process the passed in string.

```ts
import { parse, parseOrThrow, ParsoParseError } from 'parso';

const validValue = '2023.08-21';
const invalidValue = 'you-will-never-parse-me';

try {
  parse(validValue);         // returns new Date('2023-08-21T00:00:00Z')
  parseOrThrow(validValue);  // returns new Date('2023-08-21T00:00:00Z')

  parse(invalidValue);        // returns null
  parseOrThrow(invalidValue); // throws ParsoParseError
} catch (error: ParsoParseError) {
  error instanceof ParsoParseError // true
}
```

### Registering handlers

By default only a sane set of parsers for the ISO 8601-ish formats are included. You can register your custom handlers with the `registerParser` function, this will register the parser globally.

Extra parsers are included for extreme formats, you can import them from 'parso/parsers'. You can read more about the included parsers in [their documentation][parsers].

### Writing custom parsers

Date parsers are simple functions, they must meet the following criteria:

* must be sync
* must return `undefined` when failed to parse it's value

### API

_TBD - TODO: Move this to docs/api.md_

**`parse(value: string | number | Date, parseOptions: ParseOptions): Date | null`**

**`parseOrThrow(value: string | number | Date, parseOptions: ParseOptions): Date`**

**`ParserRegistry` class**

**`ParseOptions` interface**

**`DateParser` type**


[parsers]: ./docs/parsers.md
[date-fns]: https://github.com/date-fns/date-fns
[spacetime]: https://github.com/spencermountain/spacetime
