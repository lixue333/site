module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devServer: {
        
        watchContentBase: true
        
    }
}