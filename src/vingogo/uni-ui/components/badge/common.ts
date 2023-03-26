import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const badgeProps = {
  ...commonProps,
  value: {
    type: [String, Number],
  },
  max: {
    type: Number,
    default: 10000,
  },
  dot: {
    type: Boolean,
    default: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: '0',
  },
  right: {
    type: String,
    default: '0',
  },
  zIndex: {
    type: Number,
    default: 9,
  },
  color: {
    type: String,
    default: '',
  },
};

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
