// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var fs = require('fs')
var archiver = require('archiver')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err

  // search through the app files and copy over any "/resources" we may have used
  var files = stats.toJson().assetsByChunkName.app;
  
  for (var i = 0; i < files.length; i++) {
    if (path.extname(files[i]) !== '.map') {
      // read the file and copy over resources
      var file = path.join(config.build.assetsRoot, files[i]);
      updateFile(file);
    }
  }

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')

  // TODO: replace timeout with something
  if (process.argv[2] === 'zip') {
    setTimeout(createArchive, 1000)
  }
})

updateFile = file => {
  var staticRegex = /\/static((\/[A-z0-9\-\%]+)*\.[A-z0-9]+)/igm;
  var copiedFiles = {};

  fs.readFile(file, function(error, data) {
    if (error) {
      console.log(error);
      return;
    }

    // replace /static with static
    // replace /resources with resources
    updatedContent = data.toString();

    if (path.extname(file) === '.js') {
      updatedContent = updatedContent.replace(/\/static\//g, 'static/');
    } else if (path.extname(file) === '.css') {
      updatedContent = updatedContent.replace(/\/static\//g, '../../static/');
    }
    
    fs.writeFileSync(file, updatedContent);
  });
};

createArchive = () => {
  console.log('\nCreating .zip file...');
  console.log('arg: ' + process.argv[2]);

  const timestamp = new Date().getTime();

  var output = fs.createWriteStream(config.build.assetsRoot + '/rk_' + timestamp + '.zip');
  var archive = archiver('zip');

  output.on('close', function() {
    console.log('Archive has been created.');
    console.log('File size: ' + archive.pointer() + ' total bytes');
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  archive
    .bulk([
        { expand: true, cwd: config.build.assetsRoot, src: ['**/*', '!*.zip'], dest: 'rk_' + timestamp }
    ])
    .finalize();
}
