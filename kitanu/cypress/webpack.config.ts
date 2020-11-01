import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const configFile = 'tsconfig.cypress.json';

export default {
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              // transpileOnly: process.env.CI,
              configFile,
            },
          },
        ],
      },
    ],
  },
};
