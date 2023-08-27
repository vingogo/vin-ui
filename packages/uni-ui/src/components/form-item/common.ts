import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export const formItemProps = {
  ...commonProps,
  required: {
    type: Boolean,
    default: false,
  },
  prop: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelAlign: {
    type: String,
    default: '',
  },
  bodyAlign: {
    type: String,
    default: '',
  },
  rules: {
    type: Array as PropType<import('./types').FormItemRule[]>,
    default: () => {
      return [];
    },
  },
  showErrorMessage: {
    type: Boolean,
    default: true,
  },
  showErrorLine: {
    type: Boolean,
    default: true,
  },
  errorMessageAlign: {
    type: String,
    default: '',
  },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
