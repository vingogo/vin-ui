<template>
  <view class="demo">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-cell>
      <vin-list :height="50" :listData="count" @scroll="handleScroll">
        <template v-slot="{ item }">
          <view class="list-item">
            {{ item }}
          </view>
        </template>
      </vin-list>
    </vin-cell>
  </view>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { createComponent } from '@vingogo/uni-ui/components/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('list');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
  },
  'en-US': {
    basic: 'Basic Usage',
  },
});
export default createDemo({
  props: {},
  setup() {
    const state = reactive({
      count: new Array(100).fill(0),
    });

    const handleScroll = () => {
      const arr = new Array(100).fill(0);
      const len = state.count.length;
      state.count = state.count.concat(arr.map((item: number, index: number) => len + index + 1));
    };

    onMounted(() => {
      state.count = state.count.map((item: number, index: number) => index + 1);
    });

    return { ...toRefs(state), handleScroll, translate };
  },
});
</script>
<style lang="scss">
.demo {
  .vin-cell {
    height: 100%;
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    background-color: #f4a8b6;
    border-radius: 10px;
  }
}
</style>
