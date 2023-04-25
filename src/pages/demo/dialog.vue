<template>
  <demo-page-layout title="对话框">
    <vin-cell-group :title="translate('title1')">
      <vin-cell :title="translate('basic')" @click="baseClick('basic')"></vin-cell>
      <vin-cell :title="translate('noTitle')" @click="baseClick1('noTitle')"></vin-cell>
      <vin-cell :title="translate('tipDialog')" @click="baseClick1('tips')"></vin-cell>
      <vin-cell :title="translate('title')" @click="baseClick1('vertical')"></vin-cell>
    </vin-cell-group>

    <vin-dialog v-model:visible="visible" :title="translate('basic')" @cancel="onCancel" @ok="onOk">
      <view style="color: red">{{ translate('content3') }}</view>
    </vin-dialog>

    <vin-dialog v-model:visible="visible1" v-bind="currentOptions" @cancel="onCancel" @ok="onOk">
    </vin-dialog>
  </demo-page-layout>
</template>
<script lang="ts">
import { ref, computed } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('dialog');

useTranslate({
  'zh-CN': {
    funUse: '函数式调用',
    basic: '基础弹框',
    noTitle: '无标题弹框',
    tipDialog: '提示弹框',
    tips: '提示',
    title: '底部按钮 垂直使用',
    title1: '标签式使用',
    title2: 'Teleport 使用，挂载到指定节点',
    content: '支持函数调用和组件调用两种方式。',
    content1: '支持底部按钮纵向排列。',
    content2: '打开开发者工具看一下 Elements Tab',
    content3: '我可以是一个自定义组件',
  },
  'en-US': {
    funUse: 'Function use',
    basic: 'Basic Usage',
    noTitle: 'No Title',
    tipDialog: 'Tips Dialog',
    tips: 'Tips',
    title: 'Bottom button vertical use',
    title1: 'Template use',
    title2: 'Teleport use, mount to the specified element node',
    content: 'Function call and template call are supported.',
    content1: 'Support vertical arrangement of bottom buttons.',
    content2: 'Open the developer tool and take a look at the Elements tab',
    content3: 'I can be a custom component',
  },
});

export default createDemo({
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    const type = ref('');

    const onCancel = () => {
      console.log('event cancel');
    };
    const onOk = () => {
      console.log('event ok');
    };

    const options: Record<string, any> = {
      noTitle: {
        content: translate('noTitle'),
      },
      tips: {
        title: translate('tips'),
        content: translate('content'),
        noCancelBtn: true,
      },
      vertical: {
        title: translate('tips'),
        content: translate('content1'),
        footerDirection: 'vertical',
      },
    };

    const currentOptions = computed(() => {
      return options[type.value];
    });

    const baseClick = (mode: string): void => {
      type.value = mode;
      visible.value = true;
    };

    const baseClick1 = (mode: string): void => {
      type.value = mode;
      visible1.value = true;
    };

    return {
      currentOptions,
      visible,
      visible1,
      onCancel,
      onOk,
      baseClick,
      baseClick1,
      translate,
    };
  },
});
</script>
<style lang="scss"></style>
