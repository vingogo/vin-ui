import type { ComponentResolver } from 'unplugin-vue-components';

export const VinUIResolver = (): ComponentResolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Vin[A-Z]|vin-[a-z])/)) {
        const cName = name
          .slice(3)
          .replace(/([a-z])([A-Z])/, '$1-$2')
          .toLowerCase();
        return {
          name,
          from: `@vingogo/uni-ui/components/${cName}/index.vue`,
        };
      }
    },
  };
};
