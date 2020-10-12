const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
/**
 * 根目录
 * @param {*} subdir 子目录
 */
function srcPath(subdir) {
  return path.join(__dirname, 'src', subdir);
}

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),   
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js',
  },
};
