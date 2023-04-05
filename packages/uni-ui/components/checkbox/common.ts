import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const checkboxProps = {
  ...commonProps,
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  textPosition: {
    type: String,
    default: 'right',
  },
  iconSize: {
    type: [String, Number],
    default: '',
  },
  iconName: {
    type: String,
    default: 'check-normal',
  },
  iconActiveName: {
    type: String,
    default: 'checked',
  },
  iconClassPrefix: {
    type: String,
    default: 'vin-icon',
  },
  iconFontClassName: {
    type: String,
    default: 'vin-iconfont',
  },
  label: {
    type: String,
    default: '',
  },
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
