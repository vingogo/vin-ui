<template>
  <view class="demo">
    <view class="h2">基本用法</view>
    <vin-cell title="Text 文字提示" is-link @click="textToast('网络失败，请稍后再试~')"></vin-cell>
    <vin-cell
      title="Title 标题展示"
      is-link
      @click="titleToast('网络失败，请稍后再试~')"
    ></vin-cell>
    <vin-cell title="Success 成功提示" is-link @click="successToast('成功提示')"></vin-cell>
    <vin-cell title="Error 失败提示" is-link @click="errorToast('失败提示')"></vin-cell>
    <vin-cell title="Warning 警告提示" is-link @click="warningToast('警告提示')"></vin-cell>
    <vin-cell title="Loading 加载提示" is-link @click="loadingToast('加载中')"></vin-cell>
    <view class="h2">Toast不消失</view>
    <vin-cell title="Toast 文字提示不消失" is-link @click="NoToast('Toast不消失~')"></vin-cell>
    <view class="h2">Toast自定义距离底部高度</view>
    <vin-cell title="Toast 自定义底部高度" is-link @click="BottomToast('自定义距离~')"></vin-cell>
    <view class="h2">Loading带透明遮罩</view>
    <vin-cell title="带文案+带透明遮罩+自动消失" is-link @click="NoLoading('加载中~')"></vin-cell>

    <vin-toast
      :visible="visible"
      v-bind="toast.props"
      @update:visible="visible = false"
    ></vin-toast>
  </view>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('toast');

export default createDemo({
  setup() {
    const visible = ref(false);
    const toast = reactive({ props: {} });

    const textToast = (msg: string) => {
      toast.props = { id: 100, msg };
      visible.value = true;
    };
    const titleToast = (msg: string) => {
      toast.props = { msg, title: '标题文字' };

      visible.value = true;
    };
    const successToast = (msg: string) => {
      toast.props = {
        msg,
        type: 'success',
      };

      visible.value = true;
    };
    const errorToast = (msg: string) => {
      toast.props = {
        msg,
        type: 'fail',
      };

      visible.value = true;
    };
    const warningToast = (msg: string) => {
      toast.props = {
        msg,
        type: 'warn',
      };

      visible.value = true;
    };
    const loadingToast = (msg: string) => {
      toast.props = {
        msg,
        type: 'loading',
      };

      visible.value = true;
    };
    const NoToast = (msg: string) => {
      toast.props = {
        msg,
        duration: 0,
      };

      visible.value = true;
    };
    const BottomToast = (msg: string) => {
      toast.props = {
        msg,
        center: false,
        bottom: '10%',
      };

      visible.value = true;
    };
    const NoLoading = (msg: string) => {
      toast.props = {
        msg,
        cover: true,
      };

      visible.value = true;
    };
    return {
      toast,
      visible,

      textToast,
      titleToast,
      successToast,
      errorToast,
      warningToast,
      loadingToast,
      NoToast,
      NoLoading,
      BottomToast,
    };
  },
});
</script>

<style lang="scss" scoped></style>
