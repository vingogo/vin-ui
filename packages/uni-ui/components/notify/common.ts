import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const notifyProps = {
  ...commonProps,
  id: String,
  type: {
    type: String,
    default: 'danger',
  },
  message: { type: String, default: '' },
  duration: { type: Number, default: 3000 },
  color: { type: String, default: '' },
  background: { type: String, default: '' },
  visible: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'top',
  },
};

export type NotifyProps = ExtractPropTypes<typeof notifyProps>;
