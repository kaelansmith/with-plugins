export type Plugin<T> = (config: T) => Promise<T>;
export declare function withPlugins<T>(config: T, plugins: Plugin<T>[]): Promise<T>;
