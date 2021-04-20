module.exports = {
    devServer: {
        proxy: {
            "/ajax": {
                target: "https://m.maoyan.com",
                secure: false,
                changeOrigin: true,
            },
            "/dianying": {
                target: "https://m.maoyan.com",
                secure: false,
                changeOrigin: true,
            }
        }
    }
}