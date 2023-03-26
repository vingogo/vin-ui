import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const noticebarProps = {
  ...commonProps,
  // 滚动方向  across 横向 vertical 纵向
  direction: {
    type: String,
    default: 'across',
  },
  list: {
    type: Array,
    default: () => {
      return [];
    },
  },
  standTime: {
    type: Number,
    default: 1000,
  },
  complexAm: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 40,
  },
  text: {
    type: String,
    default: '',
  },
  closeMode: {
    type: Boolean,
    default: false,
  },
  wrapable: {
    type: Boolean,
    default: false,
  },
  leftIcon: { type: String, default: '' },
  rightIcon: { type: String, default: '' },
  color: {
    type: String,
    default: '#F9911B',
  },
  background: {
    type: String,
    default: '',
  },
  delay: {
    type: [String, Number],
    default: 1,
  },
  scrollable: {
    type: Boolean,
    default: null,
  },
  speed: {
    type: Number,
    default: 50,
  },
};

export type NoticebarProps = ExtractPropTypes<typeof noticebarProps>;
