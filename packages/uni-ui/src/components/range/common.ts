import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export type SliderValue = number | number[];

export const rangeProps = {
  ...commonProps,
  range: {
    type: Boolean,
    default: false,
  },
  disabled: Boolean,
  activeColor: String,
  inactiveColor: String,
  buttonColor: String,
  vertical: {
    type: Boolean,
    default: false,
  },
  marks: {
    type: Object,
    default: {},
  },
  hiddenRange: {
    type: Boolean,
    default: false,
  },
  hiddenTag: {
    type: Boolean,
    default: false,
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  modelValue: {
    type: [Number, Array] as PropType<SliderValue>,
    default: 0,
  },
};

export type RangeProps = ExtractPropTypes<typeof rangeProps>;
