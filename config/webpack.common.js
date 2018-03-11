const resolve = require('path').resolve
const webpack = require('webpack')
require('dotenv').config({silent : true})

module.exports = {
  entry : resolve(process.cwd(), 'src/index.jsx'),
  output : {
    filename : 'bundle.js',
    path : resolve(process.cwd(), 'dist'),
  },
  module : {
    rules : [
      {
        test : /\.jsx?$/,
        use : [
          {
            loader : 'babel-loader',
          },
        ],
      },
      {
        test : /\.css$/,
        use : [ 'style-loader', 'css-loader' ]
      },
    ],
  },
  resolve : {
    alias : {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$' : resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
    },
  },
  plugins : [
    new webpack.DefinePlugin({
      MAPBOX_TOKEN : JSON.stringify(process.env.MAPBOX_TOKEN),
    }),
  ],
}
