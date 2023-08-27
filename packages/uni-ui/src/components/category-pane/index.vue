<template>
  <div class="vin-category-pane">
    <div v-if="type == 'classify'" class="vin-category-pane__cateListRight">
      <div v-for="(item, index) in categoryChild" :key="index">
        <div class="vin-category-pane__childTitle">
          {{ item?.catName }}
        </div>

        <div v-if="item?.catType == 1" class="vin-category-pane__childItemList">
          <div
            v-for="(sku, key) in item.childCateList"
            class="vin-category-pane__childItem"
            :key="key"
            @click="onChange(sku)"
          >
            <image class="vin-category-pane__childImg" :src="sku.backImg" />
            <div class="vin-category-pane__skuImg">
              {{ sku?.catName }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- text -->
    <div v-if="type == 'text'" class="vin-category-pane__cateListRight">
      <div v-for="(item, index) in categoryChild" :key="index">
        <div class="vin-category-pane__childTitle">
          {{ item?.catName }}
        </div>

        <div v-if="item?.catType == 1" class="vin-category-pane__childItemList">
          <div
            v-for="(sku, key) in item.childCateList"
            class="vin-category-pane__childItem"
            :key="key"
            @click="onChange(sku)"
          >
            <div class="vin-category-pane__skuName">
              {{ sku?.catName }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义 -->

    <div v-if="type == 'custom'" class="vin-category-pane__selfItemList">
      <div
        v-for="(sku, key) in customCategory"
        class="vin-category-pane__skuName"
        :key="key"
        @click="onChange(sku)"
      >
        {{ sku?.catName }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { createComponent } from '../common/create';
import { categoryPaneProps } from './common';

const { create } = createComponent('category');

export default create({
  props: categoryPaneProps,

  setup(props, { emit }) {
    const onChange = (sku: string) => {
      emit('onChange', sku);
    };

    return {
      onChange,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
