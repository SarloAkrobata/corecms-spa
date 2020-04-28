module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === "production" ? ""
        : process.env.NODE_ENV === "staging" ? "/staging/" : "/",
    assetsDir: "",
    devServer: {
        disableHostCheck: true,
        port: 80,
        watchOptions: {
            poll: true
        }
    }
}
