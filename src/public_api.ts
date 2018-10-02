
/**
 * Export typing info 
 */
export * from './interfaces';
export * from './errors';

/**
 * Export parser registry singleton so users can register their own parsers.
 */
export { ParserRegistry } from './parser-registry.class';

/**
 * Export MAIN API for general usage.
 */
export * from './parse.function';
export * from './parse-or-throw.function';