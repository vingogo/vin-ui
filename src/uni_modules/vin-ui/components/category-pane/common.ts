import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export type CategoryType = {
  catName?: string;
  [key: string]: any;
};

export type ChildType = {
  catName?: string;
  catType?: number;
  [key: string]: any;
};
export type CustomType = {
  catName?: string;
  [key: string]: any;
};

export const categoryPaneProps = {
  ...commonProps,
  // 分类模式
  type: {
    type: String,
    default: 'classify',
  },

  // 右侧导航数据
  categoryChild: {
    type: Array as PropType<ChildType>,
    default: () => [],
  },

  // 模式传入自定义数据
  customCategory: {
    type: Array as PropType<CustomType>,
    default: () => [],
  },
};

export type CategoryPaneProps = ExtractPropTypes<typeof categoryPaneProps>;
