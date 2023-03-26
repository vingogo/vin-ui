<template>
  <view class="demo full">
    <vin-cell-group :title="translate('basic')">
      <vin-cell>
        <vin-radiogroup v-model="radioVal">
          <vin-radio label="1">{{ translate('option1') }}</vin-radio>
          <vin-radio disabled label="2">{{ translate('option2') }}</vin-radio>
          <vin-radio label="3">{{ translate('option3') }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
      <vin-cell>
        <vin-radiogroup v-model="radioVal" text-position="left">
          <vin-radio label="1">{{ translate('option1') }}</vin-radio>
          <vin-radio disabled label="2">{{ translate('option2') }}</vin-radio>
          <vin-radio label="3">{{ translate('option3') }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
      <vin-cell>
        <vin-radiogroup v-model="radioVal">
          <vin-radio shape="button" label="1">{{ translate('option1') }}</vin-radio>
          <vin-radio disabled shape="button" label="2">{{ translate('option2') }}</vin-radio>
          <vin-radio shape="button" label="3">{{ translate('option3') }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('vertical')">
      <vin-cell>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio label="1">{{ translate('option1') }}</vin-radio>
          <vin-radio label="2">{{ translate('option2') }}</vin-radio>
          <vin-radio label="3">{{ translate('option3') }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
      <vin-cell>
        <vin-radiogroup v-model="radioVal" text-position="left" direction="horizontal">
          <vin-radio label="1">{{ translate('option1') }}</vin-radio>
          <vin-radio label="2">{{ translate('option2') }}</vin-radio>
          <vin-radio label="3">{{ translate('option3') }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
      <vin-cell>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio shape="button" label="1">{{ translate('option1') }}</vin-radio>
          <vin-radio shape="button" label="2">{{ translate('option2') }}</vin-radio>
          <vin-radio shape="button" label="3">{{ translate('option3') }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('size')">
      <vin-cell>
        <vin-radiogroup v-model="radioVal4">
          <vin-radio label="1" icon-size="12">{{ translate('size') }} 12</vin-radio>
          <vin-radio label="2" icon-size="12">{{ translate('size') }} 12</vin-radio>
        </vin-radiogroup>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('icon')">
      <vin-cell>
        <vin-radiogroup v-model="radioVal5">
          <vin-radio label="1" icon-name="checklist" icon-active-name="checklist">{{
            translate('icon')
          }}</vin-radio>
          <vin-radio label="2" icon-name="checklist" icon-active-name="checklist">{{
            translate('icon')
          }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('trigger')">
      <vin-cell>
        <vin-radiogroup v-model="radioVal6" @change="handleChange">
          <vin-radio label="1">{{ translate('trigger') }}</vin-radio>
          <vin-radio label="2">{{ translate('trigger') }}</vin-radio>
        </vin-radiogroup>
      </vin-cell>
      <vin-cell :title="translate('current')" :desc="radioVal6"></vin-cell>
    </vin-cell-group>
  </view>
</template>

<script lang="ts">
import { createComponent } from '@vingogo/uni-ui/components/common/create';
import { reactive, toRefs } from 'vue';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('radio');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    option1: '选项1',
    option2: '选项2',
    option3: '选项3',
    vertical: '水平使用',
    size: '自定义尺寸',
    icon: '自定义图标',
    trigger: '触发事件',
    current: '当前选中值',
  },
  'en-US': {
    basic: 'Basic Usage',
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3',
    vertical: 'Horizontal use',
    size: 'Custom size',
    icon: 'Custom icon',
    trigger: 'Trigger event',
    current: 'Currently selected value',
  },
});
export default createDemo({
  props: {},
  setup() {
    const data = reactive({
      radioVal: '1',
      radioVal2: '2',
      radioVal3: '1',
      radioVal4: '1',
      radioVal5: '1',
      radioVal6: '1',
    });
    const handleChange = (value: any) => {
      console.log(value);
    };
    return {
      ...toRefs(data),
      handleChange,
      translate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
