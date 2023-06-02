<template>
  <div class="vin-category">
    <div class="vin-category__cateList">
      <div v-if="type == 'classify' || type == 'text'">
        <div class="vin-category__cateListLeft" v-for="(item, index) in category" :key="index">
          <div
            :class="[
              checkIndex == index
                ? 'vin-category__cateListItemChecked'
                : 'vin-category__cateListItem',
            ]"
            @click="getChildList(index)"
          >
            {{ item.catName }}
          </div>
        </div>
      </div>

      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '../common/create';
import { categoryProps } from './common';

const { create } = createComponent('category');

export type CategoryType = {
  catName?: string;
  [key: string]: any;
};

export default create({
  props: categoryProps,

  setup(props, { emit, slots }) {
    const checkIndex = ref(0);
    const categoryLeft = ref(false); // 是否显示slot

    const getChildList = (index: any) => {
      checkIndex.value = index;
      emit('change', index);
    };

    return {
      getChildList,
      checkIndex,
      categoryLeft,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
