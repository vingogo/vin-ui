<template>
  <vin-backtop @click="handleClick" el-id="elId" :distance="100" :bottom="50">
    <template v-slot:content>
      <view class="demo" id="elId">
        <view class="h2">基本用法</view>
        <view class="text-data">我是测试数据1</view>
        <view class="text-data">我是测试数据2</view>
        <view class="text-data">我是测试数据3</view>
        <view class="text-data">我是测试数据4</view>
        <view class="text-data">我是测试数据5</view>
        <view class="text-data">我是测试数据6</view>
        <view class="text-data">我是测试数据7</view>
        <view class="text-data">我是测试数据8</view>
        <view class="text-data">我是测试数据9</view>
        <view class="text-data">我是测试数据10</view>
        <view class="text-data">我是测试数据11</view>
        <view class="text-data">我是测试数据12</view>
        <view class="text-data">我是测试数据13</view>
        <view class="text-data">我是测试数据14</view>
        <view class="text-data">我是测试数据15</view>
        <view class="text-data">我是测试数据16</view>
        <view class="text-data">我是测试数据17</view>
        <view class="text-data">我是测试数据18</view>
        <view class="text-data">我是测试数据19</view>
        <view class="text-data">我是测试数据20</view>
        <view class="text-data">我是测试数据21</view>
        <view class="text-data">我是测试数据22</view>
        <view class="text-data">我是测试数据23</view>
        <view class="text-data">我是测试数据24</view>
      </view>
    </template>
    <template v-slot:icon>
      <view class="backtop-demo">
        <vin-icon size="12px" class="vin-backtop-main" name="top"></vin-icon
        ><view class="title">顶部</view>
      </view>
    </template>
  </vin-backtop>
</template>

<script>
import { createComponent } from '@vin/uni-ui/common/create';

const { createDemo } = createComponent('backtop');

export default createDemo({
  setup(props, { emit }) {
    const handleClick = () => {
      console.log('触发返回顶部');
    };

    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-data {
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 20px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  height: 46px;
  background: rgba(255, 255, 255, 1);
  border-radius: 7px;
  box-shadow: 0px 1px 7px 0px rgba(237, 238, 241, 1);
  line-height: 19px;
  font-size: 13px;
  color: rgba(102, 102, 102, 1);
}
.backtop-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 12px;
  }
}
</style>
