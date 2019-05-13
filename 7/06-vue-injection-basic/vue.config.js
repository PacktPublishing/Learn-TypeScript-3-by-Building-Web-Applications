module.exports = {
    chainWebpack(config) {
        // this allows us to configure and use TypeScript paths and to prefix project imports by @app/
        // reference: https://github.com/vuejs/vue-cli/issues/3123
        config.resolve.alias.delete("@");
        config.resolve
            .plugin("tsconfig-paths")
            .use(require("tsconfig-paths-webpack-plugin"))
    },
};
