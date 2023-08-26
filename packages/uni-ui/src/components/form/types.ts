import { FormItemRule } from '../form-item/types';

export type FormRule = {
  prop: string;
  rules: FormItemRule[];
};
export type ErrorMessage = {
  prop: string;
  message: string;
};
