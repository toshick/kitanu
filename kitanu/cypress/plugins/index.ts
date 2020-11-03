import webpackPreprocessor from '@cypress/webpack-preprocessor';
import webpackOptions from '../webpack.config';

const pluginsFunction: Cypress.PluginConfig = (on, config) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions,
    }),
  );

  return config;
};

export default pluginsFunction;
