const chokidar = require('chokidar');
const buildPackageScript = require('../build/package');
const buildStyle = require('../build/style');
const buildLocale = require('../build/locale');

let waiting = false;

const processFn = (path, action) => {
  if (!waiting) {
    waiting = true;
    try {
      console.log(`${path}文件变化，构建中...`);
      // execSync('npm run build:lib');
      action(path);
    } catch (err) {
      console.error(err);
    }
    waiting = false;
  }
};

// TODO: 简单处理，暂只处理 change

// vue、js
chokidar
  .watch(['components/**/*.*', 'shared/**/*.*'], {
    ignored: '**/*-sfc.ts',
  })
  .on('change', (path) => processFn(path, buildPackageScript));

// 样式
chokidar
  .watch(['**/*.(scss|css)'], {
    ignored: '**/*-sfc.ts',
  })
  .on('change', (path) => processFn(path, buildStyle));

// 多语言
chokidar.watch(['locale/**/*.(ts|js)']).on('change', (path) => processFn(path, buildLocale));
