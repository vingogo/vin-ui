<template>
  <view class="demo">
    <view class="h2">按钮类型</view>
    <view class="demo-button-row">
      <vin-button type="primary">主要按钮</vin-button>
      <vin-button type="info">信息按钮</vin-button>
      <vin-button type="default">默认按钮</vin-button>
    </view>
    <view class="demo-button-row2">
      <vin-button type="danger">危险按钮</vin-button>
      <vin-button type="warning">警告按钮</vin-button>
      <vin-button type="success">成功按钮</vin-button>
    </view>
    <view class="h2">朴素按钮</view>
    <view class="demo-button-row2">
      <vin-button plain type="primary">朴素按钮</vin-button>
      <vin-button plain type="info">朴素按钮</vin-button>
    </view>
    <view class="h2">禁用状态</view>
    <view class="demo-button-row2">
      <vin-button disabled type="primary">禁用状态</vin-button>
      <vin-button plain disabled type="info">禁用状态</vin-button>
      <vin-button plain disabled type="primary">禁用状态</vin-button>
    </view>
    <view class="h2">按钮形状</view>
    <view class="demo-button-row2">
      <vin-button shape="square" type="primary">方形按钮</vin-button>
      <vin-button type="info">圆形按钮</vin-button>
    </view>
    <view class="h2">加载状态</view>
    <view class="demo-button-row2">
      <vin-button loading type="info"></vin-button>
      <vin-button loading type="warning">加载中...</vin-button>
      <vin-button :loading="isLoading" type="success" @click="changeLoading">Click me!</vin-button>
    </view>
    <view class="h2">图标按钮</view>
    <view class="demo-button-row2">
      <vin-button shape="square" plain type="primary" icon="star-fill"></vin-button>
      <vin-button shape="square" type="primary" icon="star">收藏</vin-button>
    </view>

    <view class="h2">按钮尺寸</view>
    <view class="demo-button-row2">
      <vin-button size="large" type="primary">大号按钮</vin-button>
      <view style="margin-top: 10px">
        <vin-button type="primary">普通按钮</vin-button>
        <vin-button size="small" type="primary">小型按钮</vin-button>
        <vin-button size="mini" type="primary">迷你按钮</vin-button>
      </view>
    </view>
    <view class="h2">块级元素</view>
    <view class="demo-button-row2">
      <vin-button block type="primary">块级元素</vin-button>
    </view>
    <view class="h2">自定义颜色</view>
    <view class="demo-button-row2">
      <vin-button color="#7232dd">单色按钮</vin-button>
      <vin-button color="#7232dd" plain>单色按钮</vin-button>
      <vin-button color="linear-gradient(to right, #ff6034, #ee0a24)"> 渐变按钮 </vin-button>
    </view>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('button');

export default createDemo({
  setup(props) {
    const isLoading = ref(false);
    const changeLoading = () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 3000);
    };

    return {
      isLoading,
      changeLoading,
    };
  },
});
</script>

<style lang="scss">
.demo-button-row {
  margin-bottom: 20px;
}
.demo-button-row2 {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.demo-button-row,
.demo-button-row2 {
  .vin-button {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
