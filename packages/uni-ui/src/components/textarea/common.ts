import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const textareaProps = {
  ...commonProps,
  modelValue: {
    type: [String],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxLength: {
    type: [String, Number],
    default: '',
  },
  rows: {
    type: [String, Number],
    default: '',
  },
  limitShow: {
    type: Boolean,
    default: false,
  },
  autosize: {
    type: Boolean,
    default: false,
  },
  textAlign: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
};

export type TextareaProps = ExtractPropTypes<typeof textareaProps>;
