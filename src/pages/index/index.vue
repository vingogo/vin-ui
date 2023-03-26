<template>
  <view class="demo-home">
    <view class="demo-home__header">
      <image class="demo-home__logo" src="@/static/logo.png" mode="aspectFit" />

      <view class="demo-home__info">
        <text class="demo-home__title">Vin UI</text>
        <text class="demo-home__slogan">轻量、快速的多平台开发UI组件库</text>
      </view>
    </view>

    <view class="demo-home-nav" v-for="group in packages" :key="group.name">
      <view class="demo-home-nav__title">{{ group.name }}</view>
      <navigator
        v-for="comp in group.components"
        :key="comp.name"
        :url="`/pages/${comp.name.toLowerCase()}/index`"
        class="demo-home-nav__block"
      >
        {{ `${comp.name}  ${comp.desc}` }}

        <vin-icon name="arrow-right" custom-class="demo-home-nav__icon"></vin-icon>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts">
import { createComponent } from '@vingogo/uni-ui/components/common/create';
import config from '../../../config.json';

const { createDemo } = createComponent('demo');

export default createDemo({
  setup() {
    const goDemo = (path: string) => {
      uni.navigateTo({
        url: `/pages/${path.toLowerCase()}/index`,
      });
    };

    return {
      goDemo,
      packages: config.list,
    };
  },
});
</script>

<style lang="scss">
$desc-text-color: #909ca4;

.demo-home {
  min-height: 10vh;
  padding: 30px 20px 20px;
  background: #fff;

  &__header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    font-size: 32px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 16px;
  }

  &__logo {
    display: inline-block;
    width: 96px;
    height: 96px;
    vertical-align: middle;
  }

  &__title {
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
  }

  &__slogan,
  &__desc {
    color: $desc-text-color;
    font-size: 14px;
  }

  &__desc {
    margin: 20px 0;
  }

  &-nav {
    &__title {
      margin: 24px 0 8px 16px;
      color: $desc-text-color;
      font-size: 14px;
    }

    &__block {
      position: relative;
      display: flex;
      margin: 0 0 12px;
      padding-left: 20px;
      color: #323233;
      font-weight: 400;
      font-size: 14px;
      line-height: 40px;
      background-color: #f7f8fa;
      border-radius: 20px;
    }

    &__icon {
      position: absolute !important;
      top: 50%;
      right: 16px;
      width: 16px !important;
      height: 16px !important;
      margin-top: -8px;
    }
  }
}
</style>
