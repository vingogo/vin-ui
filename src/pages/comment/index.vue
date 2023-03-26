<template>
  <view class="demo">
    <view class="h2">{{ translate('single') }}</view>
    <vin-cell>
      <vin-comment
        :images="cmt.images"
        :videos="cmt.videos"
        :info="cmt.info"
        :labels="labels"
        @click="handleclick"
        @clickImages="clickImages"
        :operation="['replay']"
      >
        <template #comment-labels>
          <img
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
          <img
            class="vin-comment-header__labels--item"
            src="https://storage.360buyimg.com/imgtools/78925d9440-f9e874d0-e93d-11eb-8e5c-0da9e18a13b1.png"
            style="height: 12px"
          />
        </template>

        <template #comment-shop-reply>
          <view class="vin-comment-shop">
            <span>美妆国际：</span
            >尊敬的客户您好，非常抱歉给您带来不愉快的购物体验，关于过敏，什么成分都不存在个别性和普遍性。
          </view>
        </template>
      </vin-comment>
    </vin-cell>

    <view class="h2">{{ translate('review') }}</view>
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
  </view>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue';
import { createComponent } from '@vingogo/uni-ui/components/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('comment');

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基本用法',
      single: '评论图片单行展示',
      multiRow: '评论图片多行展示',
      review: '追评展示',
    },
    'en-US': {
      basic: 'Basic Usage',
      single: 'Single Line Image',
      multiRow: 'Multi Line Image ',
      review: 'Additional Review',
    },
  });

export default createDemo({
  props: {},
  setup() {
    initTranslate();
    const cmt = ref({});
    const labels = () => {
      return '<vin-icon name="fabulous" color="#fa2c19"></vin-icon>';
    };

    const handleclick = (info: any) => {
      console.log('进行跳转', info);
    };

    const getData = () => {
      fetch('//storage.360buyimg.com/nutui/3x/comment_data.json')
        .then((response) => response.json())
        .then((res) => {
          cmt.value = res.Comment;
        }) // 执行结果是 resolve就调用then方法
        .catch((err) => console.log('Oh, error', err)); // 执行结果是 reject就调用catch方法
    };

    onMounted(() => {
      getData();
    });

    const clickImages = (imgs: any) => {
      console.log('进行图片展示', imgs);
    };

    return {
      cmt,
      labels,
      handleclick,
      clickImages,
      translate,
    };
  },
});
</script>
<style lang="scss" scoped>
.demo {
  ::v-deep .vin-comment-header__labels--item {
    display: inline-block;
    height: 16px;
    margin-right: 4px;
  }
}
</style>
