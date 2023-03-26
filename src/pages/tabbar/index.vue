<template>
  <view class="demo full">
    <view class="h2">{{ translate('basic') }}</view>

    <vin-tabbar @tab-switch="tabSwitch">
      <vin-tabbar-item :tab-title="translate('title')" icon="home"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="category"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="find"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="cart"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="my"></vin-tabbar-item>
    </vin-tabbar>
    <view class="h2">{{ translate('customImg') }}</view>

    <vin-tabbar @tab-switch="tabSwitch">
      <vin-tabbar-item
        :tab-title="translate('title')"
        img="http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg"
        activeImg="http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg"
      ></vin-tabbar-item>
      <vin-tabbar-item
        :tab-title="translate('title')"
        img="http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg"
        activeImg="http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg"
      ></vin-tabbar-item>
      <vin-tabbar-item
        :tab-title="translate('title')"
        img="http://img13.360buyimg.com/uba/jfs/t1/10361/35/4713/4643/5c0f3d62E437a3c94/273fd0fb90798f03.jpg"
        activeImg="http://img14.360buyimg.com/uba/jfs/t1/26604/35/1073/7896/5c0f3d61Eb9f5f184/5f01c938abe4216d.jpg"
      ></vin-tabbar-item>
      <vin-tabbar-item
        :tab-title="translate('title')"
        img="http://img11.360buyimg.com/uba/jfs/t1/14848/18/1066/3723/5c0f41bdE9f2a38fe/e6ed6768717297fb.jpg"
        activeImg="http://img30.360buyimg.com/uba/jfs/t1/17538/16/1070/6214/5c0f41bdE4bc9a1db/74cf978e5015454b.jpg"
      ></vin-tabbar-item>
      <vin-tabbar-item
        :tab-title="translate('title')"
        img="http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg"
        activeImg="http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg"
      ></vin-tabbar-item>
    </vin-tabbar>

    <view class="h2">{{ translate('customCheck') }}</view>
    <vin-tabbar v-model:visible="active" size="18px">
      <vin-tabbar-item :tab-title="translate('title')" icon="home"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="category"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="find"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="cart"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="my"></vin-tabbar-item>
    </vin-tabbar>

    <view class="h2">{{ translate('showBadge') }}</view>
    <vin-tabbar>
      <vin-tabbar-item :tab-title="translate('title')" icon="home" num="11"></vin-tabbar-item>
      <vin-tabbar-item
        :tab-title="translate('title')"
        icon="category"
        :dot="true"
      ></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="find"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="cart" num="110"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="my"></vin-tabbar-item>
    </vin-tabbar>

    <view class="h2">{{ translate('customColor') }}</view>
    <vin-tabbar unactive-color="#7d7e80" active-color="#1989fa">
      <vin-tabbar-item :tab-title="translate('title')" icon="home"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="category"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="find"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="cart"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="my"></vin-tabbar-item>
    </vin-tabbar>
    <view class="h2">{{ translate('customQuantity') }}</view>
    <vin-tabbar unactive-color="#7d7e80" active-color="#1989fa">
      <vin-tabbar-item :tab-title="translate('title')" icon="home"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="category"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="find"></vin-tabbar-item>
    </vin-tabbar>
    <view class="h2">{{ translate('fixedBottom') }}</view>
    <vin-tabbar :bottom="true" :safeAreaInsetBottom="true">
      <vin-tabbar-item :tab-title="translate('title')" href="" icon="home"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="category"></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" icon="find"></vin-tabbar-item>
      <vin-tabbar-item
        :tab-title="translate('title')"
        href="http://vingogo.cn"
        icon="cart"
      ></vin-tabbar-item>
      <vin-tabbar-item :tab-title="translate('title')" href="######" icon="my"></vin-tabbar-item>
    </vin-tabbar>
    <view class="padding-bottom"></view>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@vingogo/uni-ui/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('tabbar');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    customImg: '自定义图片',
    customCheck: '自定义选中',
    showBadge: '徽标提示',
    customColor: '自定义颜色',
    customQuantity: '自定义数量',
    fixedBottom: '固定底部',
    title: '标签',
  },
  'en-US': {
    basic: 'Basic Usage',
    customImg: 'Custom Img',
    customCheck: 'Custom Check',
    showBadge: 'Show Badge',
    customColor: 'Custom Color',
    customQuantity: 'Custom Quantity',
    fixedBottom: 'Fixed Bottom',
    title: 'tab',
  },
});
export default createDemo({
  props: {},
  setup() {
    const active = ref(2);
    function tabSwitch(item: Record<string, unknown>, index: number) {
      console.log(item, index);
    }
    return {
      active,
      tabSwitch,
      translate,
    };
  },
});
</script>

<style lang="scss" scoped>
.padding-bottom {
  padding-bottom: 100px;
}
</style>
