import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const radioGroupProps = {
  ...commonProps,
  modelValue: {
    type: [Number, String, Boolean],
    default: '',
  },
  textPosition: {
    type: String,
    default: 'right',
  },
  direction: {
    type: String,
    default: 'vertical',
  },
};

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
