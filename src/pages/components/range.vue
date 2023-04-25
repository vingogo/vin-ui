<template>
  <app-page-layout title="返回顶部">
    <view class="h2">基础用法</view>
    <vin-cell class="cell">
      <vin-range v-model="value1" @change="onChange"></vin-range>
    </vin-cell>
    <view class="h2">双滑块</view>
    <vin-cell class="cell">
      <vin-range range v-model="value2" @change="onChange"></vin-range>
    </vin-cell>
    <view class="h2">指定范围</view>
    <vin-cell class="cell">
      <vin-range v-model="value3" :max="10" :min="-10" @change="onChange"></vin-range>
    </vin-cell>
    <view class="h2">设置步长</view>
    <vin-cell class="cell">
      <vin-range v-model="value4" :step="5" @change="onChange"></vin-range>
    </vin-cell>
    <view class="h2">隐藏范围</view>
    <vin-cell class="cell">
      <vin-range hidden-range v-model="value5" @change="onChange"></vin-range>
    </vin-cell>
    <view class="h2">隐藏标签</view>
    <vin-cell class="cell">
      <vin-range hidden-tag v-model="value6" @change="onChange"></vin-range>
    </vin-cell>
    <view class="h2">禁用</view>
    <vin-cell class="cell">
      <vin-range disabled v-model="value7"></vin-range>
    </vin-cell>
    <view class="h2">自定义样式</view>
    <vin-cell class="cell">
      <vin-range
        v-model="value8"
        @change="onChange"
        inactive-color="rgba(163,184,255,1)"
        button-color="rgba(52,96,250,1)"
        active-color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)"
      ></vin-range>
    </vin-cell>
    <view class="h2">自定义按钮</view>
    <vin-cell class="cell">
      <vin-range v-model="value9" @change="onChange">
        <template #button>
          <view class="custom-button">{{ value9 }}</view>
        </template>
      </vin-range>
    </vin-cell>

    <view class="h2">垂直方向</view>
    <vin-cell class="vertical_view">
      <view class="view">
        <vin-range v-model="value10" @change="onChange" :vertical="true"></vin-range>
      </view>
      <view class="view">
        <vin-range range v-model="value11" @change="onChange" :vertical="true"></vin-range>
      </view>
    </vin-cell>
    <view class="h2">刻度标记</view>
    <vin-cell class="cell">
      <vin-range
        v-model="value12"
        @change="onChange"
        :marks="marks"
        :hiddenRange="true"
      ></vin-range>
    </vin-cell>
    <vin-cell class="cell">
      <vin-range
        range
        v-model="value13"
        @change="onChange"
        :marks="marks"
        :hiddenRange="true"
      ></vin-range>
    </vin-cell>

    <vin-cell class="vertical_view">
      <view class="view">
        <vin-range
          v-model="value14"
          @change="onChange"
          :vertical="true"
          :marks="marks"
          :hiddenRange="true"
        ></vin-range>
      </view>
      <view class="view">
        <vin-range
          range
          v-model="value15"
          @change="onChange"
          :vertical="true"
          :marks="marks"
          :hiddenRange="true"
        ></vin-range>
      </view>
    </vin-cell>
  </view>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('range');
export default createDemo({
  props: {},
  setup() {
    const state = reactive({
      value1: 40,
      value2: [20, 80],
      value3: 0,
      value4: 20,
      value5: 30,
      value6: 40,
      value7: 50,
      value8: 40,
      value9: 60,
      value10: 20,
      value11: [20, 80],
      value12: 60,
      value13: [20, 80],
      value14: 60,
      value15: [20, 80],
      marks: {
        0: 0,
        20: 20,
        40: 40,
        60: 60,
        80: 80,
        100: 100,
      },
    });

    const onChange = (value: number) => uni.showToast({ title: `当前值：${value}` });
    return {
      ...toRefs(state),
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.cell {
  padding: 40px 18px;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
.vertical_view {
  height: 180px;
  padding: 10px;
  .view {
    width: 150px;
  }
}
</style>
