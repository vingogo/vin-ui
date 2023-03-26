<template>
  <view class="demo">
    <view class="h2">基础用法</view>
    <view class="show">
      <vin-empty description="无数据"></vin-empty>
    </view>

    <view class="h2">图片类型，内置3个</view>
    <view class="show">
      <vin-tabs v-model="tabValue">
        <vin-tabpane title="无内容">
          <vin-empty image="empty" description="无内容"></vin-empty>
        </vin-tabpane>
        <vin-tabpane title="加载失败/错误">
          <vin-empty image="error" description="加载失败/错误"></vin-empty>
        </vin-tabpane>
        <vin-tabpane title="无网络">
          <vin-empty image="network" description="无网络"></vin-empty>
        </vin-tabpane>
      </vin-tabs>
    </view>

    <view class="h2">自定义图片</view>
    <view class="show">
      <vin-empty description="无优惠券">
        <template #image>
          <img
            style="width: 100%"
            src="https://static-ftcms.jd.com/p/files/61a9e3313985005b3958672e.png"
          />
        </template>
      </vin-empty>
    </view>

    <view class="h2">底部内容</view>
    <view class="show">
      <vin-empty image="error" description="加载失败">
        <view style="margin-top: 10px">
          <vin-button icon="refresh" type="primary">重试</vin-button>
        </view>
      </vin-empty>
    </view>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@vingogo/uni-ui/components/common/create';

const { createDemo } = createComponent('empty');
export default createDemo({
  props: {},
  setup() {
    const tabValue = ref(0);
    return {
      tabValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo {
  .show {
    background: #ffffff;
  }
}
</style>
