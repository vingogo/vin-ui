import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const swipeProps = {
  ...commonProps,
  name: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  touchMoveStopPropagation: {
    type: Boolean,
    default: false,
  },
  touchMovePreventDefault: {
    type: Boolean,
    default: false,
  },
};

export type SwipeProps = ExtractPropTypes<typeof swipeProps>;
