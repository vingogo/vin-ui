<template>
  <view class="doc-card">
    <navigator
      :url="data.path"
      class="doc-card-navigator"
      :class="['bg-' + colorname + '-gradient']"
    >
      <view class="doc-text">
        <view class="doc-title">{{ data.title }}</view>
        <view class="text-lg text-Abc text-lighter doc-name">{{ data.name }}</view>
      </view>
      <view class="doc-dot doc-dot1" :class="['bg-' + colorname + '-gradient']"></view>
      <view class="doc-dot doc-dot2" :class="['bg-' + colorname + '-gradient']"></view>
      <view class="doc-dot doc-dot3" :class="['bg-' + colorname + '-gradient']"></view>
    </navigator>
    <view class="doc-bg" :class="['bg-' + colorname]"></view>
  </view>
</template>

<script>
import { computed } from 'vue';

const getColor = () => {
  const colorArr = [
    'yellow',
    'orange',
    'red',
    'pink',
    'mauve',
    'purple',
    'blue',
    'cyan',
    'green',
    'olive',
    'grey',
    'brown',
  ];
  return colorArr[Math.floor(Math.random() * colorArr.length)];
};

export default {
  props: {
    data: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
  },
  setup() {
    const colorname = computed(getColor);

    return {
      colorname,
    };
  },
};
</script>

<style lang="scss">
@import '@vingogo/uni-ui/lib/styles/extends/index.scss';

.doc-card {
  position: relative;
  .doc-card-navigator {
    position: relative;
    z-index: 2;
    overflow: hidden;
    border-radius: 5px;
  }
  .doc-bg {
    position: relative;
    z-index: 2;
    text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.1);
  }
  .doc-title {
    position: relative;
    display: inline-block;
    padding-bottom: 10px;
    font-size: 17px;
    &::after {
      content: '';
      position: absolute;
      width: calc(100% + 10px);
      height: 2px;
      background-color: currentColor;
      left: 0;
      bottom: 0;
    }
  }
  .doc-name {
    position: relative;
    display: block;
    padding-top: 10px;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: currentColor;
      left: 0;
      top: 0;
    }
  }
  .doc-text {
    position: relative;
    z-index: 2;
    padding: 15px 50px 15px 15px;
  }
  .doc-icon {
    position: absolute;
    z-index: 2;
    top: 20px;
    right: 20px;
  }
  .doc-dot {
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    transition: all 0.6s cubic-bezier(0.08, 0.82, 0.17, 1);
    opacity: 0.3;
    &.doc-dot1 {
      width: 200px;
      height: 200px;
      left: 0;
      top: auto;
      right: auto;
      bottom: -150px;
      filter: hue-rotate(30deg) brightness(160%);
    }
    &.doc-dot2 {
      left: -40px;
      top: auto;
      right: auto;
      bottom: -10px;
      width: 150px;
      height: 150px;
      filter: brightness(80%);
    }
    &.doc-dot3 {
      top: -60px;
      right: -60px;
      opacity: 0.6;
      width: 120px;
      height: 120px;
      filter: brightness(120%);
    }
  }
  .doc-bg {
    position: absolute;
    z-index: 0;
    width: calc(100% - 20px);
    height: 15px;
    bottom: -7px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    // filter: blur(10px);
    opacity: 0.2;
  }

  &:hover {
    .doc-dot1 {
      transform: translateX(-50px) translatey(-180px);
      filter: hue-rotate(-30deg) brightness(80%);
    }
    .doc-dot2 {
      transform: translateX(150px) translatey(0px);
      filter: brightness(120%);
    }
    .doc-dot3 {
      filter: brightness(80%);
      transform: translateX(-150px) translatey(120px);
    }
  }
}
</style>
