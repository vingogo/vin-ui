import type {
  ComponentPropsOptions,
  ExtractPropTypes,
  SetupContext,
  RenderFunction,
  Component,
} from 'vue';
import locale from '@vingogo/uni-ui/lib/locale';

const isFunction = (val: unknown): val is Function => typeof val === 'function';

const getPropByPath = (obj: any, keyPath: string) => {
  try {
    return keyPath.split('.').reduce((prev, curr) => prev[curr], obj);
  } catch (error) {
    return '';
  }
};

const classPrefix = 'vin';

export function createComponent(name: string) {
  const componentName = `${classPrefix}-${name}`;
  return {
    classPrefix,
    componentName,
    translate(keyPath: string, ...args: unknown[]) {
      // 依赖响应能力
      const languages = locale.languages();
      const text =
        getPropByPath(languages, `${name.replace('-', '')}.${keyPath}`) ||
        getPropByPath(languages, keyPath);
      return isFunction(text) ? text(...args) : text;
    },
    createDemo<
      PropsOptions extends Readonly<ComponentPropsOptions>,
      Props extends Readonly<ExtractPropTypes<PropsOptions>>,
    >(component: {
      name?: string;
      baseName?: string;
      props?: PropsOptions;
      components?: Record<string, Component>;
      setup?: (
        props: Props,
        setupContext: SetupContext,
      ) => RenderFunction | Record<string, any> | any;
      emits?: string[];
      [optionKey: string]: any;
    }) {
      const entryPath = '/pages/index/index';

      return {
        options: {
          styleIsolation: 'shared',
        },

        baseName: name,

        name: `demo-${name}`,

        onShareAppMessage: () => {
          return {
            title: '基于 Vue 3 的轻量、快速的多平台开发 UI 组件库',
            path: entryPath,
            success: (res: any) => {
              // 转发成功
              console.log('转发成功', res);
            },
            fail: (error: any) => {
              // 转发失败
              console.log('转发失败', error);
            },
          };
        },

        onShareTimeline: () => {
          return {
            title: '基于 Vue 3 的轻量、快速的多平台开发 UI 组件库',
            path: entryPath,
          };
        },

        ...component,
      };
    },
  };
}
