import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const rateProps = {
  ...commonProps,
  modelValue: {
    type: [String, Number],
    default: 0,
  },
  count: {
    type: [String, Number],
    default: 5,
  },
  iconSize: {
    type: [String, Number],
    default: 18,
  },
  activeColor: {
    type: String,
    default: '',
  },
  voidColor: {
    type: String,
    default: '',
  },
  uncheckedIcon: {
    type: String,
    default: 'star-n',
  },
  checkedIcon: {
    type: String,
    default: 'star-fill-n',
  },
  fontClassName: {
    type: String,
    default: 'vin-iconfont',
  },
  classPrefix: {
    type: String,
    default: 'vin-icon',
  },
  allowHalf: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  spacing: {
    type: [String, Number],
    default: 14,
  },
};

export type RateProps = ExtractPropTypes<typeof rateProps>;
