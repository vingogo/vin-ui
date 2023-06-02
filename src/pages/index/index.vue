<template>
  <view class="demo demo-home">
    <vin-searchbar v-model="searchValue">
      <template v-slot:leftin>
        <vin-icon size="14" name="search2"></vin-icon>
      </template>
    </vin-searchbar>

    <scroll-view class="tag-list" scroll-x="true" show-scrollbar="false" :scroll-left="0">
      <vin-tag
        v-for="(tag, index) in tags"
        type="primary"
        :custom-class="['category-tag', { active: tag.category === activeCategory }]"
        :key="index"
        @click="onClickCategory(tag.category)"
        >{{ tag.categoryName }}</vin-tag
      >
    </scroll-view>

    <view class="container">
      <block v-for="(nav, navindex) in nav" :key="navindex">
        <view class="h2">{{ nav.title }}</view>
        <view class="cols-2">
          <view class="item" v-for="(item, index) in nav.subnav" :key="index">
            <app-card :data="item"></app-card>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import { reactive, toRefs, watch } from 'vue';
import { createComponent } from '@/utils/create';
import config from '../../../config.json';

const { createDemo } = createComponent('home');

const ALL = 'all';

const nav = [
  {
    title: '拓展样式',
    type: 'extend-style',
    subnav: [
      {
        path: '/pages/components/text',
        name: 'text',
        title: '文本',
      },
      {
        path: '/pages/components/background',
        name: 'background',
        title: '背景',
      },
      {
        path: '/pages/components/shadow',
        name: 'shadow',
        title: '阴影',
      },
      {
        path: '/pages/components/border',
        name: 'border',
        title: '边框',
      },
    ],
  },
  ...config.list.map((item) => {
    return {
      title: item.name,
      type: item.type,
      subnav: item.components.map((comp) => {
        return {
          path: `/pages/components/${comp.name.toLocaleLowerCase()}`,
          name: comp.name,
          title: comp.desc,
        };
      }),
    };
  }),
];

const categories = [
  {
    category: ALL,
    categoryName: '全部',
  },
].concat(
  nav.map((item) => {
    return {
      category: item.type,
      categoryName: item.title,
    };
  })
);

export default createDemo({
  setup() {
    const state = reactive({
      searchValue: '',
      nav,
      tags: categories,
      activeCategory: ALL,
    });

    const filterCategories = (val: string) => {
      if (ALL === val) {
        state.nav = nav;
        return;
      }

      state.nav = nav.filter((item) => item.type === val || item.title.includes(val));
    };

    watch(() => state.searchValue, filterCategories);

    const onClickCategory = (category: string) => {
      state.activeCategory = category;

      filterCategories(category);
    };

    return {
      ...toRefs(state),
      onClickCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
$desc-text-color: #909ca4;

.demo-home {
  --vin-searchbar-padding: 9px 10px;
  --vin-searchbar-background: transparent;
  --vin-searchbar-input-background: #fff;

  min-height: 10vh;
  padding: 65px 5px 15px;
  color: $desc-text-color;
  background-image: url('https://cdn.vingogo.cn/ui-bg.png');
  background-repeat: no-repeat;
  background-size: contain;

  .h2 {
    padding: 0 10px !important;
  }

  .tag-list {
    box-sizing: border-box;
    white-space: nowrap;
    width: 100%;
    padding: 5px 10px;

    :deep .category-tag {
      padding: 4px 12px;
      border-radius: 14px;
      background: #fff;
      color: #f87d09;

      &.active {
        background: #f87d09;
        color: #fff;
      }

      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}

.container {
  margin-top: -15px;
}

.cols-2 {
  display: flex;
  flex-wrap: wrap;

  .item {
    box-sizing: border-box;
    width: calc(100% / 2);
    padding: 10px;
  }
}
</style>
