import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const cellGroupProps = {
  ...commonProps,
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
};

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>;
