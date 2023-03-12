import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const radioProps = {
  ...commonProps,
  disabled: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: [String, Number],
    default: '',
  },
  iconName: {
    type: String,
    default: 'check-normal',
  },
  iconActiveName: {
    type: String,
    default: 'check-checked',
  },
  iconClassPrefix: {
    type: String,
    default: 'vin-icon',
  },
  iconFontClassName: {
    type: String,
    default: 'vin-iconfont',
  },
  label: {
    type: [String, Number],
    default: '',
  },
  shape: {
    type: String,
    default: 'round',
  },
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
