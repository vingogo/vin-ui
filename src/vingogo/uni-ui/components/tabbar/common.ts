import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const tabbarProps = {
  ...commonProps,
  visible: {
    type: [Number, String],
    default: 0,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'base',
  },
  size: {
    type: String,
    default: '20px',
  },
  unactiveColor: {
    type: String,
    default: '#000000',
  },
  activeColor: {
    type: String,
    default: '',
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
};

export type TabbarProps = ExtractPropTypes<typeof tabbarProps>;
