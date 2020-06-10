module.exports = {
  hot: true,
  contentBase: 'static',
  publicPath: 'build',
  proxy: {
    '/': 'http://localhost:5000',
  },
}
