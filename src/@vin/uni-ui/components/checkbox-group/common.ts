import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../../common';

export const checkboxGroupProps = {
  ...commonProps,
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;
