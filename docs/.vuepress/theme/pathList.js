import config from '../../../config.json';

export default config.list.reduce((prev, next) => {
  return prev.concat(
    next.components.map(({ name }) => {
      return {
        parentPath: `/components/${name.replace(/\B([A-Z])/g, '-$1').toLocaleLowerCase()}.html`,
        childrenPath: `pages/${name.toLowerCase().replace('-', '')}/index`,
      };
    })
  );
}, []);
