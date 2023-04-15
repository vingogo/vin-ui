const { parse: parseSFC } = require('@vue/compiler-sfc');
const { resolve } = require('path');
const { readFile, remove, lstatSync, outputFileSync, readdirSync } = require('fs-extra');
const { extname, basename } = require('path');
const { build } = require('vite');
const { SRC_DIR, LIB_DIR, PACK_DIR } = require('./const');

const package = require(resolve(PACK_DIR, 'package.json'));

const input = {};

// 暂不输出
const excludeComponents = ['comment', 'CmtBottom', 'CmtHeader', 'CmtImages'];

const banner = `/*!
* ${package.name} v${package.version} ${new Date()}
* (c) 2023 @vingogo.
* Released under the MIT License.
*/`;

const replaceExt = (file, ext) => file.replace(extname(file), ext);

const parseSFCFile = async (filePath, name) => {
  const sources = await readFile(filePath, 'utf-8');
  const { descriptor } = parseSFC(sources, { sourceMap: false });
  const { script, scriptSetup, template } = descriptor;

  if (script || scriptSetup) {
    if (script?.content) {
      const jsFilePath = replaceExt(filePath, '-sfc.ts');

      outputFileSync(jsFilePath, script?.content);
      input[name] = jsFilePath;

      const outputSFCPath = resolve(
        LIB_DIR,
        // TODO: 临时兼容特殊情况
        `components/${filePath.split('/components/').slice(1).join('/components/')}`
      );

      outputFileSync(
        outputSFCPath,
        `
        <template>${template?.content}</template>\n<script>import s from './index.js';export default s;</script>
      `.trim()
      );
    }
  }
};

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

const copySFCFiles = () => {
  let tasks = [];
  queryFiles(resolve(SRC_DIR, 'components'), ['.vue']).forEach((filePath) => {
    let folderName = replaceExt(basename(filePath), '');

    if (folderName === 'index') {
      folderName = filePath.match(/\/components\/(.+)\/index\.vue$/)?.[1];
    }

    folderName &&
      !excludeComponents.includes(folderName) &&
      tasks.push(parseSFCFile(filePath, folderName));
  });

  return Promise.all(tasks);
};

const buildDisperse = () => {
  return build({
    configFile: false,
    build: {
      target: 'es2015',
      minify: true,
      lib: {
        entry: '',
        name: 'index',
        formats: ['es'],
      },
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue', 'vue-router', '../../../shared/locale'],
        input,
        output: {
          banner,
          paths: {
            '../../../locale': '../locale',
          },
          dir: resolve(LIB_DIR, `components`),
          entryFileNames: '[name]/index.js',
        },
      },
    },
  });
};

const firstUpperCase = (str) => `${str[0].toUpperCase()}${str.substring(1)}`;
const camelize = (str) => str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));

const genEntryFile = () => {
  let importStr = `import { Locale } from './locale';\n`;
  const packages = [];

  queryFiles(resolve(SRC_DIR, 'components'), ['.vue']).forEach((filePath) => {
    let folderName = replaceExt(basename(filePath), '');

    if (folderName === 'index') {
      folderName = filePath.match(/\/components\/(.+)\/index\.vue$/)?.[1];
    }

    if (folderName && !excludeComponents.includes(folderName)) {
      const componentName = firstUpperCase(camelize(folderName));
      importStr += `import ${componentName} from './components/${folderName.toLowerCase()}/index.vue';\n`;
      packages.push(componentName);
    }
  });

  let installFunction = `function install(app) {
    const packages = [${packages.join(',')}];
    packages.forEach((item) => {
      if (item.install) {
        app.use(item);
      } else if (item.name) {
        app.component(item.name, item);
      }
    });
  }`;

  let fileStrBuild = `${importStr}
${installFunction}
const version = '${package.version}';
export { install, version, Locale };

export default { install, version, Locale };`;

  outputFileSync(resolve(LIB_DIR, 'index.js'), fileStrBuild, 'utf8');
};

const buildModule = () => {
  return build({
    configFile: false,
    build: {
      minify: true,
      lib: {
        entry: resolve(SRC_DIR, 'index.ts'),
        name: 'vin-ui',
        fileName: 'vin-ui',
        formats: ['es', 'umd'],
      },
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue', 'vue-router'],
        output: {
          banner,
          globals: {
            vue: 'Vue',
            uni: 'uni',
          },
        },
      },
    },
  });
};

const buildResolver = () => {
  return build({
    configFile: false,
    build: {
      minify: true,
      lib: {
        entry: resolve(SRC_DIR, 'resolver/index.ts'),
        name: 'name',
        fileName: 'vin-ui',
        fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.js'),
        formats: ['es', 'cjs'],
      },
      emptyOutDir: false,
      rollupOptions: {
        output: {
          dir: resolve(LIB_DIR, 'resolver'),
        },
      },
    },
  });
};

const buildPackageScript = async () => {
  try {
    await copySFCFiles();

    await buildDisperse();

    await genEntryFile();

    await buildResolver();

    // await buildModule();
  } catch (e) {
    console.error('构建组件失败', e);
    process.exit(1);
  } finally {
    Promise.all(Object.keys(input).map((key) => remove(input[key])));
  }
};

module.exports = buildPackageScript;
