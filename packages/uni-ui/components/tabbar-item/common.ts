import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const tabbarItemProps = {
  ...commonProps,
  tabTitle: {
    // 标签页的标题
    type: String,
    default: '',
  },
  icon: {
    // 标签页显示的icon
    type: String,
    default: '',
  },
  href: {
    // 标签页的跳转链接
    type: String,
    default: '',
  },
  num: {
    // 页签右上角的数字角标
    type: String,
    default: '',
  },
  activeImg: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },
  dot: {
    type: Boolean,
    default: false,
  },
  classPrefix: {
    type: String,
    default: 'vin-icon',
  },
  fontClassName: {
    type: String,
    default: 'vin-iconfont',
  },
  to: [Object, String],
};

export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>;
