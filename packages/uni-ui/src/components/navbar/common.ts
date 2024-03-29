import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const navbarProps = {
  ...commonProps,
  leftShow: { type: Boolean, default: true }, // 左侧  是否显示返回icon
  title: { type: String, default: '' }, // 中间  文字标题
  titIcon: { type: String, default: '' }, // 中间  标题icon
  desc: { type: String, default: '' }, // 右侧   按钮文字
  fixed: {
    type: Boolean,
    default: false,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  // 生成一个等高的占位元素
  placeholder: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: [Number, String],
    default: 10,
  },
};

export type NavbarProps = ExtractPropTypes<typeof navbarProps>;
