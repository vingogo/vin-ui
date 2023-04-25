<template>
  <app-page-layout title="悬浮导航">
    <vin-fixednav
      :active-text="translate('basic')"
      :position="{ top: '70px' }"
      v-model:visible="visible"
      :nav-list="navList"
      @selected="selected"
    />
    <vin-fixednav
      type="left"
      :position="{ top: '140px' }"
      v-model:visible="visible1"
      :active-text="translate('left1')"
      :un-active-text="translate('left2')"
      :nav-list="navList"
      @selected="selected"
    />
    <vin-fixednav
      :position="{ top: '210px' }"
      :overlay="false"
      v-model:visible="visible2"
      :nav-list="navList"
      @selected="selected"
    />
    <vin-fixednav
      :position="{ top: '280px' }"
      type="left"
      v-model:visible="myActive"
      @selected="selected"
    >
      <template v-slot:list>
        <view :class="['vin-fixednav__list', { active: myActive }]">
          <view class="vin-fixednav__list-item">1</view>
          <view class="vin-fixednav__list-item">2</view>
          <view class="vin-fixednav__list-item">3</view>
          <view class="vin-fixednav__list-item">4</view>
          <view class="vin-fixednav__list-item">5</view>
        </view>
      </template>
      <template v-slot:btn>
        <vin-icon name="retweet" color="#fff"> </vin-icon>
        <view class="vin-fixednav__btn-text">{{
          myActive ? translate('cus1') : translate('cus2')
        }}</view>
      </template>
    </vin-fixednav>
  </app-page-layout>
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('fixednav');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    left1: '左侧收起',
    left2: '左侧展开',
    cus1: '关',
    cus2: '开',
    drag: '支持拖拽',
    index: '首页',
    category: '分类',
    cart: '购物车',
    my: '我的',
  },
  'en-US': {
    basic: 'Basic Usage',
    left1: 'Left Closed',
    left2: 'Left Open',
    cus1: 'Closed',
    cus2: 'Open',
    drag: 'Drag',
    index: 'Index',
    category: 'Category',
    cart: 'Cart',
    my: 'My',
  },
});
export default createDemo({
  props: {},
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const myActive = ref(false);

    onMounted(() => {
      setTimeout(() => {
        visible2.value = true;
      }, 1000);
    });

    const navList = computed(() => [
      {
        id: 1,
        text: translate('index'),
        icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png',
      },
      {
        id: 2,
        text: translate('category'),
        icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/119490/8/9568/1798/5ef83e95E968c69a6/dd029326f7d5042e.png',
      },
      {
        id: 3,
        text: translate('cart'),
        num: 2,
        icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/130725/4/3157/1704/5ef83e95Eb976644f/b36c6cfc1cc1a99d.png',
      },
      {
        id: 4,
        text: translate('my'),
        icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/147573/29/1603/1721/5ef83e94E1393a678/5ddf1695ec989373.png',
      },
    ]);
    const selected = (res: any) => {
      console.log(res);
    };
    return {
      visible,
      visible1,
      visible2,
      visible3,
      myActive,
      navList,
      selected,
      translate,
    };
  },
});
</script>

<style lang="scss" scoped>
.vin-fixednav__list {
  position: absolute;
  transform: translateX(-100%);
  transition: all 0.5s;
  box-sizing: border-box;
  margin: 0;
  z-index: $fixednav-index;
  flex-shrink: 0;
  height: 100%;
  background: $fixednav-bg-color;
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  right: auto;
  border-radius: 0px 25px 25px 0px;
  padding: {
    left: 80px;
    right: 20px;
  }

  &.active {
    transform: translate(0);
  }

  &-item {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    flex-shrink: 0;
    > img,
    > image {
      width: 20px;
      height: 20px;
      margin-bottom: 2px;
    }
    > .span {
      font-size: 10px;
      color: $fixednav-font-color;
    }
    > .b {
      position: absolute;
      right: 0;
      top: 1px;
      height: 14px;
      line-height: 14px;
      font-size: 10px;
      padding: 0 3px;
      color: white;
      background: $primary-color;
      border-radius: 7px;
      text-align: center;
      min-width: 12px;
    }
  }
}
</style>
