<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <view :class="classes" v-if="info && Object.keys(info)">
    <!-- 根据展示信息的多少，分为3种展示风格：simple，base，complex -->
    <vin-comment-header :type="headerType" :info="info" :labels="labels" @handleClick="handleClick">
      <template #labels>
        <slot name="comment-labels"></slot>
      </template>
    </vin-comment-header>

    <slot name="feature"></slot>

    <view
      class="vin-comment__main"
      :style="`-webkit-line-clamp:${conEllipsis}`"
      @click="handleClick"
      v-html="info.content?.replace(/\n/g, '<br>')"
    ></view>

    <vin-comment-images
      :images="images"
      :videos="videos"
      :type="imagesRows"
      @clickImages="clickImages"
    ></vin-comment-images>

    <view class="vin-comment__follow" v-if="follow && follow.days > 0" @click="handleClick">
      <view class="vin-comment__follow-title">购买{{ follow.days }}天后追评</view>
      <view class="vin-comment__follow-com">{{ follow.content }}</view>
      <view class="vin-comment__follow-img" v-if="follow.images && follow.images.length > 0"
        >{{ follow.images.length }} 张追评图片 <vin-icon size="12" name="right"
      /></view>
    </view>

    <vin-comment-bottom
      :type="headerType"
      :info="info"
      :operation="operation"
      @clickOperate="clickOperate"
      @handleClick="handleClick"
    ></vin-comment-bottom>

    <slot name="cmt-shop-reply"></slot>
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';

const { componentName, create } = createComponent('comment');

export default create({
  props: {
    customClass: {
      type: String,
      default: '',
    },

    headerType: {
      type: String,
      default: 'default', // 头部展示风格 default，complex
    },

    imagesRows: {
      type: String,
      default: 'one', // 'one'  'multi'
    },

    ellipsis: {
      type: [String, Number, Boolean],
      default: false,
    },

    videos: {
      type: Array,
      default: () => [],
    },
    images: {
      type: Array,
      default: () => [],
    },

    info: {
      type: Object,
      default: () => ({}),
    },

    follow: {
      type: Object,
      default: () => ({}),
    },

    labels: {
      type: Function,
      default: () => '',
    },

    operation: {
      type: Array,
      default: ['replay', 'like', 'more'],
    },
  },
  emits: ['click', 'clickImages', 'clickOperate'],

  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return [
        {
          [prefixCls]: true,
        },
        props.customClass,
      ];
    });

    const conEllipsis = computed(() => {
      if (props.ellipsis) return props.ellipsis;

      return props.headerType === 'complex' ? 6 : 2;
    });
    const clickOperate = (t: string) => {
      emit('clickOperate', t);
    };

    const handleClick = () => {
      emit('click', props.info);
    };

    const clickImages = (value: any) => {
      emit('clickImages', value);
    };

    return {
      classes,
      conEllipsis,
      clickOperate,
      handleClick,
      clickImages,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
