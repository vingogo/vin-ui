import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../../common';

export type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'large' | 'normal' | 'small' | 'mini';
export type ButtonShape = 'square' | 'round';

export const buttonProps = {
  ...commonProps,
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'normal',
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'round',
  },
  color: String,
  plain: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  iconFontClassName: {
    type: String,
    default: 'vin-iconfont',
  },
  iconClassPrefix: {
    type: String,
    default: 'vin-icon',
  },
  loading: {
    type: Boolean,
    default: false,
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
