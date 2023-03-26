<template>
  <view :class="mainClass" :style="mainStyle">
    <slot />
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import { pxCheck } from '../../shared/utils/pxCheck';
import { GRID_KEY, gridProps } from './common';
import { useProvide } from '../../shared/hooks';

const { create, componentName, useVinContext } = createComponent('grid');

export default create({
  props: gridProps,
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    useProvide(GRID_KEY, `${componentName}-item`)({ props });

    const mainClass = computed(() => {
      const prefixCls = componentName;

      return getMainClass({
        [`${prefixCls}--border`]: props.border && !props.gutter,
      });
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        'padding-left': props.gutter && pxCheck(props.gutter),
      });
    });

    return {
      mainClass,
      mainStyle,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
