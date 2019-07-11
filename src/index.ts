import { DefaulParserRegistry } from './parser-registry.class';
import { validDateParser, dashDateParser } from './parsers';

/**
 * We have to register the default parsers in the default registry before usage.
 *
 * > Note: The order or registration matters. The first matched parsers will be used always.
 */
DefaulParserRegistry.registerParsers([validDateParser, dashDateParser]);

export * from './public_api';
