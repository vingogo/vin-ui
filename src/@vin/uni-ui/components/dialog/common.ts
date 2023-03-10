import type { ExtractPropTypes, PropType, VNode } from 'vue';
import { popupProps } from '../popup/common';

export const dialogProps = {
  ...popupProps,
  title: {
    type: String,
    default: '',
  },
  content: {
    type: [String, Object] as PropType<string | VNode>,
    default: '',
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  noFooter: {
    type: Boolean,
    default: false,
  },
  noOkBtn: {
    type: Boolean,
    default: false,
  },
  noCancelBtn: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
    default: '',
  },
  okText: {
    type: String,
    default: '',
  },
  cancelAutoClose: {
    type: Boolean,
    default: true,
  },
  textAlign: {
    type: String,
    default: 'center',
  },
  footerDirection: {
    type: String,
    default: 'horizontal', // vertical
  },
};

export type DialogProps = ExtractPropTypes<typeof dialogProps>;
