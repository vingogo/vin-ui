import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const rowProps = {
  ...commonProps,
  type: {
    type: String,
    default: '',
  },
  gutter: {
    type: [String, Number],
    default: '',
  },
  justify: {
    type: String,
    default: 'start',
  },
  align: {
    type: String,
    default: 'flex-start',
  },
  wrap: {
    type: String,
    default: 'nowrap',
  },
};

export type RowProps = ExtractPropTypes<typeof rowProps>;
