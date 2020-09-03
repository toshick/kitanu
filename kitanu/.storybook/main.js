/**
 * storybook
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
// const webpack = require('webpack');
const rootPath = path.resolve(__dirname, '../');

module.exports = {
  stories: ['../stories/stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['~'] = rootPath;
    config.resolve.alias['@'] = rootPath;
    config.resolve.extensions.push('.ts');

    // 動かない
    // addModuleOptons(config, 'vue-loader', {
    //   cssModules: {
    //     localIdentName: '[path][name]---[local]---[hash:base64:5]',
    //     camelCase: true,
    //   },
    // });

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true, // used with ForkTsCheckerWebpackPlugin
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            // sassOptions: {
            //   indentedSyntax: true,
            // },
          },
        },
        // {
        //   loader: 'sass-resources-loader',
        //   options: {
        //     resources: ['./css/chat/mixins.scss', './css/chat/variables.scss'],
        //     include: rootPath,
        //   },
        // },
      ],
      include: rootPath,
    });

    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    // Return the altered config
    return config;
  },
};

/**
 * config.module.rulesから指定のローダーを検索してoptionを追加
 */
function addModuleOptons(config, loaderName, options) {
  config.module.rules.forEach((r, index) => {
    if (r.loader && r.loader.includes(loaderName)) {
      config.module.rules[index].options = {
        ...config.module.rules[index].options,
        ...options,
      };
    }
  });
}
