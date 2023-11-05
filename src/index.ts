export type Plugin<T> = (config: T) => Promise<T>;

export async function withPlugins<T>(
  config: T,
  plugins: Plugin<T>[]
): Promise<T> {
  if (Array.isArray(plugins)) {
    const configAfterPlugins = await plugins.reduce(async (acc, plugin) => {
      const configAfterPlugin = await acc;
      return plugin(configAfterPlugin);
    }, Promise.resolve(config));
    return configAfterPlugins;
  }
  return config;
}
