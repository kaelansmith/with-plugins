export type Plugin<T> = (config: T) => T | Promise<T>;
export declare function withPlugins<T>(config: T, plugins: Plugin<T>[]): Promise<T>;
