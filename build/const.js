const { resolve } = require('path');

exports.SRC_DIR = resolve(__dirname, `../packages/uni-ui`);
exports.LIB_DIR =
  process.env.MODE !== 'UNI'
    ? resolve(__dirname, `../packages/play/src/@vingogo/uni-ui/lib`)
    : resolve(__dirname, `../packages/uni-ui/uni_modules/vin-ui`);
exports.UNI_DIR = resolve(__dirname, `../src/vingogo/uni-ui/uni_modules`);
