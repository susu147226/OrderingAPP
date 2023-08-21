module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        "postcss-pxtorem": {
            // 基准值：
            rootValue: 100,
            mediaQuery: false,
            propList: ["*"]
        }
    },
}
