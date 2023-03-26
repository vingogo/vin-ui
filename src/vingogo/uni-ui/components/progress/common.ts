import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const progressProps = {
  ...commonProps,
  percentage: {
    type: [Number, String],
    default: 0,
    required: true,
  },
  size: {
    type: String,
    default: 'base',
  },
  status: {
    type: String,
    default: 'text',
  },
  strokeWidth: {
    type: [Number, String],
    default: '',
  },
  textInside: {
    type: Boolean,
    default: false,
  },
  showText: {
    type: Boolean,
    default: true,
  },
  strokeColor: {
    type: String,
    default: '',
  },
  textColor: {
    tyep: String,
    default: '',
  },
  textBackground: {
    tyep: String,
    default: '',
  },
  iconName: {
    type: String,
    default: 'checked',
  },
  iconColor: {
    type: String,
    default: '#439422',
  },
  isShowPercentage: {
    type: Boolean,
    default: true,
  },
};

export type ProgressProps = ExtractPropTypes<typeof progressProps>;
