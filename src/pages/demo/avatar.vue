<template>
  <demo-page-layout title="头像">
    <view class="h2">支持三种尺寸：small、normal、large</view>
    <vin-cell>
      <vin-avatar
        size="large"
        url="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      >
      </vin-avatar>
      <vin-avatar
        size="normal"
        url="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      >
      </vin-avatar>
      <vin-avatar
        size="small"
        url="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      >
      </vin-avatar>
    </vin-cell>
    <view class="h2">支持两种形状：square、round</view>
    <vin-cell>
      <vin-avatar icon="my" shape="square"></vin-avatar>
      <vin-avatar icon="my" shape="round"></vin-avatar>
    </vin-cell>
    <view class="h2">支持三种类型：图片、Icon 以及字符</view>
    <vin-cell>
      <vin-avatar
        url="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      >
      </vin-avatar>
      <vin-avatar icon="my"></vin-avatar>
      <vin-avatar>N</vin-avatar>
    </vin-cell>
    <view class="h2">Icon 和字符型可以自定义图标颜色及背景色</view>
    <vin-cell>
      <vin-avatar class="demo-avatar" icon="my" color="#fff" bg-color="#FA2C19"></vin-avatar>
      <vin-avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">U</vin-avatar>
    </vin-cell>
    <view class="h2">带徽标的头像</view>
    <vin-cell>
      <vin-badge value="8">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge dot>
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
    </vin-cell>
    <view class="h2">头像组合展现</view>
    <vin-cell>
      <vin-avatar-group span="-4">
        <vin-avatar
          url="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
        >
        </vin-avatar>
        <vin-avatar icon="my"></vin-avatar>
        <vin-avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">U</vin-avatar>
      </vin-avatar-group>
    </vin-cell>

    <vin-cell>
      <vin-avatar-group max-count="3" max-color="#fff" max-bgColor="#498ff2">
        <vin-avatar
          url="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
        >
        </vin-avatar>
        <vin-avatar icon="my"></vin-avatar>
        <vin-avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">U</vin-avatar>
        <vin-avatar icon="my"></vin-avatar>
      </vin-avatar-group>
    </vin-cell>
    <view class="h2">组合头像可控制层级方向</view>
    <vin-cell>
      <vin-avatar-group max-count="3" zIndex="right" max-content="...">
        <vin-avatar
          url="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
        >
        </vin-avatar>
        <vin-avatar icon="my"></vin-avatar>
        <vin-avatar color="rgb(245, 106, 0)" bg-color="rgb(253, 227, 207)">U</vin-avatar>
        <vin-avatar icon="my"></vin-avatar>
      </vin-avatar-group>
    </vin-cell>

    <view class="h2">点击头像触发事件</view>
    <vin-cell>
      <vin-avatar icon="my" @active-avatar="handleClick"></vin-avatar>
    </vin-cell>
  </demo-page-layout>
</template>
<script lang="ts">
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('avatar');
export default createDemo({
  setup() {
    const handleClick = () => {
      console.log('触发点击头像');
    };
    const onError = () => {
      console.log('触发error头像');
    };
    return { handleClick, onError };
  },
});
</script>
<style lang="scss">
.vin-cell {
  align-items: flex-end;
  border-radius: 0;
  & > view {
    margin-right: 30px;
  }
}
.demo-avatar {
  color: #fff;
}
</style>
