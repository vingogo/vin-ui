import type { PropType, ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const commonBottomProps = {
  ...commonProps,
  type: {
    type: String,
    default: 'base', // simple，base，complex
  },
  info: {
    type: Object,
    default: () => ({}),
  },

  operation: {
    type: Array as PropType<string[]>,
    default: ['replay', 'like', 'more'],
  },
};

export type CommonBottomProps = ExtractPropTypes<typeof commonBottomProps>;
