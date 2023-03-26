import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const infiniteLoadingProps = {
  ...commonProps,
  hasMore: {
    type: Boolean,
    default: true,
  },
  threshold: {
    type: Number,
    default: 200,
  },
  upperThreshold: {
    type: Number,
    default: 40,
  },
  pullIcon: {
    type: String,
    default: 'refresh',
  },
  pullText: {
    type: String,
    default: '',
  },
  loadIcon: {
    type: String,
    default: 'refresh',
  },
  loadText: {
    type: String,
    default: '',
  },
  loadMoreText: {
    type: String,
    default: '',
  },
  useWindow: {
    type: Boolean,
    default: true,
  },
  containerId: {
    type: String,
    default: '',
  },
  useCapture: {
    type: Boolean,
    default: false,
  },
  isOpenRefresh: {
    type: Boolean,
    default: false,
  },
};

export type InfiniteLoadingProps = ExtractPropTypes<typeof infiniteLoadingProps>;
