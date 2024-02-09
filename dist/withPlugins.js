"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPlugins = void 0;
async function withPlugins(config, plugins) {
    if (Array.isArray(plugins)) {
        const configAfterPlugins = await plugins.reduce(async (acc, plugin) => {
            const configAfterPlugin = await acc;
            return plugin(configAfterPlugin);
        }, Promise.resolve(config));
        return configAfterPlugins;
    }
    return config;
}
exports.withPlugins = withPlugins;
