const config = require('../config.json');
const { resolve } = require('path');
const { copy, outputFileSync } = require('fs-extra');
const { build } = require('vite');
const { SRC_DIR, LIB_DIR } = require('./const');

let sassFileStr = ``;

const copyStyle = () => {
  let tasks = [];

  config.list.map((item) => {
    item.components.forEach((element) => {
      let folderName = element.name.toLowerCase();
      tasks.push(
        copy(
          resolve(SRC_DIR, `components/${folderName}/index.scss`),
          resolve(LIB_DIR, `styles/components/${folderName}.scss`)
        )
          .then(() => {
            sassFileStr += `@import '../components/${folderName}.scss';\n`;
          })
          .catch(() => {})
      );
    });
  });

  tasks.push(copy(resolve(SRC_DIR, 'styles'), resolve(LIB_DIR, 'styles')));

  return Promise.all(tasks);
};

const genThemes = () => {
  const themes = [{ file: 'default.scss', sourcePath: `@import '../variables.scss';` }];

  const tasks = themes.map((item) => {
    return outputFileSync(
      resolve(LIB_DIR, `styles/themes/${item.file}`),
      `${item.sourcePath}\n${sassFileStr}`,
      'utf8'
    );
  });

  return Promise.all(tasks);
};

const buildDefaultTheme = () => {
  return build({
    configFile: false,
    build: {
      minify: true,
      lib: {
        entry: resolve(LIB_DIR, `styles/themes/default.scss`),
        formats: ['es'],
        name: 'style',
        fileName: 'style',
      },
      emptyOutDir: false,
      outDir: LIB_DIR,
    },
  });
};

const tasks = [
  {
    text: '复制样式文件',
    task: copyStyle,
  },
  {
    text: '生成主题文件',
    task: genThemes,
  },
  {
    text: '构建默认主题样式',
    task: buildDefaultTheme,
  },
];

const runBuildTasks = async () => {
  for (let i = 0; i < tasks.length; i++) {
    const { task, text } = tasks[i];

    try {
      console.log(text);
      await task();
    } catch (err) {
      console.error(text);
      throw err;
    }
  }
};

const buildStyle = async () => {
  try {
    await runBuildTasks();
    console.log('样式文件构建完成');
  } catch (err) {
    console.error('样式文件构建失败');
  }
};

module.exports = buildStyle;
