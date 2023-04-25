<template>
  <app-page-layout title="消息通知">
    <vin-cell-group :title="translate('basic')">
      <vin-cell is-link @click="changeNotifyOption({ msg: translate('basic') })">{{
        translate('basic')
      }}</vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('t1')">
      <vin-cell
        is-link
        @click="
          changeNotifyOption({
            msg: translate('primaryNotify'),
            type: 'primary',
            customClass: 'xxx',
          })
        "
        >{{ translate('primaryNotify') }}</vin-cell
      >
      <vin-cell
        is-link
        @click="
          changeNotifyOption({
            msg: translate('successNotify'),
            type: 'success',
          })
        "
        >{{ translate('successNotify') }}</vin-cell
      >
      <vin-cell
        is-link
        @click="changeNotifyOption({ msg: translate('errorNotify'), type: 'danger' })"
        >{{ translate('errorNotify') }}</vin-cell
      >
      <vin-cell
        is-link
        @click="
          changeNotifyOption({
            msg: translate('warningNotify'),
            type: 'warning',
          })
        "
        >{{ translate('warningNotify') }}</vin-cell
      >
    </vin-cell-group>
    <vin-cell-group :title="translate('t2')">
      <vin-cell
        is-link
        @click="
          changeNotifyOption({
            msg: translate('cusBgNotify'),
            color: '#ad0000',
            background: '#ffe1e1',
          })
        "
      >
        {{ translate('cusBgNotify') }}
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('t3')">
      <vin-cell is-link @click="changeNotifyOption({ msg: translate('t3'), duration: 5000 })">
        {{ translate('t3') }} 5s
      </vin-cell>
      <vin-cell
        is-link
        @click="
          changeNotifyOption({
            msg: translate('cusPostion'),
            position: 'bottom',
          })
        "
      >
        {{ translate('cusPostion') }}
      </vin-cell>
    </vin-cell-group>

    <vin-notify v-model:visible="show" v-bind="notify.props">
      <span>Content</span>
    </vin-notify>
  </app-page-layout>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('notify');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    t1: '通知类型',
    t2: '自定义样式',
    t3: '自定义时长',
    cusPostion: '自定义位置',
    useTemplate: '组件调用',
    primaryNotify: '主要通知',
    successNotify: '成功通知',
    errorNotify: '危险通知',
    warningNotify: '警告通知',
    cusBgNotify: '自定义背景色和字体颜色',
  },
  'en-US': {
    basic: 'Basic Usage',
    t1: 'Notify Type',
    t2: 'Custom Style',
    t3: 'Custom Duration',
    cusPostion: 'Custom Postion',
    useTemplate: 'Template use',
    primaryNotify: 'Primary Notify',
    successNotify: 'Success Notify',
    errorNotify: 'Error Notify',
    warningNotify: 'Warning Notify',
    cusBgNotify: 'Customize background and font colors',
  },
});

export default createDemo({
  setup() {
    const show = ref(false);

    const notify = reactive({ props: {} });

    const changeNotifyOption = (props: {
      type?: 'primary' | 'success ' | 'danger' | 'warning';
      msg?: string;
      color?: string;
      background?: string;
      duration?: number;
    }) => {
      notify.props = props;

      show.value = true;
    };

    return {
      show,
      translate,
      notify,
      changeNotifyOption,
    };
  },
});
</script>

<style lang="scss" scoped></style>
