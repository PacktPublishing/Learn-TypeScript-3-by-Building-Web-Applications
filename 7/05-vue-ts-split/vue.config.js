module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /.html$/,
                    loader: "vue-template-loader",
                    exclude: /index.html/
                }
            ]
        }
    }
};
