import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const commonHeaderProps = {
  ...commonProps,
  type: {
    type: String,
    default: 'default', // default，complex
  },
  info: {
    type: Object,
    default: () => ({}),
  },
  labels: {
    type: Function,
    default: () => '',
  },
};

export type CommonHeaderProps = ExtractPropTypes<typeof commonHeaderProps>;
