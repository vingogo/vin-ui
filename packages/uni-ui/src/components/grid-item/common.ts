import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';
import type { RouterOptions } from '../../shared/hooks/useRouter';

export const gridItemProps = {
  ...commonProps,
  text: {
    type: String,
  },
  icon: {
    type: String,
  },
  iconSize: {
    type: [Number, String],
  },
  iconColor: {
    type: String,
  },
  iconClassPrefix: {
    type: String,
  },
  iconFontClassName: {
    type: String,
  },
  to: {
    type: [String, Object] as PropType<string | RouterOptions>,
  },
  // #ifdef H5
  url: {
    type: String,
    default: '',
  },
  // #endif
  replace: {
    type: Boolean,
    default: false,
  },
};

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>;
