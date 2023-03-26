import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const searchbarProps = {
  ...commonProps,
  modelValue: {
    type: [String, Number],
    default: '',
  },
  maxLength: {
    type: [String, Number],
    default: '9999',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
    default: '',
  },
  inputBackground: {
    type: String,
    default: '',
  },
};

export type SearchbarProps = ExtractPropTypes<typeof searchbarProps>;
