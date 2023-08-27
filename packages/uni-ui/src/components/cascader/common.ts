import type { ExtractPropTypes } from 'vue';
import { popupProps } from '../popup/common';

export const cascaderProps = {
  ...popupProps,
  modelValue: Array,
  visible: Boolean,
  options: {
    type: Array,
    default: () => [],
  },
  lazy: Boolean,
  lazyLoad: Function,
  valueKey: {
    type: String,
    default: 'value',
  },
  textKey: {
    type: String,
    default: 'text',
  },
  childrenKey: {
    type: String,
    default: 'children',
  },
  convertConfig: Object,
  title: String,
};

export const cascaderItemProps = {
  visible: Boolean,
  modelValue: Array,
  options: {
    type: Array,
    default: () => [],
  },
  lazy: Boolean,
  lazyLoad: Function,
  valueKey: {
    type: String,
    default: 'value',
  },
  textKey: {
    type: String,
    default: 'text',
  },
  childrenKey: {
    type: String,
    default: 'children',
  },
  convertConfig: Object,
};

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>;
