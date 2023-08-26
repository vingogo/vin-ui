<template>
  <app-page-layout title="全局配置">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-config-provider :theme="theme">
      <vin-cell :title="translate('title1')">
        <template v-slot:link>
          <vin-switch v-model="switchChecked" @change="switchChange" />
        </template>
      </vin-cell>
      <vin-cell
        :title="translate('title2')"
        :sub-title="translate('title3')"
        :desc="translate('desc')"
      ></vin-cell>

      <vin-form>
        <vin-form-item :label="translate('switch')">
          <vin-switch v-model="formData2.switch"></vin-switch>
        </vin-form-item>
        <vin-form-item :label="translate('checkbox')">
          <vin-checkbox v-model="formData2.checkbox">{{ translate('checkbox') }}</vin-checkbox>
        </vin-form-item>
        <vin-form-item :label="translate('radiogroup')">
          <vin-radiogroup direction="horizontal" v-model="formData2.radio">
            <vin-radio label="1">{{ translate('option', 1) }}</vin-radio>
            <vin-radio disabled label="2">{{ translate('option', 2) }}</vin-radio>
            <vin-radio label="3">{{ translate('option', 3) }}</vin-radio>
          </vin-radiogroup>
        </vin-form-item>
        <vin-form-item :label="translate('rate')">
          <vin-rate v-model="formData2.rate" />
        </vin-form-item>
        <vin-form-item :label="translate('inputnumber')">
          <vin-input-number v-model="formData2.number" />
        </vin-form-item>
        <vin-form-item :label="translate('range')">
          <vin-range hidden-tag v-model="formData2.range"></vin-range>
        </vin-form-item>
        <vin-form-item :label="translate('uploader')">
          <vin-uploader
            url="http://apiurl"
            v-model:file-list="formData2.defaultFileList"
            maximum="3"
            multiple
          >
          </vin-uploader>
        </vin-form-item>
      </vin-form>
    </vin-config-provider>
    <view class="h2">{{ translate('custom') }}</view>
    <vin-config-provider :theme-vars="themeVars">
      <vin-form>
        <vin-form-item :label="translate('range')">
          <vin-range hidden-tag v-model="formData2.range"></vin-range>
        </vin-form-item>
      </vin-form>
    </vin-config-provider>
  </app-page-layout>
</template>
<script lang="ts">
import { reactive, ref } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('configprovider');

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基础用法',
      custom: '定制主题',
      title1: '切换暗黑',
      title2: '我是标题',
      title3: '副标题描述',
      desc: '描述文字',
      remarks: '备注',
      remarksTip: '请输入备注',
      switch: '开关',
      checkbox: '复选框',
      radiogroup: '单选按钮',
      option: (v: string) => `选项${v}`,
      rate: '评分',
      inputnumber: '步进器',
      range: '滑块',
      uploader: '文件上传',
      success: '上传成功',
      uploading: '上传中...',
      asyncValidator: '模拟异步验证中',
    },
    'en-US': {
      basic: 'Basic Usage',
      custom: 'Custom Theme',
      title1: 'Switch Dark Mode',
      title2: 'Title',
      title3: 'Subtitle Description',
      desc: 'Description',
      nameTip: 'Please enter your name',
      remarks: 'Remarks',
      remarksTip: 'Please enter remarks',
      switch: 'Switch',
      checkbox: 'Checkbox',
      radiogroup: 'Radiogroup',
      option: (v: string) => `Option${v}`,
      rate: 'Rate',
      inputnumber: 'Inputnumber',
      range: 'Range',
      uploader: 'Upload file',
      success: 'Upload successful',
      uploading: 'Uploading',
      asyncValidator: 'Simulating asynchronous verification',
    },
  });
export default createDemo({
  props: {},
  setup() {
    initTranslate();
    const switchChecked = ref(false);
    const theme = ref('');
    const switchChange = (v: boolean) => {
      theme.value = v ? 'dark' : '';
    };
    const formData2 = reactive({
      switch: false,
      checkbox: false,
      radio: 0,
      number: 0,
      rate: 3,
      range: 30,
      defaultFileList: [
        {
          name: 'file 1.png',
          url: 'https://via.placeholder.com/120x120/f87d09/fff?text=Vin+UI',
          status: 'success',
          message: translate('success'),
          type: 'image',
        },
        {
          name: 'file 2.png',
          url: 'https://via.placeholder.com/120x120/f87d09/fff?text=Vin+UI',
          status: 'uploading',
          message: translate('uploading'),
          type: 'image',
        },
      ],
    });

    const color = reactive({
      primaryColor: '#008000',
      primaryColorEnd: '#008000',
      // rangeBgColor: 'rgba(25,137,250,0.15)',
      // rangeBarBgColor: '#0289fa',
      // rangeBarBtnBorder: '1px solid #0289fa'
    });
    const themeVars = color;
    return {
      formData2,
      switchChecked,
      switchChange,
      theme,
      themeVars,
      translate,
    };
  },
});
</script>
<style lang="scss" scoped>
.demo {
}
</style>
