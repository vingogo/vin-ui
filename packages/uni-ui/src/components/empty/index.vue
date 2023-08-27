<template>
  <view :class="mainClass" :style="mainStyle">
    <!-- 占位图 -->
    <view class="vin-empty-image" :style="imgStyle">
      <template v-if="$slots.image">
        <slot name="image"></slot>
      </template>
      <template v-else>
        <image v-if="imageUrl" class="img" :src="imageUrl" />
      </template>
    </view>

    <!-- 文本区 -->
    <template v-if="$slots.description">
      <slot name="description"></slot>
    </template>
    <template v-else>
      <view class="vin-empty-description">{{ description || translate('noData') }}</view>
    </template>

    <!-- 自定义slot -->
    <template v-if="$slots.default">
      <slot></slot>
    </template>
  </view>
</template>
<script lang="ts">
import { toRefs, computed } from 'vue';
import { createComponent } from '../common/create';
import { emptyProps, defaultStatus } from './common';

const { create, translate, useVinContext } = createComponent('empty');

export default create({
  props: emptyProps,

  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { image, imageSize } = toRefs(props);

    /**
     * 根据imgSize计算行内样式
     */
    const imgStyle = computed(() => {
      if (!imageSize.value) {
        return '';
      }
      if (typeof imageSize.value === 'number') {
        return `width:${imageSize.value}px;height:${imageSize.value}px`;
      }
      return `width:${imageSize.value};height:${imageSize.value}`;
    });

    // 是否 URL
    const isHttpUrl =
      image.value.startsWith('https://') ||
      image.value.startsWith('http://') ||
      image.value.startsWith('//');
    const imageUrl = isHttpUrl ? image.value : defaultStatus[image.value];

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    return {
      imageUrl,
      imgStyle,
      translate,
      mainClass,
      mainStyle,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
