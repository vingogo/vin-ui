const { copy, lstatSync, readFileSync, outputFileSync, readdirSync } = require('fs-extra');
const { extname, basename, resolve } = require('path');
const { LIB_DIR, TYPES_DIR, SRC_DIR } = require('./const');

const package = require(resolve(SRC_DIR, '../package.json'));

const excludeComponents = [];

const preContent = `
declare type Install<T> = T & {
  install(app: import('vue').App): void;
};\n`;
const start = 'declare const _default:';
const end = ';\nexport default _default;\n';
const regex = new RegExp(`${start}([\\s\\S]*?)${end}`);

const replaceExt = (file, ext) => file.replace(extname(file), ext);

const queryFiles = (dir, exts, list = []) => {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = resolve(dir, file);

    const stat = lstatSync(filePath);

    if (stat.isDirectory()) {
      list.concat(queryFiles(filePath, exts, list));
    } else if (exts.includes(extname(file))) {
      list.push(filePath);
    }
  });

  return list;
};

const copyTypesFiles = () => {
  return copy(TYPES_DIR, resolve(LIB_DIR, 'types'));
};

const firstUpperCase = (str) => `${str[0].toUpperCase()}${str.substring(1)}`;
const camelize = (str) => str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));

const overrideTypes = () => {
  let importStr = `import { App } from 'vue';\nimport { Locale } from './locale';\n`;
  const packages = [];

  queryFiles(resolve(LIB_DIR, 'types/components'), ['.ts']).forEach((filePath) => {
    let folderName = replaceExt(basename(filePath), '');

    if (folderName === 'index.vue.d') {
      folderName = filePath.match(/\/components\/(.+)\/index\.vue\.d\.ts$/)?.[1];
    }

    // TODO: 待处理
    if (folderName === 'common.d') {
      return;
    }

    const content = readFileSync(filePath).toLocaleString();
    const inputs = content.match(regex);

    if (inputs && inputs.length && folderName && !excludeComponents.includes(folderName)) {
      const componentName = firstUpperCase(camelize(folderName));

      let remain = `
declare module 'vue' {
  interface GlobalComponents {
    Vin${componentName}: typeof _default;
  }
}`;
      let changeContent = content.replace(
        regex,
        `${preContent}${start} Install<${inputs[1]}>${end}${remain}`,
      );
      outputFileSync(filePath, changeContent);

      importStr += `import ${componentName} from './components/${folderName.toLowerCase()}/index.vue';\n`;
      packages.push(componentName);
    }
  });

  let fileStrBuild = `${importStr}\n
declare function install(app: App): void;
declare const version = "${package.version}";
export { install, version, Locale, ${packages.join(',')} };
declare const _default: {
    install: typeof install;
    version: string;
    Locale: typeof Locale;
};
export default _default;`;

  outputFileSync(resolve(LIB_DIR, 'types/index.d.ts'), fileStrBuild, 'utf8');
};

const buildTypes = async () => {
  try {
    await copyTypesFiles();

    await overrideTypes();
  } catch (e) {
    console.error('构建 types 失败', e);
  }
};

module.exports = buildTypes;
