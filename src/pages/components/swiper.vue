<template>
  <app-page-layout title="轮播">
    <view class="h2">{{ translate('basic') }}</view>
    <view class="demo-box">
      <vin-swiper
        :list="list"
        :init-page="page"
        :pagination-visible="true"
        pagination-active-color="#f87d09"
        auto-play="2000"
      >
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
      </vin-swiper>
    </view>
    <view class="h2">{{ translate('asyc') }}</view>
    <view class="demo-box">
      <vin-swiper
        :list="list1"
        :init-page="page"
        :pagination-visible="true"
        pagination-active-color="#f87d09"
        auto-play="2000"
      >
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
      </vin-swiper>
    </view>
    <view class="h2">{{ translate('dynamicDel') }}</view>
    <view class="demo-box">
      <vin-swiper
        :list="list2"
        :init-page="page"
        :pagination-visible="true"
        pagination-active-color="#f87d09"
        auto-play="2000"
      >
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
      </vin-swiper>
    </view>
    <view class="h2">{{ translate('size') }}</view>
    <view class="demo-box">
      <vin-swiper :list="list" :init-page="page2" :loop="false" width="300">
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
      </vin-swiper>
    </view>
    <view class="h2">{{ translate('indicator') }}</view>
    <view class="demo-box">
      <vin-swiper :list="list" :init-page="page3" :loop="true" @change="change">
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
        <template v-slot:page>
          <div class="page">{{ current }}/4</div>
        </template>
      </vin-swiper>
    </view>
    <view class="h2">{{ translate('indicator1') }}</view>
    <view class="demo-box">
      <vin-swiper :list="list1" :init-page="page" :loop="true" @change="change1" auto-play="2000">
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
        <template v-slot:page>
          <div class="page">{{ current1 }}/4</div>
        </template>
      </vin-swiper>
    </view>
    <view class="h2">{{ translate('btns') }}</view>
    <view class="demo-box">
      <vin-swiper :list="list" :init-page="page" :loop="true" ref="swiper">
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
      </vin-swiper>
      <view class="vin-swiper-btns">
        <view class="vin-swiper-btns__left" @click="handlePrev">
          <vin-icon name="left"></vin-icon>
        </view>
        <view class="vin-swiper-btns__left" @click="handleNext">
          <vin-icon name="right"></vin-icon>
        </view>
      </view>
    </view>
    <view class="h2">{{ translate('vertical') }}</view>
    <view class="demo-box">
      <vin-swiper
        :list="list"
        :init-page="page4"
        :loop="true"
        auto-play="3000"
        direction="vertical"
        height="150"
        :pagination-visible="true"
      >
        <template v-slot:default="{ data }">
          <image :src="data" alt="" />
        </template>
      </vin-swiper>
    </view>
  </app-page-layout>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, ref, Ref } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('switch');

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基础用法',
      asyc: '异步加载(3s)',
      dynamicDel: '动态加载',
      size: '自定义大小',
      indicator: '自定义指示器',
      indicator1: '自定义指示器(异步3s)',
      btns: '手动切换',
      vertical: '垂直方向',
      horizontalCenter: '水平居中展示',
      verticalCenter: '垂直居中展示',
    },
    'en-US': {
      basic: 'Basic Usage',
      asyc: 'Asynchronous loading(3s)',
      dynamicDel: 'Dynamic loading',
      size: 'Custom size',
      indicator: 'Custom indicator',
      indicator1: 'Custom indicator(Asynchronous loading(3s))',
      btns: 'Manual switching',
      vertical: 'Vertical direction',
      horizontalCenter: 'Horizontal center display',
      verticalCenter: 'Vertical center display',
    },
  });
export default createDemo({
  props: {},
  setup() {
    initTranslate();
    const swiper = ref(null) as Ref;
    const state = reactive({
      page: 2,
      page2: 0,
      page3: 0,
      page4: 0,
      current: 1,
      current1: 3,
      list: [
        'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
        'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
        'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
        'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
      ],
      list2: [
        'https://via.placeholder.com/375x150/e03997/fff?text=Hello+Vin+UI',
        'https://via.placeholder.com/375x150/b745cb/fff?text=Hello+Vin+UI',
        'https://via.placeholder.com/375x150/8044de/fff?text=Hello+Vin+UI',
        'https://via.placeholder.com/375x150/37c0fe/fff?text=Hello+Vin+UI',
      ],
      list1: [] as string[],
    });
    const change = (index: number) => {
      state.current = index + 1;
    };
    const change1 = (index: number) => {
      state.current1 = index + 1;
    };
    const handlePrev = () => {
      swiper.value.prev();
    };
    const handleNext = () => {
      swiper.value.next();
    };
    onMounted(() => {
      setTimeout(() => {
        state.list1 = state.list.slice();
        state.list2.splice(1, 1);
      }, 3000);
    });
    return {
      ...toRefs(state),
      swiper,
      change,
      change1,
      handlePrev,
      handleNext,
      translate,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo-box {
  position: relative;

  img,
  image {
    width: 100%;
    height: 150px;
  }

  .page {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 46px;
    height: 22px;
    background: rgba(0, 0, 0, 0.33);
    border-radius: 22px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .vin-swiper-btns {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    display: flex;
    justify-content: space-between;

    &__left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
