import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

type statusOptions = {
  [key: string]: string;
};

/**
 * 内置图片地址
 */
export const defaultStatus: statusOptions = {
  empty: 'https://static-ftcms.jd.com/p/files/61a9e3183985005b3958672b.png',
  error: 'https://ftcms.jd.com/p/files/61a9e33ee7dcdbcc0ce62736.png',
  network: 'https://static-ftcms.jd.com/p/files/61a9e31de7dcdbcc0ce62734.png',
};

export const emptyProps = {
  ...commonProps,
  image: {
    type: String,
    default: 'empty', // 默认empty
  },
  imageSize: {
    type: [Number, String], // 图片大小，正方形
    default: '',
  },
  description: {
    type: String, // 文字区
    default: '',
  },
};

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
