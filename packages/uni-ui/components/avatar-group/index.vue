<template>
  <view :class="classes" ref="avatarGroupRef">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import { createComponent } from '../../common/create';
import { useProvide } from '../../shared/hooks';
import { AVATAR_KEY, avatarGroupProps } from './common';

const { classPrefix, create, useVinContext } = createComponent('avatar-group');

export default create({
  props: avatarGroupProps,
  setup(props) {
    const { getMainClass } = useVinContext(props);

    const avatarGroupRef = ref(null);

    const index = ref(0);

    const classes = computed(getMainClass);

    useProvide(AVATAR_KEY, `${classPrefix}-avatar`)({ props, avatarGroupRef, index });

    return {
      classes,
      avatarGroupRef,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
