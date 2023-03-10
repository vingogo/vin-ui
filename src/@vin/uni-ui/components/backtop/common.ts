import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const backtopProps = {
  ...commonProps,
  height: {
    type: String,
    default: '100vh',
  },
  bottom: {
    type: Number,
    default: 20,
  },
  right: {
    type: Number,
    default: 10,
  },
  distance: {
    type: Number,
    default: 200,
  },
  zIndex: {
    type: Number,
    default: 10,
  },
};

export type BacktopProps = ExtractPropTypes<typeof backtopProps>;
