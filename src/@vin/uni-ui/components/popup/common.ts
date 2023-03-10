import { overlayProps } from '../overlay/common';

export const popupProps = {
  ...overlayProps,
  overlay: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'center',
  },
  transition: String,
  popClass: {
    type: String,
    default: '',
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  closeIconPosition: {
    type: String,
    default: 'top-right',
  },
  closeIcon: {
    type: String,
    default: 'close',
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  round: {
    type: Boolean,
    default: false,
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
};
