<template>
  <view :class="mainClass">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import { useInject } from '../../shared/hooks';
import { TAB_KEY } from '../tabs/common';
import { tabpaneProps } from './common';

const { create, useVinContext } = createComponent('tabpane');

export default create({
  props: tabpaneProps,
  emits: ['click'],
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { parent } = useInject<{ activeKey: string }>(TAB_KEY);
    const mainClass = computed(() =>
      getMainClass({
        active: props.paneKey === parent?.activeKey,
      })
    );
    const mainStyle = computed(getMainStyle);

    return { mainClass, mainStyle };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
