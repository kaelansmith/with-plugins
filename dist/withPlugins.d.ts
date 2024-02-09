import { Plugin } from "./types";
export declare function withPlugins<T>(config: T, plugins: Plugin<T>[]): Promise<T>;
