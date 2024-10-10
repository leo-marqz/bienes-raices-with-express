import path from 'path';

// Purpose: Webpack configuration file for development mode
export default {
    mode: "development",
    entry: {
        map: "./src/js/map.js",
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}