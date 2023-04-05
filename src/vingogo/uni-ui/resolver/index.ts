import type { ComponentResolver } from 'unplugin-vue-components/types';

export default function VinUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.match(/^(Vin[A-Z]|vin-[a-z])/)) {
        const cName = name
          .slice(3)
          .replace(/([a-z])([A-Z])/, '$1-$2')
          .toLowerCase();
        return {
          name,
          from: `@vingogo/uni-ui/lib/components/${cName}/index.vue`,
        };
      }
    },
  };
}
