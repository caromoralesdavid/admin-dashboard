const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

/* Configuración del web pack, para ejecutar correctamente */
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
      })
    ]
  }
};

/* hasta aquí va la webpack */