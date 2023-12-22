// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   outputDir: "docs",
//   publicPath: './'
// })

module.exports = {
  //基本路径
  publicPath: "./",
  outputDir: "docs", //构建时输出目录 默认dist
  //放置静态资源目录
  assetsDir: "static",
  indexPath: "index.html", //html输出路径 默认 index.html
}