const path = require("path")
const currentTask = process.env.npm_lifecycle_event;
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const outputDir = "public";

const config = {
  entry: "./frontend-src/index.js",
  output: {
    filename: "bundled.[hash].js",
    path: path.resolve(__dirname, "public"),
    // assetModuleFilename: 'Images/[name].[ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend-src/index.html",
      base: currentTask == "frontend" ? 'http://localhost:3000' : 'http://localhost:5000',
    }),
    new WatchExternalFilesPlugin({
      files: [
        './Images/**/*.png',
        './Images/**/*.jpg',
        './Images/**/*.JPG',
        '!./src/*.test.js'
      ]
    })
  ],
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    // devMiddleware: {
    //   publicPath: "https://localhost:3000/public/",
    // },
    port: 3000,
    hot: true,
  },
  // watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000, // Check for changes every second
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3, "targets": "defaults" }], "@babel/preset-react"]
          }
        }
      },

      {
        test: /\.(png|gif|jpg)$/i,
        type: 'asset/resource'
      }

      // {
      //   test: /\.(png|gif|jpg)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "images/avatars/",
      //         publicPath: "/images/avatars/"
      //       }
      //     }
      //   ],
      // },
    ]
  }
};

if (currentTask == "build") {
  config.mode = "production";
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: "main.[hash].css" }),
    new CleanWebpackPlugin({ outputDir}),
    new WebpackManifestPlugin()
  )
}


module.exports = config;
