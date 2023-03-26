import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const cellProps = {
  ...commonProps,
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  desc: { type: String, default: '' },
  descTextAlign: { type: String, default: 'right' },
  isLink: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  roundRadius: { type: [String, Number], default: '' },
  to: { type: String, default: '' },
  replace: { type: Boolean, default: false },
};

export type CellProps = ExtractPropTypes<typeof cellProps>;
