import type { PropType } from 'vue';
import { commonProps } from '../common';

export type NameType =
  | 'fade'
  | 'zoom'
  | 'fade-zoom'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right';

export const transitionProps = {
  ...commonProps,
  // 控制组件显示或隐藏
  show: {
    type: Boolean,
    default: false,
  },
  // 内置过渡动画名
  name: {
    type: String as PropType<NameType>,
    default: 'fade',
  },
  enterClass: {
    type: String,
    default: '',
  },
  enterActiveClass: {
    type: String,
    default: '',
  },
  enterToClass: {
    type: String,
    default: '',
  },
  leaveClass: {
    type: String,
    default: '',
  },
  leaveActiveClass: {
    type: String,
    default: '',
  },
  leaveToClass: {
    type: String,
    default: '',
  },
  // 过渡动画持续时间，单位ms
  duration: {
    type: [Number, String],
    default: 300,
  },
  // 使用的动画过渡函数
  timingFunction: {
    type: String,
    default: 'ease-out',
  },
};

const getDefaultClassNames = (name: string) => ({
  enter: `vin-${name}-enter`,
  enterActive: `vin-${name}-enter-active`,
  enterTo: `vin-${name}-enter-to vin-${name}-enter-active`,
  leave: `vin-${name}-leave`,
  leaveActiveClass: `vin-${name}-leave-active`,
  leaveTo: `vin-${name}-leave-to vin-${name}-leave-active`,
});

export interface IClassNames {
  enter: string;
  enterActive: string;
  enterTo: string;
  leave: string;
  leaveActive: string;
  leaveTo: string;
}

export interface IClassNameProps {
  enterClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  leaveClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
}

export const getClassNames = (
  name: string,
  {
    enterClass,
    enterActiveClass,
    enterToClass,
    leaveClass,
    leaveActiveClass,
    leaveToClass,
  }: IClassNameProps,
): IClassNames => {
  const defaultClassNames = getDefaultClassNames(name);

  return {
    enter: enterClass || defaultClassNames.enter,
    enterActive: enterActiveClass || defaultClassNames.enterActive,
    enterTo: enterToClass || defaultClassNames.enterTo,
    leave: leaveClass || defaultClassNames.leave,
    leaveActive: leaveActiveClass || defaultClassNames.leaveActiveClass,
    leaveTo: leaveToClass || defaultClassNames.leaveTo,
  };
};
