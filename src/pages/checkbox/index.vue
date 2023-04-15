<template>
  <view class="demo">
    <vin-cell-group :title="translate('basic')">
      <vin-cell>
        <vin-checkbox v-model="checkbox1" :label="translate('checkbox')" @change="changeBox1">{{
          translate('checkbox')
        }}</vin-checkbox>
      </vin-cell>
      <vin-cell>
        <vin-checkbox
          v-model="checkbox1"
          text-position="left"
          :label="translate('checkbox')"
          @change="changeBox1"
          >{{ translate('checkbox') }}</vin-checkbox
        >
      </vin-cell>
      <vin-cell>
        <view class="demo-check">{{ translate('selected') }}</view>
        <view>{{ checkbox1 }}</view>
      </vin-cell>
    </vin-cell-group>

    <vin-cell-group :title="translate('disable')">
      <vin-cell>
        <vin-checkbox v-model="checkbox3" disabled>{{ translate('unselectDisable') }}</vin-checkbox>
      </vin-cell>
      <vin-cell>
        <vin-checkbox v-model="checkbox4" disabled>{{ translate('selectedDisable') }}</vin-checkbox>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('size')">
      <vin-cell>
        <vin-checkbox v-model="checkbox5" icon-size="25">{{ translate('size') }}25</vin-checkbox>
      </vin-cell>
      <vin-cell>
        <vin-checkbox v-model="checkbox6" icon-size="10">{{ translate('size') }} 10</vin-checkbox>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('icon')">
      <vin-cell>
        <vin-checkbox v-model="checkbox7" icon-name="checklist" icon-active-name="checklist">{{
          translate('icon')
        }}</vin-checkbox>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('change')">
      <vin-cell>
        <vin-checkbox v-model="checkbox8" @change="changeBox3"
          >change {{ translate('checkbox') }}</vin-checkbox
        >
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('useGroup')">
      <vin-cell>
        <vin-checkbox-group v-model="checkboxgroup1">
          <vin-checkbox label="1" style="margin: 2px 20px 0 0">{{
            translate('combine')
          }}</vin-checkbox>
          <vin-checkbox label="2">{{ translate('combine') }}</vin-checkbox>
          <vin-checkbox label="3" style="margin: 2px 20px 0 0">{{
            translate('combine')
          }}</vin-checkbox>
          <vin-checkbox label="4">{{ translate('combine') }}</vin-checkbox>
        </vin-checkbox-group>
      </vin-cell>
      <vin-cell>
        <view class="demo-check">{{ translate('selected') }}</view>
        <view>{{ checkboxgroup1 }}</view>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('disableGroup')">
      <vin-cell>
        <vin-checkbox-group v-model="checkboxgroup1" disabled>
          <vin-checkbox label="1" style="margin: 2px 20px 0 0">{{
            translate('combine')
          }}</vin-checkbox>
          <vin-checkbox label="2">{{ translate('combine') }}</vin-checkbox>
          <vin-checkbox label="3" style="margin: 2px 20px 0 0">{{
            translate('combine')
          }}</vin-checkbox>
          <vin-checkbox label="4">{{ translate('combine') }}</vin-checkbox>
        </vin-checkbox-group>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group :title="translate('selectGroup')">
      <vin-cell>
        <vin-checkbox-group v-model="checkboxgroup3" ref="group" @change="changeBox4">
          <vin-checkbox v-for="item in checkboxsource" :key="item.label" :label="item.label">{{
            item.value
          }}</vin-checkbox>
        </vin-checkbox-group>
      </vin-cell>
      <vin-cell>
        <view style="margin: 0 20px 0 0">
          <vin-button type="primary" @click="toggleAll(true)">{{
            translate('selectAll')
          }}</vin-button>
        </view>
        <vin-button type="info" @click="toggleAll(false)">{{ translate('cancel') }}</vin-button>
      </vin-cell>
    </vin-cell-group>
  </view>
</template>
<script lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('checkbox');

useTranslate({
  'zh-CN': {
    basic: '基本用法-左右',
    disable: '禁用状态',
    size: '自定义尺寸',
    icon: '自定义图标',
    change: '点击触发change事件',
    useGroup: 'checkboxGroup使用',
    disableGroup: 'checkboxGroup禁用',
    selectGroup: 'checkboxGroup 全选/取消',
    selectAll: '全选',
    cancel: '取消',
    combine: '组合复选框',
    selected: '当前选中值',
    select: '选中',
    checkbox: '复选框',
    selectedDisable: '选中时禁用状态',
    unselectDisable: '未选时禁用状态',
  },
  'en-US': {
    basic: 'Basic usage - left and right',
    disable: 'Disabled state',
    size: 'Custom size',
    icon: 'Custom icon',
    change: 'Click to trigger the change event',
    useGroup: 'use checkboxGroup',
    disableGroup: 'disable checkboxGroup',
    selectGroup: 'Checkboxgroup select all / cancel',
    selectAll: 'selectAll',
    cancel: 'cancel',
    combine: 'Combined check box',
    selected: 'Currently selected value',
    select: 'selected value',
    checkbox: 'check box',
    selectedDisable: 'Disabled when selected',
    unselectDisable: 'Disabled when not selected',
  },
});
export default createDemo({
  setup(props, context) {
    const group = ref(null);
    const data = reactive({
      checkbox1: true,
      checkbox2: false,
      checkbox3: false,
      checkbox4: true,
      checkbox5: false,
      checkbox6: false,
      checkbox7: false,
      checkbox8: false,
      checkboxgroup1: ['2', '3'],
      checkboxgroup2: ['2'],
      checkboxgroup3: ['2'],
      checkboxsource: [
        { label: '1', value: translate('combine') },
        { label: '2', value: translate('combine') },
      ],
    });
    const changeBox1 = (state: boolean, label: string) => {
      console.log(state, label);
    };

    const changeBox2 = (state: boolean, label: string) => {
      console.log(state, label);
    };

    const changeBox3 = (state: boolean, label: string) => {
      uni.showToast({
        title: `${state ? translate('select') : translate('cancel')} ${label}`,
      });
    };

    const changeBox4 = (label: any[]) => {
      uni.showToast({
        title: `${
          label.length === data.checkboxsource.length ? translate('selectAll') : translate('cancel')
        }`,
      });
    };

    const toggleAll = (f: boolean) => {
      (group.value as any).toggleAll(f);
    };

    return {
      changeBox1,
      changeBox2,
      changeBox3,
      changeBox4,
      toggleAll,
      group,
      translate,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss">
.demo-check {
  margin-right: 10px;
}
.vin-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}
.vin-checkbox {
  display: flex;
  margin-right: 20px;
  .vin-checkbox__label {
    margin-left: 10px;
  }
}
</style>
