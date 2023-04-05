const { resolve } = require('path');

exports.SRC_DIR = resolve(__dirname, `../src/vingogo/uni-ui`);
exports.LIB_DIR =
  process.env.MODE !== 'UNI'
    ? resolve(__dirname, `../src/vingogo/uni-ui/lib`)
    : resolve(__dirname, `../src/vingogo/uni-ui/uni_modules/vin-ui`);
exports.UNI_DIR = resolve(__dirname, `../src/vingogo/uni-ui/uni_modules`);
