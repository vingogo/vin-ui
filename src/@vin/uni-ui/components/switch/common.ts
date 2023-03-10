import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const switchProps = {
  ...commonProps,
  modelValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'loading',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: '12px',
  },
  activeColor: {
    type: String,
    default: '',
  },
  inactiveColor: {
    type: String,
    default: '',
  },
  activeText: {
    type: String,
    default: '',
  },
  inactiveText: {
    type: String,
    default: '',
  },
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
  },
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
