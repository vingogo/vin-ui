const config = require('../config.json');
const { resolve } = require('path');
const { copy, outputFile } = require('fs-extra');
const { build } = require('vite');
let sassFileStr = ``;
let tasks = [];

const SRC = resolve(__dirname, `../src/vingogo/uni-ui`);
const DIST = resolve(__dirname, `../src/vingogo/uni-ui/dist`);

config.list.map((item) => {
  item.components.forEach((element) => {
    let folderName = element.name.toLowerCase();
    tasks.push(
      copy(
        resolve(SRC, `components/${folderName}/index.scss`),
        resolve(DIST, `styles/components/${folderName}.scss`)
      )
        .then(() => {
          sassFileStr += `@import '../components/${folderName}.scss';\n`;
        })
        .catch(() => {})
    );
  });
});

tasks.push(copy(resolve(SRC, 'styles'), resolve(DIST, 'styles')));

Promise.all(tasks).then(() => {
  let themes = [{ file: 'default.scss', sourcePath: `@import '../variables.scss';` }];

  themes.forEach((item) => {
    outputFile(
      resolve(DIST, `styles/themes/${item.file}`),
      `${item.sourcePath}\n${sassFileStr}`,
      'utf8',
      () => {
        build({
          configFile: false,
          build: {
            minify: true,
            lib: {
              entry: resolve(DIST, `styles/themes/default.scss`),
              formats: ['es'],
              name: 'style',
              fileName: 'style',
            },
            emptyOutDir: false,
            outDir: DIST,
          },
        });
      }
    );
  });
});
