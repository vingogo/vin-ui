<template>
  <app-page-layout title="评论">
    <view class="h2">{{ translate('single') }}</view>
    <vin-cell>
      <vin-comment
        :images="cmt.images"
        :videos="cmt.videos"
        :info="cmt.info"
        @click="handleclick"
        @clickImages="clickImages"
        :operation="['replay']"
      >
        <template #comment-labels>
          <image
            mode="heightFix"
            class="vin-comment-header__labels--item"
            src="https://img11.360buyimg.com/imagetools/jfs/t1/211858/17/4258/12101/618e6f78Ed0edcadc/e83a673555edf59f.jpg"
          />
        </template>
      </vin-comment>
    </vin-cell>

    <view class="h2">{{ translate('multiRow') }}</view>
    <vin-cell>
      <vin-comment
        headerType="complex"
        imagesRows="multi"
        :images="cmt.images"
        :videos="cmt.videos"
        :info="cmt.info"
        ellipsis="6"
        @clickImages="clickImages"
      >
        <template #comment-labels>
          <image
            mode="heightFix"
            class="vin-comment-header__labels--item"
            src="https://storage.360buyimg.com/imgtools/78925d9440-f9e874d0-e93d-11eb-8e5c-0da9e18a13b1.png"
            style="height: 12px"
          />
        </template>

        <template #comment-shop-reply>
          <div class="vin-comment-shop">
            <text class="text">京东美妆国际：</text
            >尊敬的客户您好，非常抱歉给您带来不愉快的购物体验，关于过敏，什么成分都不存在个别性和普遍性。
          </div>
        </template>
      </vin-comment>
    </vin-cell>

    <view class="h2">{{ translate('additionalReviewd') }}</view>
    <vin-cell>
      <vin-comment
        imagesRows="multi"
        :images="cmt.images"
        :videos="cmt.videos"
        :info="cmt.info"
        :follow="cmt.follow"
        @clickImages="clickImages"
      ></vin-comment>
    </vin-cell>
  </app-page-layout>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue';

import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

import { comments } from '@/mock/comment';

const { createDemo, translate } = createComponent('cell');

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基础用法',
      single: '评论图片单行展示',
      multiRow: '评论图片多行展示',
      additionalReviewd: '追评展示',
    },
    'en-US': {
      basic: 'Basic Usage',
      single: 'Single Line Image',
      multiRow: 'Multi Line Image ',
      review: 'Additional Review',
    },
  });

export default createDemo({
  setup() {
    initTranslate();
    const cmt = ref({});

    const handleclick = (info: any) => {
      console.log('进行跳转', info);
    };

    onMounted(() => {
      getData();
    });

    const getData = () => {
      cmt.value = comments.Comment;
    };

    const clickImages = (imgs: any) => {
      console.log('进行图片展示', imgs);
    };

    return {
      cmt,
      handleclick,
      clickImages,
      translate,
    };
  },
});
</script>
<style lang="scss" scoped>
.demo {
  :deep(.vin-comment-header__labels--item) {
    display: inline-block;
    height: 16px;
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
