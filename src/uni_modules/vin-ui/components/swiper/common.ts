import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const swiperProps = {
  ...commonProps,
  width: {
    type: [Number, String],
    default: '100%',
  },
  height: {
    type: [Number, String],
    default: 150,
  },
  direction: {
    type: String,
    default: 'horizontal', // horizontal and vertical
  },
  paginationVisible: {
    type: Boolean,
    default: false,
  },
  paginationColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.3)',
  },
  paginationActiveColor: {
    type: String,
    default: '#000',
  },
  loop: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 500,
  },
  autoPlay: {
    type: [Number, String],
    default: 0,
  },
  initPage: {
    type: [Number, String],
    default: 0,
  },
  touchable: {
    type: Boolean,
    default: true,
  },
};

export const SWIPER_KEY = Symbol('swiper');

export type SwiperProps = ExtractPropTypes<typeof swiperProps>;
