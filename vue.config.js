/**
 * 这个文件相当于vue的脚手架里面的webpack的配置文件
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        index: {
            entry: "./src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "食味斋"
        }
    },
    publicPath: "./"
    // chainWebpack: config => {
    //   config.plugin("html").tap(args=>{
    //     args[0].options.title="H2204点餐"
    //   });
    //   return config;
    // }
})
