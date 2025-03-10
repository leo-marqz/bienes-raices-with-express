import path from 'path';
// Purpose: Webpack configuration file for development mode
export default {
    mode: "development",
    entry: {
        map: "./src/js/map.js",
        add_image: "./src/js/add_image.js",
        show_map: "./src/js/show_map.js",
        home_map: "./src/js/home_map.js",
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}