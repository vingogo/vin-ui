import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export const toastProps = {
  ...commonProps,
  id: String,
  msg: String,
  duration: {
    type: Number,
    default: 2000,
  },
  title: {
    type: String,
    default: '',
  },
  center: {
    type: Boolean,
    default: true,
  },
  bottom: {
    type: String,
    default: '30px',
  },
  textAlignCenter: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: 'base',
  },
  icon: String,
  iconSize: {
    type: String,
    default: '20',
  },
  cover: {
    type: Boolean,
    default: false,
  },
  coverColor: {
    type: String,
    default: '',
  },
  loadingRotate: {
    type: Boolean,
    default: true,
  },
  onClose: Function,
  unmount: Function,
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  toastStyle: Object as PropType<CSSProperties>,
  toastClass: String,
};

export type ToastProps = ExtractPropTypes<typeof toastProps>;
