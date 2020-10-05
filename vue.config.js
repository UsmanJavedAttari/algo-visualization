module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/algo-visualization-prod/' : '/',
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
