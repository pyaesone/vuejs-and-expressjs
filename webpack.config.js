module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: "./public/javascripts",
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: "babel",
      },
      {
        test: /\.vue$/, loader: 'vue'
      }
    ] 
  },
  babel: {
     presets: ['es2015'],
     plugins: ['transform-runtime']
  }
}
