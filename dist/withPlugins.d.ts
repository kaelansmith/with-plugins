import { Plugin } from "./types";
/**
 * Applies an array of plugins to a configuration object.
 * @param config The configuration object to apply the plugins to.
 * @param plugins The array of plugins to apply. Each plugin is a function that receives the current configuration object and returns a new configuration object.
 * @returns The final configuration object after all plugins have been applied.
 */
export declare function withPlugins<T>(config: T, plugins: Plugin<T>[]): Promise<T>;
