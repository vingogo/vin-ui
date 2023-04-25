<template>
  <demo-page-layout title="动画">
    <vin-cell
      v-for="item in list"
      :key="item.name"
      :title="item.name"
      is-link
      @click="startAnimation(item.name)"
    ></vin-cell>

    <vin-transition
      :show="show"
      :name="name"
      :custom-style="styles"
      :duration="300"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @leave="leave"
      @afterLeave="afterLeave"
    >
      <view class="transition"></view>
    </vin-transition>
  </demo-page-layout>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('transition');
export default createDemo({
  setup() {
    const show = ref(false);
    const name = ref('');

    const startAnimation = (animationName: string) => {
      if (show.value) return;

      show.value = true;
      name.value = animationName;

      setTimeout(() => {
        show.value = false;
      }, 2000);
    };

    const system = uni.getSystemInfoSync();

    const styles = {
      position: 'fixed',
      top: `${system.windowHeight / 2 - 50}px`,
      left: `${system.windowWidth / 2 - 50}px`,
      width: '100px',
      height: '100px',
      backgroundColor: 'red',
    };

    const list = reactive([
      {
        name: 'fade',
        title: '淡入',
      },
      {
        name: 'fade-up',
        title: '上滑淡入',
      },
      {
        name: 'zoom',
        title: '缩放',
      },
      {
        name: 'fade-zoom',
        title: '缩放淡入',
      },
      {
        name: 'fade-down',
        title: '下滑淡入',
      },
      {
        name: 'fade-left',
        title: '左滑淡入',
      },
      {
        name: 'fade-right',
        title: '右滑淡入',
      },
      {
        name: 'slide-up',
        title: '上滑进入',
      },
      {
        name: 'slide-down',
        title: '下滑进入',
      },
      {
        name: 'slide-left',
        title: '左滑进入',
      },
      {
        name: 'slide-right',
        title: '右滑进入',
      },
    ]);

    const beforeEnter = () => console.log('beforeEnter');
    const enter = () => console.log('enter');
    const afterEnter = () => console.log('afterEnter');
    const beforeLeave = () => console.log('beforeLeave');
    const leave = () => console.log('leave');
    const afterLeave = () => console.log('afterLeave');

    return {
      show,
      name,
      list,
      styles,
      startAnimation,
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave,
    };
  },
});
</script>

<style lang="scss">
.transition {
  background-color: $primary-color;
}
</style>
