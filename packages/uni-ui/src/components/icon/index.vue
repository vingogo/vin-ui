<template>
  <image v-if="isImage" :src="name" :style="mainStyle" :class="mainClass" @click="handleClick" />

  <text v-else :style="mainStyle" :class="mainClass" @click="handleClick">
    <slot />
  </text>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { pxCheck } from '../../shared/utils/pxCheck';
import { iconProps } from './common';

const { componentName, create, useVinContext } = createComponent('icon');

export default create({
  props: iconProps,
  emits: ['click'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const handleClick = (event: Event) => {
      emit('click', event);
    };

    const isImage = computed(() => {
      return props.name ? props.name.indexOf('/') !== -1 : false;
    });

    const mainClass = computed(() => {
      return getMainClass(
        isImage.value
          ? `${componentName}__img`
          : `${props.fontClassName} ${componentName} ${props.classPrefix}-${props.name}`,
      );
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        color: props.color,
        fontSize: pxCheck(props.size),
        width: pxCheck(props.size),
        height: pxCheck(props.size),
      });
    });

    return {
      isImage,
      mainStyle,
      mainClass,
      handleClick,
      name: props.name,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
