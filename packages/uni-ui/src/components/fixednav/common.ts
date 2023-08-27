import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export interface navItem {
  id?: string;
  icon: string;
  text: string;
  num: number;
}

export const fixednavProps = {
  ...commonProps,
  visible: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  navList: {
    default: () => [],
    type: Array as PropType<navItem[]>,
  },
  activeText: {
    default: '',
    type: String,
  },
  unActiveText: {
    default: '',
    type: String,
  },
  position: {
    default: () => {
      return {
        top: 'auto',
        bottom: 'auto',
      };
    },
    type: Object,
  },
  type: {
    default: 'right',
    type: String,
  },
};

export type FixednavProps = ExtractPropTypes<typeof fixednavProps>;
