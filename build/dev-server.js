var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var WebpackDevServer = require("webpack-dev-server");
var compiler = webpack(webpackConfig);
    
    
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// var proxyTable = config.dev.proxyTable

// var app = express()
// var compiler = webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: webpackConfig.output.publicPath,
  progress: true,
  stats: { 
    colors: true,
    watch: true,
  },
});

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
server.app.use(staticPath, express.static('./static'));

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb()
  })
})
server.app.use(hotMiddleware)

// handle missing things
server.app.use('*', (req, res) => {
  const extension = path.extname(req.baseUrl);
  switch(extension) {
    case '.mp4':
    case '.mov':
      res.sendFile(path.resolve('./static/assets/videos/missing.mp4'));
      break;
    default:
      if (res.send) {
        res.send();
      } else {
        console.log('No send method on response', req.baseUrl);
      }
      break;
  }  
});


module.exports = server.listen(port);
