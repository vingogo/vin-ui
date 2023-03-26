import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const stepProps = {
  ...commonProps,
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: null,
  },
  iconColor: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: '12px',
  },
};

export type StepProps = ExtractPropTypes<typeof stepProps>;
