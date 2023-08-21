/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./public/index.html", "./src/*.{js,vue}", "./src/**/*.{vue,js}"],
    theme: {
        extend: {
            colors: {
                primaryColor: "#008de1"
            },
            padding: (() => {
                let obj = {};
                for (let i = 1; i <= 20; i++) {
                    obj[i] = i + "px";
                }
                return obj;
            })(),
            margin: (() => {
                let obj = {};
                for (let i = 1; i <= 20; i++) {
                    obj[i] = i + "px";
                }
                return obj;
            })(),
        },
    },
    plugins: [],
    corePlugins: {
        // 因为当前的项目里面有vant插件，不要让tailwindcss去初始化vant的第三方插件样式
        preflight: false
    }
}

module.exports = config;