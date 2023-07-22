<template>
  <view :class="`vin-comment-images vin-comment-images--${type}`">
    <!-- videos -->
    <view
      class="vin-comment-images__item vin-comment-images__item--video"
      v-for="(itV, index) in videos"
      :key="itV.id"
      @click="showImages('video', index)"
    >
      <image :src="itV.mainUrl" />
      <view class="vin-comment-images__play"></view>
    </view>
    <!-- images -->
    <template v-for="(itI, index) in images" :key="itI.id">
      <view
        class="vin-comment-images__item vin-comment-images__item--imgbox"
        v-if="(type == 'multi' && videos.length + index < 9) || type != 'multi'"
        @click="showImages('img', index + videos.length)"
      >
        <image :src="itI.smallImgUrl ? itI.smallImgUrl : itI.imgUrl" />

        <view
          class="vin-comment-images__mask"
          v-if="type == 'multi' && totalImages.length > 9 && videos.length + index > 7"
        >
          <text>共 {{ totalImages.length }} 张</text>
          <vin-icon name="right" size="12"></vin-icon>
        </view>
      </view>
    </template>
  </view>
</template>
<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { commonImagesProps } from './common';
import { createComponent } from '../common/create';

const { create } = createComponent('comment-images');

export default create({
  props: commonImagesProps,
  emits: ['click', 'clickImages'],

  setup(props, { emit }) {
    const isShowImage = ref(false);
    const initIndex = ref(1);
    const totalImages = ref<any[]>([]);

    watch(
      () => [props.videos, props.images],
      (value) => {
        if (value[0].length > 0) {
          value[0].forEach((el: any) => {
            // eslint-disable-next-line no-param-reassign
            el.type = 'video';
          });
        }
        totalImages.value = (value[0] as any).concat(value[1]);
      },
      { deep: true },
    );

    onMounted(() => {
      if (props.videos.length > 0) {
        props.videos.forEach((el: any) => {
          // eslint-disable-next-line no-param-reassign
          el.type = 'video';
        });
      }
      totalImages.value = (props.videos as any).concat(props.images);
    });

    const showImages = (type: string, index: string | number) => {
      const { videos, images } = props;

      const i = type === 'img' ? (index as number) - videos.length : Number(index);
      emit('clickImages', {
        type,
        index: i,
        value: type === 'img' ? images[i] : videos[i],
      });
    };

    return {
      isShowImage,
      initIndex,
      showImages,
      totalImages,
    };
  },
});
</script>
<style lang="scss">
@import '../comment/index.scss';
</style>
