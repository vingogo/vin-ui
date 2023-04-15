import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const colProps = {
  ...commonProps,
  span: {
    type: [String, Number],
    default: '24',
  },
  offset: {
    type: [String, Number],
    default: '0',
  },
};

export type ColProps = ExtractPropTypes<typeof colProps>;
