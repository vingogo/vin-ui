import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const listProps = {
  ...commonProps,
  height: {
    type: [Number],
    default: 0,
  },
  listData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  containerHeight: {
    type: [Number],
    default: uni?.getSystemInfoSync?.()?.windowHeight || 667,
  },
};

export type ListProps = ExtractPropTypes<typeof listProps>;
