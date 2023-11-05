# with-plugins

A type-safe, dead-simple, drop-in plugin system for JS/TS configuration objects -- whether it's for your own library/package/SDK, or someone else's. Oh and it's tiny -- literally a few lines of code.

## Install

```bash
npm install @kaelan/with-plugins
```

## Docs

Inspired by [Payload CMS](https://github.com/payloadcms/payload)' simple [plugin system](https://payloadcms.com/docs/plugins/overview), the `withPlugins` function simply receives a config object, and an array of plugins, where each plugin is a user-defined function that receives the config object and returns a modified version; each plugin is run sequentially, where the modified config is passed into the next plugin, and so on, resulting in a final plugin-modified config.

Obviously it's up to your library/package/software to process the plugin-modified config accordingly.

Example:

```js
import featuredImagePlugin from "package-xyz";
import pluginWithOptions from "package-abc";

const config = withPlugins({ // your package's config object:
  fields: [{ name: "title", ... }, ...],
  optionX: true,
  ...
}, [ // plugins array:
  featuredImagePlugin, // a plugin that injects a "Featured Image" field into the base config's `fields` array
  pluginWithOptions({
    ...
  }), // you can make your plugin accept its own config object
  (incomingConfig) => {
    return {
      ...incomingConfig,
      fields: [...incomingConfig.fields, { name: "plugin_field", ... }]
    }
  } // you can write your own plugins inline
])
```

Many packages may wish to bundle `with-plugins` as a dependency and provide their own abstraction around it, rather than making their end-users install it directly. Here's an example where your custom package could provide a different end-user API while still using `withPlugins` under-the-hood:

```ts
import { buildConfig } from "your-package";

const config = buildConfig({
  fields: [{ name: "title", ... }, ...],
  optionX: true,
  ...
  plugins: [ // same as previous example, but "plugins" is a built-in property of your package's config object
    featuredImagePlugin,
    pluginWithOptions({
      ...
    }),
    (incomingConfig) => {
      return {
        ...incomingConfig,
        fields: [...incomingConfig.fields, { name: "plugin_field", ... }]
      }
    }
  ]
})

// ========================================================
// in `your-package/buildConfig.ts`
import { withPlugins, Plugin } from "@kaelan/with-plugins"

export interface PackageConfig {
  fields: Field[];
  optionX: boolean;
  ...
  plugins?: Plugin<PackageConfig>[];
}

export async function buildConfig(config: PackageConfig): Promise<PackageConfig> {
  if (Array.isArray(config.plugins)) {
    const configAfterPlugins = await withPlugins(config, config.plugins);
    return configAfterPlugins;
  }

  return config;
}
```

Note the usage of the `Plugin` generic type in the `PackageConfig` interface above.

### Building plugins with their own config objects

In the above examples, the second plugin accepts its own config object. Here's the recommended design pattern for implementing this (TLDR: a function that returns a plugin function):

```ts
import { PackageConfig } from "your-package"

export interface PluginOptions {
  ...
}

export const pluginWithOptions =
  (options: PluginOptions) => (incomingConfig: PackageConfig) => {
    // optional custom logic here
    return {
      ...incomingConfig,
      // config customizations here
    };
  };
```

## Feedback

Consider this project in beta -- it's young and its APIs may change. I'm curious to hear if anyone has use cases that `with-plugins` can't currently handle (create an issue).
