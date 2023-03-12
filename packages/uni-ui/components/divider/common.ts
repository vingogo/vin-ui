import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const dividerProps = {
  ...commonProps,
  contentPosition: {
    type: String,
    default: 'center',
  },
  dashed: {
    type: Boolean,
    default: false,
  },
  hairline: {
    type: Boolean,
    default: true,
  },
};

export type DividerProps = ExtractPropTypes<typeof dividerProps>;
