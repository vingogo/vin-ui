import {
  App,
  defineComponent,
  ComponentPropsOptions,
  ExtractPropTypes,
  SetupContext,
  RenderFunction,
  Component,
} from 'vue';
import locale from '@vingogo/uni-ui/locale';

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
      Props extends Readonly<ExtractPropTypes<PropsOptions>>
    >(_component: {
      name?: string;
      baseName?: string;
      props?: PropsOptions;
      components?: Record<string, Component>;
      setup?: (
        props: Props,
        setupContext: SetupContext
      ) => RenderFunction | Record<string, any> | any;
      emits?: string[];
      [optionKey: string]: any;
    }) {
      _component.options = {
        // #ifdef MP-WEIXIN
        // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
        // virtualHost: true,
        // #endif
        styleIsolation: 'shared',
      };

      _component.baseName = name;

      _component.name = `demo-${name}`;

      return defineComponent(_component as any);
    },
  };
}
