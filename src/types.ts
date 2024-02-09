export type Plugin<T> = (config: T) => T | Promise<T>;
