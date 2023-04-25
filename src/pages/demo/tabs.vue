<template>
  <demo-page-layout title="选项卡切换" custom-class="full">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-tabs v-model="state.tab1value">
      <vin-tabpane title="Tab 1"> Tab 1 </vin-tabpane>
      <vin-tabpane title="Tab 2"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3"> Tab 3 </vin-tabpane>
    </vin-tabs>
    <view class="h2">{{ translate('title1') }}</view>
    <vin-tabs v-model="state.tab11value" type="smile">
      <vin-tabpane title="Tab 1"> Tab 1 </vin-tabpane>
      <vin-tabpane title="Tab 2"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3"> Tab 3 </vin-tabpane>
    </vin-tabs>
    <view class="h2">{{ translate('title2') }}</view>
    <vin-tabs v-model="state.tab2value">
      <vin-tabpane title="Tab 1" pane-key="0"> Tab 1 </vin-tabpane>
      <vin-tabpane title="Tab 2" pane-key="1" :disabled="true"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3" pane-key="2"> Tab 3 </vin-tabpane>
    </vin-tabs>
    <view class="h2">{{ translate('title3') }}</view>
    <vin-tabs v-model="state.tab3value">
      <vin-tabpane v-for="item in state.list3" :key="item" :title="'Tab ' + item">
        Tab {{ item }}
      </vin-tabpane>
    </vin-tabs>

    <view class="h2">{{ translate('title4') }}</view>
    <vin-tabs v-model="state.tab4value" title-scroll title-gutter="10">
      <vin-tabpane v-for="item in state.list4" :key="item" :title="'Tab ' + item">
        Tab {{ item }}
      </vin-tabpane>
    </vin-tabs>
    <view class="h2">{{ translate('title5') }}</view>
    <vin-tabs style="height: 300px" v-model="state.tab5value" title-scroll direction="vertical">
      <vin-tabpane v-for="item in state.list5" :key="item" :title="'Tab ' + item">
        Tab {{ item }}
      </vin-tabpane>
    </vin-tabs>
    <view class="h2">{{ translate('title6') }}</view>
    <vin-tabs
      style="height: 300px"
      v-model="state.tab6value"
      type="smile"
      title-scroll
      direction="vertical"
    >
      <vin-tabpane v-for="item in state.list5" :key="item" :title="'Tab ' + item">
        Tab {{ item }}
      </vin-tabpane>
    </vin-tabs>
    <view class="h2">{{ translate('title7') }}</view>
    <vin-tabs v-model="state.tab1value" size="large">
      <vin-tabpane title="Tab 1"> Tab 1 </vin-tabpane>
      <vin-tabpane title="Tab 2"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3"> Tab 3 </vin-tabpane>
    </vin-tabs>
    <vin-tabs v-model="state.tab1value" size="normal">
      <vin-tabpane title="Tab 1"> Tab 1 </vin-tabpane>
      <vin-tabpane title="Tab 2"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3"> Tab 3 </vin-tabpane>
    </vin-tabs>
    <vin-tabs v-model="state.tab1value" size="small">
      <vin-tabpane title="Tab 1"> Tab 1 </vin-tabpane>
      <vin-tabpane title="Tab 2"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3"> Tab 3 </vin-tabpane>
    </vin-tabs>
    <view class="h2">{{ translate('title8') }}</view>
    <vin-tabs v-model="state.tab7value">
      <template v-slot:titles>
        <view style="display: flex; width: 100%">
          <view
            class="vin-tabs__titles-item"
            @click="state.tab7value = item.paneKey"
            :class="{ active: state.tab7value === item.paneKey }"
            :key="item.paneKey"
            v-for="item in state.list6"
          >
            <vin-icon v-if="item.icon" :name="item.icon" />
            <span class="vin-tabs__titles-item__text">{{ item.title }}</span>
            <span class="vin-tabs__titles-item__line"></span>
          </view>
        </view>
      </template>
      <vin-tabpane v-for="item in state.list6" :key="item.paneKey" :pane-key="item.paneKey">
        {{ item.title }}
      </vin-tabpane>
    </vin-tabs>
  </demo-page-layout>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('tabs');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    title1: '基础用法-微笑曲线',
    title2: '通过 pane-key 匹配',
    title3: '数据异步渲染 3s',
    title4: '数量多,滚动操作',
    title5: '左右布局',
    title6: '左右布局-微笑曲线',
    title7: '标签栏字体尺寸 large normal small',
    title8: '自定义标签栏',
    custom: (val: string) => `自定义 ${val}`,
  },
  'en-US': {
    basic: 'Basic Usage',
    title1: 'Basic Usage - Smile Curve',
    title2: 'Match by pane-key',
    title3: 'Data is rendered asynchronously for 3s',
    title4: 'A large number of scrolling operations',
    title5: 'Left and right layout',
    title6: 'Left and Right Layout - Smile Curve',
    title7: 'tab bar font size large normal small',
    title8: 'custom tab bar',
    custom: (val: string) => `custom ${val}`,
  },
});
export default createDemo({
  props: {},
  setup() {
    const state = reactive({
      tab1value: 0,
      tab11value: 0,
      tab2value: 0,
      tab3value: 0,
      tab4value: 0,
      tab5value: 0,
      tab6value: 0,
      tab7value: 'c1',
      list3: Array.from(new Array(2).keys()),
      list4: Array.from(new Array(10).keys()),
      list5: Array.from(new Array(2).keys()),
      list6: computed(() => [
        {
          title: translate('custom', 1),
          paneKey: 'c1',
          icon: 'fabulous',
        },
        {
          title: translate('custom', 2),
          paneKey: 'c2',
          icon: 'Vin',
        },
        {
          title: translate('custom', 3),
          paneKey: 'c3',
        },
      ]),
    });
    setTimeout(() => {
      state.list3.push(999);
      state.tab3value = 2;
    }, 3000);

    return { state, translate };
  },
});
</script>

<style lang="scss">
// @import '@vingogo/uni-ui/styles/components/tabs.scss';
</style>
