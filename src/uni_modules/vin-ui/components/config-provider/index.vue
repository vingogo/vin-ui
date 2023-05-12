<template>
  <view :class="classes" :style="styles">
    <slot />
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { configProviderProps } from './common';
import { kebabCase, colorHexToRgb } from '../../shared/utils';

const { create, useVinContext } = createComponent('config-provider');

export default create({
  props: configProviderProps,
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const colorRgb = (str: string) => {
      if (!str) return;

      const rgb = colorHexToRgb(str);

      return rgb ? `${rgb?.r},${rgb?.g},${rgb?.b}` : null;
    };

    const mapThemeVarsToCSSVars = (themeVars: Record<string, string>) => {
      if (!themeVars) return {};
      let cssVars: Record<string, string> = {};
      const primaryColor = props?.themeVars?.primaryColor;
      // 为了处理一些组件的rgba透明颜色
      if (primaryColor) {
        cssVars = {
          '--vin-tabs-horizontal-tab-line-color': `linear-gradient(90deg, ${primaryColor} 0%, rgba(${colorRgb(
            primaryColor
          )},0.15) 100%)`,
          '--vin-tabs-vertical-tab-line-color': `linear-gradient(180deg, ${primaryColor} 0%, rgba(${colorRgb(
            primaryColor
          )},0.15) 100%)`,
        };
      }
      Object.keys(themeVars).forEach((key) => {
        cssVars[`--vin-${kebabCase(key)}`] = themeVars[key];
      });
      return cssVars;
    };

    const classes = computed(() => {
      return getMainClass({
        [`vin-theme-${props.theme}`]: !!props.theme,
      });
    });

    const styles = computed(() => getMainStyle(mapThemeVarsToCSSVars(props.themeVars)));

    return {
      classes,
      styles,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
