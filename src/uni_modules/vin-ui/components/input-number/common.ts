import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const inputNumberProps = {
  ...commonProps,
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  inputWidth: {
    type: [Number, String],
    default: '',
  },
  buttonSize: {
    type: [Number, String],
    default: '',
  },
  min: {
    type: [Number, String],
    default: 1,
  },
  max: {
    type: [Number, String],
    default: 9999,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  decimalPlaces: {
    type: [Number, String],
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
};

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;
