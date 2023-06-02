import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

export interface Events {
  eventName: 'focus' | 'blur' | 'clear' | 'change' | 'confirm' | 'update:modelValue';
  params: (string | number | Event)[];
}
export type InputAlignType = 'left' | 'center' | 'right'; // text-align
export type InputFormatTrigger = 'onChange' | 'onBlur'; // onChange: 在输入时执行格式化 ; onBlur: 在失焦时执行格式化
export type InputType =
  | 'tel'
  | 'url'
  | 'date'
  | 'file'
  | 'text'
  | 'time'
  | 'week'
  | 'color'
  | 'digit'
  | 'email'
  | 'image'
  | 'month'
  | 'radio'
  | 'range'
  | 'reset'
  | 'button'
  | 'hidden'
  | 'number'
  | 'search'
  | 'submit'
  | 'checkbox'
  | 'password'
  | 'textarea'
  | 'datetime-local';

export type InputRule = {
  pattern?: RegExp;
  message?: string;
  required?: boolean;
};

export const inputProps = {
  ...commonProps,
  ref: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  labelClass: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: [String, Number],
    default: '80',
  },
  labelAlign: {
    type: String as PropType<InputAlignType>,
    default: 'left',
  },
  inputAlign: {
    type: String,
    default: 'left',
  },
  colon: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: [String, Number],
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  clearIcon: {
    type: String,
    default: 'mask-close',
  },
  clearSize: {
    type: [String, Number],
    default: '14',
  },
  leftIconSize: {
    type: [String, Number],
    default: '',
  },
  leftIcon: {
    type: String,
    default: '',
  },
  rightIcon: {
    type: String,
    default: '',
  },
  rightIconSize: {
    type: [String, Number],
    default: '',
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array as PropType<InputRule>,
    default: [],
  },
  rows: {
    type: [String, Number],
    default: null,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  errorMessageAlign: {
    type: String as PropType<InputAlignType>,
    default: '',
  },
  formatter: {
    type: Function as PropType<(value: string) => string>,
    default: null,
  },
  formatTrigger: {
    type: String as PropType<InputFormatTrigger>,
    default: 'onChange',
  },
  adjustPosition: {
    type: Boolean,
    default: true,
  },
};

export type InputProps = ExtractPropTypes<typeof inputProps>;
