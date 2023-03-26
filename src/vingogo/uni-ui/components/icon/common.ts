import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../../common';

export const iconProps = {
  ...commonProps,
  name: { type: String, default: '' },
  color: { type: String, default: '' },
  size: { type: [String, Number], default: '' },
  fontClassName: { type: String, default: 'vin-iconfont' },
  classPrefix: { type: String, default: 'vin-icon' },
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'text',
  },
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
