import * as path from 'path';
import * as webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = (env: any): webpack.Configuration => {
  const isProd = !!env.prod;
  return {
    mode: 'production',
    entry: {
      background: './src/background.ts',
      popup: './src/popup/index.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'manifest.json' }]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './public/assets',
            to: './assets',
            globOptions: { ignore: ['**/*.psd'] }
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: 'popup.html',
        template: './public/popup.html',
        chunks: ['popup']
      })
    ],
    stats: isProd ? 'normal' : 'minimal'
  };
};

export default config;
