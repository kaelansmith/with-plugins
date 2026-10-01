"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPlugins = withPlugins;
/**
 * Applies an array of plugins to a configuration object.
 * @param config The configuration object to apply the plugins to.
 * @param plugins The array of plugins to apply. Each plugin is a function that receives the current configuration object and returns a new configuration object.
 * @returns The final configuration object after all plugins have been applied.
 */
async function withPlugins(config, plugins) {
    if (!Array.isArray(plugins))
        return config;
    const final = await plugins.reduce(async (curr, plugin) => {
        const prev = await curr;
        return plugin(prev);
    }, Promise.resolve(config));
    return final;
}
