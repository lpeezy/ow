module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/app.scss"`
      }
    }
  }
}
