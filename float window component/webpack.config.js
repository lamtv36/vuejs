var path = require('path');
module.exports = {									
    entry: "./src/app.js",									
    output: {
        publicPath: 'http://localhost:8080/',									
        path: path.resolve(__dirname, './dist'),									
        filename: "bundle.js"									
    },									
    module: {									
        loaders: [									
            { test: /\.css$/, loader: "style-loader!css-loader" }						
        ]									
    },								
};									
