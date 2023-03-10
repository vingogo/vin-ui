import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const stepsProps = {
  ...commonProps,
  direction: {
    type: String,
    default: 'horizontal',
  },
  current: {
    type: [String, Number],
    default: '0',
  },
  progressDot: {
    type: Boolean,
    default: false,
  },
};

export type StepsProps = ExtractPropTypes<typeof stepsProps>;
