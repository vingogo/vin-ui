import type { ComponentResolver } from 'unplugin-vue-components'

export const VinUIResolver = (): ComponentResolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Vin')) {
        const cName = name.slice(3).toLowerCase()
        return {
          name,
          from: `@vingogo/uni-ui/components/${cName}/index.vue`,
        }
      }
    },
  }
}
