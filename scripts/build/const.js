const { resolve } = require('path');

const packDirMap = {
  UNI: resolve(__dirname, `../../packs/uni_modules`),
  NPM: resolve(__dirname, `../../packs/npm`),
};

const destMap = {
  UNI: resolve(__dirname, `../../dist/uni_modules`),
  NPM: resolve(__dirname, `../../dist/lib`),
};

exports.TYPES_DIR = resolve(__dirname, `../../dts/types`);
exports.PACK_DIR = packDirMap[process.env.MODE] || packDirMap['NPM'];
exports.SRC_DIR = resolve(__dirname, `../../src/uni_modules/vin-ui`);
exports.LIB_DIR = destMap[process.env.MODE] || destMap['NPM'];
exports.UNI_DIR = resolve(__dirname, `../src/vingogo/uni-ui/uni_modules`);
