/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/*.{js,vue}", "./src/**/*.{vue,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // 因为当前的项目里面有vant插件，不要让tailwindcss去初始化vant的第三方插件样式
    preflight: false
  }
}
