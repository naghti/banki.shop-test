const { defineConfig } = require("@vue/cli-service");
module.exports = {
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: 'js/[name].js', 
      chunkFilename: 'js/[name].js'
    }
  },
  publicPath: './',
};