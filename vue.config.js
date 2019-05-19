module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/prod/"
        : process.env.NODE_ENV === "staging" ? "/staging/" : "/",
    assetsDir: "",
    devServer: {
        disableHostCheck: true,
        port: 80
    }
}
