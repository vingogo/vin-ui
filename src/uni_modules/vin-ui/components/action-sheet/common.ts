import type { PropType, ExtractPropTypes } from 'vue';
import { popupProps } from '../popup/common';

export interface menuItems {
  disable: boolean;
  loading: boolean;
  color: string;
  name: string;
  subname: string;
  [x: string]: string | boolean;
}

export const actionSheetProps = {
  ...popupProps,
  cancelTxt: {
    type: String,
    default: '',
  },
  optionTag: {
    type: String,
    default: 'name',
  },
  optionSubTag: {
    type: String,
    default: 'subname',
  },
  chooseTagValue: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#ee0a24',
  },
  description: {
    type: String,
    default: '',
  },
  menuItems: {
    type: Array as PropType<menuItems[]>,
    default: () => [],
  },
  closeAbled: {
    type: Boolean,
    default: true,
  },
};

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>;
