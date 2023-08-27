import type { CSSProperties, PropType } from 'vue';
import { commonProps } from '../common';

export const overlayProps = {
  ...commonProps,
  visible: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: [Number, String],
    default: 2000,
  },
  duration: {
    type: [Number, String],
    default: 300,
  },
  overlayClass: {
    type: String,
    default: '',
  },
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
};
