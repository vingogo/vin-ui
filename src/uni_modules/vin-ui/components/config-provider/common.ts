import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const configProviderProps = {
  ...commonProps,
  theme: { type: String, default: '' },
  themeVars: { type: Object, default: {} },
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
