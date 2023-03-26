<template>
  <view class="demo">
    <view class="h2">基础用法</view>
    <vin-cell>
      <vin-switch v-model="checked" />
    </vin-cell>

    <view class="h2">值为字符串</view>
    <vin-cell>
      <vin-switch v-model="checkedStr" activeValue="开" inactiveValue="关" @change="change" />
    </vin-cell>

    <view class="h2">禁用状态</view>
    <vin-cell>
      <vin-switch v-model="checked" disable />
    </vin-cell>

    <view class="h2">加载状态</view>
    <vin-cell>
      <vin-switch v-model="checked" loading color="red" />
    </vin-cell>

    <view class="h2">change事件</view>
    <vin-cell>
      <vin-switch v-model="checked" @change="change" />
    </vin-cell>

    <view class="h2">异步控制</view>
    <vin-cell>
      <vin-switch :model-value="checkedAsync" @change="changeAsync" :loading="loadingAsync" />
    </vin-cell>

    <view class="h2">自定义颜色</view>
    <vin-cell>
      <vin-switch v-model="checked" @change="change" active-color="blue" />
    </vin-cell>

    <view class="h2">支持文字</view>
    <vin-cell>
      <vin-switch v-model="checked" @change="change" active-text="开" inactive-text="关" />
    </vin-cell>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@vingogo/uni-ui/components/common/create';

const { createDemo } = createComponent('switch');
export default createDemo({
  setup() {
    const checked = ref(true);
    const checkedAsync = ref(true);
    const loadingAsync = ref(false);

    const checkedStr = ref('开');

    const change = (value: boolean, event: Event) => {
      uni.showToast({ title: `触发了change事件，开关状态：${value}` });
    };

    const changeAsync = (value: boolean, event: Event) => {
      uni.showToast({ title: `2秒后异步触发 ${value}` });
      loadingAsync.value = true;
      setTimeout(() => {
        checkedAsync.value = value;
        loadingAsync.value = false;
      }, 2000);
    };

    return {
      checked,
      checkedAsync,
      checkedStr,
      loadingAsync,
      change,
      changeAsync,
    };
  },
});
</script>
