import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const tabpaneProps = {
  ...commonProps,
  title: {
    type: [String, Number],
    default: '',
  },
  paneKey: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type TabpaneProps = ExtractPropTypes<typeof tabpaneProps>;
