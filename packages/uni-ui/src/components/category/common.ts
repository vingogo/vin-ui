import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export type CategoryType = {
  catName?: string;
  [key: string]: any;
};

export const categoryProps = {
  ...commonProps,
  // 分类模式
  type: {
    type: String,
    default: 'classify',
  },

  // 左侧导航栏
  category: {
    type: Array as PropType<CategoryType>,
    default: () => [],
  },
};

export type CategoryProps = ExtractPropTypes<typeof categoryProps>;
