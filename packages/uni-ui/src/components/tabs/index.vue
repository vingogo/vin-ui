<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      class="vin-tabs__titles"
      :class="{
        [type]: type,
        scrollable: titleScroll,
        [size]: size,
      }"
      :style="tabsNavStyle"
    >
      <template v-if="$slots.titles">
        <slot name="titles"></slot>
      </template>
      <template v-else>
        <view
          class="vin-tabs__titles-item"
          :style="titleStyle"
          @click="tabChange(item, index)"
          :class="{
            active: item.paneKey === modelValue,
            disabled: item.disabled,
          }"
          v-for="(item, index) in titles"
          :key="item.paneKey"
        >
          <view
            class="vin-tabs__titles-item__line"
            :style="tabsActiveStyle"
            v-if="type === 'line'"
          ></view>
          <view
            class="vin-tabs__titles-item__smile"
            :style="tabsActiveStyle"
            v-if="type === 'smile'"
          >
            <vin-icon :color="color" name="joy-smile" />
          </view>
          <view
            class="vin-tabs__titles-item__text"
            :class="{
              ellipsis: ellipsis && !titleScroll && direction == 'horizontal',
            }"
            >{{ item.title }}
          </view>
        </view>
      </template>
    </view>
    <view class="vin-tabs__content" :style="contentStyle">
      <slot name="default"></slot>
    </view>
  </view>
</template>
<script lang="ts">
import { onMounted, ref, computed, onActivated, watch } from 'vue';
import type { VNode, Ref } from 'vue';
import { createComponent } from '../common/create';
import { pxCheck } from '../../shared/utils/pxCheck';
import { useProvide } from '../../shared/hooks';
import { TAB_KEY, tabsProps } from './common';

const { create, componentName, useVinContext } = createComponent('tabs');

export class Title {
  title = '';

  titleSlot?: VNode[];

  paneKey = '';

  disabled = false;

  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}
}

export default create({
  props: tabsProps,

  emits: ['update:modelValue', 'click', 'change'],

  expose: ['componentName', 'pushKey'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { internalChildren } = useProvide(
      TAB_KEY,
      'vin-tabpane',
    )({
      activeKey: computed(() => props.modelValue),
    });
    const titles: Ref<Title[]> = ref([]);

    const renderTitles = (vnodes: VNode[]) => {
      vnodes.forEach((vnode: VNode, index: number) => {
        let { type } = vnode;
        type = (type as any).name || type;
        if (type === 'vin-tabpane') {
          const title = new Title();
          if (vnode.props?.title || vnode.props?.['pane-key'] || vnode.props?.paneKey) {
            title.title = vnode.props?.title;
            title.paneKey = vnode.props?.['pane-key'] || vnode.props?.paneKey || index;
            title.disabled = vnode.props?.disabled;
          } else {
            // title.titleSlot = vnode.children?.title() as VNode[];
          }
          titles.value.push(title);
        } else {
          renderTitles(vnode.children as VNode[]);
        }
      });
    };

    const currentIndex = ref((props.modelValue as number) || 0);
    const findTabsIndex = (value: string | number) => {
      const index = titles.value.findIndex((item) => item.paneKey === value);
      if (titles.value.length > 0 && index > -1) {
        currentIndex.value = index;
      }
    };

    const init = (vnodes: VNode[] = internalChildren.map((item) => item.vnode)) => {
      titles.value = [];
      if (vnodes && vnodes.length) {
        renderTitles(vnodes);
      }
      findTabsIndex(props.modelValue);
    };

    watch(
      () => internalChildren.map((item) => item.props),
      () => {
        init(internalChildren.map((item) => item.vnode));
      },
      { deep: true },
    );

    watch(
      () => props.modelValue,
      (value: string | number) => {
        findTabsIndex(value);
      },
    );
    onMounted(init);
    onActivated(init);
    const contentStyle = computed(() => {
      return {
        transform:
          props.direction === 'horizontal'
            ? `translate3d(-${currentIndex.value * 100}%, 0, 0)`
            : `translate3d( 0,-${currentIndex.value * 100}%, 0)`,
        transitionDuration: `${props.animatedTime}ms`,
      };
    });
    const tabsNavStyle = computed(() => {
      return {
        background: props.background,
      };
    });
    const tabsActiveStyle = computed(() => {
      return {
        color: props.type === 'smile' ? props.color : '',
        background: props.type === 'line' ? props.color : '',
      };
    });
    const titleStyle = computed(() => {
      return {
        marginLeft: pxCheck(props.titleGutter),
        marginRight: pxCheck(props.titleGutter),
      };
    });
    const methods = {
      tabChange: (item: Title, index: number) => {
        emit('click', item);
        if (item.disabled) {
          return;
        }
        currentIndex.value = index;
        emit('update:modelValue', item.paneKey);
        emit('change', item);
      },
    };

    const mainClass = computed(() => {
      return getMainClass({
        [props.direction]: true,
      });
    });

    const mainStyle = computed(getMainStyle);

    return {
      titles,
      mainStyle,
      mainClass,
      contentStyle,
      tabsNavStyle,
      titleStyle,
      tabsActiveStyle,
      componentName,
      ...methods,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
