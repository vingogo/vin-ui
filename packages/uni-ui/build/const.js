const { resolve } = require('path');

const dirMap = {
  UNI: resolve(__dirname, `../uni_modules/vin-ui`),
  production: resolve(__dirname, `../lib`),
  play: resolve(__dirname, `../../play/src/@vingogo/uni-ui/lib`),
};

exports.SRC_DIR = resolve(__dirname, `../`);
exports.LIB_DIR = dirMap[process.env.MODE] || dirMap['production'];
exports.UNI_DIR = resolve(__dirname, `../src/vingogo/uni-ui/uni_modules`);
