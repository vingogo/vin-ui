<template>
  <view class="demo full">
    <view class="h2">基础用法</view>

    <vin-navbar @on-click-back="back" @on-click-title="title" title="订单详情">
      <template #left>
        <view>返回</view>
      </template>
      <template #right>
        <vin-icon class="right" name="share-n"></vin-icon>
      </template>
    </vin-navbar>

    <vin-navbar
      @on-click-back="back"
      @on-click-title="title"
      @on-click-right="rightClick"
      title="浏览记录"
      desc="清空"
    ></vin-navbar>

    <vin-navbar
      :left-show="false"
      @on-click-back="back"
      @on-click-title="title"
      @on-click-icon="icon"
      @on-click-right="rightClick"
      title="购物车"
      titIcon="cart2"
      desc="编辑"
    >
      <template #right>
        <vin-icon class="right" name="more-x"></vin-icon>
      </template>
    </vin-navbar>

    <view class="h2">自定义导航栏中间内容</view>
    <vin-navbar
      @on-click-back="back"
      @on-click-title="title"
      @on-click-right="rightClick"
      desc="编辑"
    >
      <template #content>
        <vin-tabs v-model="tab1value" @click="changeTab" custom-class="navbar-tabs">
          <vin-tabpane title="商品"> </vin-tabpane>
          <vin-tabpane title="店铺"> </vin-tabpane>
        </vin-tabs>
      </template>

      <template #right>
        <vin-icon class="right" name="more-x"></vin-icon>
      </template>
    </vin-navbar>

    <view class="h2">多tab切换导航</view>
    <vin-navbar @on-click-back="back">
      <template #content>
        <vin-tabs v-model="tab2value" @click="changeTabList" custom-class="navbar-tabs">
          <vin-tabpane title="商品"> </vin-tabpane>
          <vin-tabpane title="评价"> </vin-tabpane>
          <vin-tabpane title="详情"> </vin-tabpane>
          <vin-tabpane title="推荐"> </vin-tabpane>
        </vin-tabs>
      </template>
      <template #icons>
        <vin-icon class="icon" name="share"></vin-icon>
      </template>

      <template #right>
        <vin-icon class="right" name="horizontal-n"></vin-icon>
      </template>
    </vin-navbar>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@vingogo/uni-ui/common/create';

const { createDemo } = createComponent('navbar');
export default createDemo({
  setup() {
    const tab1value = ref(0);
    const tab2value = ref(0);
    const methods = {
      back() {
        uni.showToast({ title: 'header头部， 点击返回' });
      },
      title() {
        uni.showToast({ title: 'header头部， 点击title' });
      },
      icon() {
        uni.showToast({ title: 'icon' });
      },

      rightClick() {
        uni.showToast({ title: '右侧点击事件' });
      },
      changeTab(tab: any) {
        tab1value.value = tab.paneKey as number;
      },
      changeTabList(tab: any) {
        tab2value.value = tab.paneKey as number;
      },
    };

    return {
      tab1value,
      tab2value,
      ...methods,
    };
  },
});
</script>

<style lang="scss" scoped>
.right {
  margin-left: 10px;
}

.navbar-tabs {
  ::v-deep {
    .vin-tabs__titles {
      background: transparent;
    }
    .vin-tabs__content {
      display: none;
    }
  }
}
</style>
