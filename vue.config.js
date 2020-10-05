module.exports = {
  devServer: {
    proxy: 'https://json-csv.com/api'
  },
  publicPath:
    process.env.NODE_ENV === 'production' ? '/algo-visualization/' : '/',
  chainWebpack: config => {
    config.resolve.extensions
      .clear()
      .add('.vue')
      .add('.tsx')
      .add('.ts')
      .add('.mjs')
      .add('.js')
      .add('.jsx')
      .add('.json')
      .add('.wasm');
  }
};
