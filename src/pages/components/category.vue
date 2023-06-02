<template>
  <app-page-layout title="商品分类" custom-class="full">
    <view class="h2">{{ translate('title1') }}</view>
    <vin-category :category="category" @change="change">
      <vin-category-pane :categoryChild="categoryChild1" @onChange="onChange"> </vin-category-pane>
    </vin-category>
    <view class="h2">{{ translate('title2') }}</view>
    <vin-category :category="category" @change="changeText">
      <vin-category-pane type="text" :categoryChild="categoryChild2" @onChange="onChange">
      </vin-category-pane
    ></vin-category>

    <view class="h2">{{ translate('title3') }}</view>
    <vin-category
      ><vin-category-pane type="custom" :customCategory="customCategory" @onChange="changeCustom">
      </vin-category-pane
    ></vin-category>
  </app-page-layout>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';

import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('category');

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      title1: '经典分类模式',
      title2: '只显示文字',
      title3: '自定义分类',
    },
    'en-US': {
      title1: 'Classic Classification Mode',
      title2: 'Show Text Only',
      title3: 'Custom taxonomy',
    },
  });
export default createDemo({
  props: {},
  setup() {
    initTranslate();
    const data = reactive({
      categoryInfo1: {},
      category: [{}],
      categoryChild1: [{}],
      customCategory: [{}],
      categoryInfo2: {},
      categoryChild2: [{}],
    });

    onMounted(() => {
      setTimeout(() => {
        getData();
      }, 500);
    });

    const getData = () => {
      fetch('//storage.360buyimg.com/nutui/3x/categoryData.js')
        .then((response) => response.json())
        .then((res) => {
          const { categoryInfo, categoryChild, customCategory } = res;
          data.categoryInfo1 = categoryInfo;
          data.category = categoryInfo.category;
          data.categoryChild1 = categoryChild;
          data.customCategory = customCategory;
          data.categoryInfo2 = categoryInfo;
          data.categoryChild2 = categoryChild;
        })
        .catch((err) => console.log('Oh, error', err));
    };

    const change = (index: any) => {
      data.categoryChild1 = [].concat(data?.categoryInfo1?.category[index]?.children as any);
    };

    const changeText = (index: any) => {
      data.categoryChild2 = [].concat(data.categoryInfo2.category[index].children as any);
    };

    const changeCustom = (v: any) => {
      console.log(`点击分类数据:${JSON.stringify(v)}`);
    };

    const onChange = (v: any) => {
      console.log(`当前分类数据:${JSON.stringify(v)}`);
    };

    return {
      change,
      onChange,
      changeText,
      changeCustom,
      ...toRefs(data),
      translate,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo {
  padding-left: 0 !important;
  padding-right: 0px !important;
}
</style>
