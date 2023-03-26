import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export type TabsSize = 'large' | 'normal' | 'small';

export const tabsProps = {
  ...commonProps,
  modelValue: {
    type: [String, Number],
    default: 0,
  },
  color: {
    type: String,
    default: '',
  },
  direction: {
    type: String,
    default: 'horizontal', // vertical
  },
  size: {
    type: String as PropType<TabsSize>,
    default: 'normal',
  },
  type: {
    type: String,
    default: 'line', // card、line、smile
  },
  titleScroll: {
    type: Boolean,
    default: false,
  },
  ellipsis: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
    default: '',
  },
  animatedTime: {
    type: [Number, String],
    default: 300,
  },
  titleGutter: {
    type: [Number, String],
    default: 0,
  },
  customClass: {
    type: [String, Object],
    default: '',
  },
};

export type TabsProps = ExtractPropTypes<typeof tabsProps>;

export const TAB_KEY = Symbol('tabs');
