<template>
  <view :class="mainClass" :style="mainStyle">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import { dividerProps } from './common';

const { componentName, create, useVinContext } = createComponent('divider');

export default create({
  props: dividerProps,
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const mainClass = computed(() => {
      const prefixCls = componentName;

      return getMainClass({
        [`${prefixCls}-center`]: props.contentPosition === 'center',
        [`${prefixCls}-left`]: props.contentPosition === 'left',
        [`${prefixCls}-right`]: props.contentPosition === 'right',
        [`${prefixCls}-dashed`]: props.dashed,
        [`${prefixCls}-hairline`]: props.hairline,
      });
    });

    const mainStyle = computed(getMainStyle);

    return { mainClass, mainStyle };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
