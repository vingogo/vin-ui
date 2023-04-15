<template>
  <view class="demo">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-cell>
      <vin-icon name="fabulous"></vin-icon>
      <vin-icon name="star"></vin-icon>
    </vin-cell>
    <view class="h2">{{ translate('imageLink') }}</view>
    <vin-cell>
      <vin-icon size="40" name="https://cdn.vingogo.cn/logo.png"> </vin-icon>
    </vin-cell>
    <view class="h2">{{ translate('iconColor') }}</view>
    <vin-cell>
      <vin-icon name="fabulous" color="#fa2c19"></vin-icon>
      <vin-icon name="fabulous" color="#64b578"></vin-icon>
      <vin-icon name="star" color="#fa2c19"></vin-icon>
    </vin-cell>

    <view class="h2">{{ translate('iconSize') }}</view>
    <vin-cell>
      <vin-icon name="fabulous"></vin-icon>
      <vin-icon name="fabulous" size="24"></vin-icon>
      <vin-icon name="fabulous" size="26"></vin-icon>
    </vin-cell>

    <vin-cell-group
      v-for="item in icons.data"
      :title="currentLang == 'zh-CN' ? item.name : item.nameEn"
      :key="item"
    >
      <vin-cell>
        <view class="ul">
          <view class="li" v-for="item in item.icons" :key="item">
            <vin-icon :name="item"></vin-icon>
            <text class="text">{{ item }}</text>
          </view>
        </view>
      </vin-cell>
    </vin-cell-group>
    <vin-cell-group
      v-for="item in icons.style"
      :title="currentLang == 'zh-CN' ? item.name : item.nameEn"
      :key="item"
    >
      <vin-cell>
        <view class="ul">
          <view class="li" v-for="it in item.icons" :key="it">
            <vin-icon
              :name="it.name"
              :custom-class="`vin-icon-${it['animation-name']} vin-icon-${it['animation-time']}`"
              @click="copyTag(it['animation-name'])"
            >
            </vin-icon>
            <text class="text">{{ it['animation-name'] }}</text>
          </view>
        </view>
      </vin-cell>
    </vin-cell-group>
  </view>
</template>

<script lang="ts">
import icons from '@vingogo/uni-ui/styles/font/config.json';

import { createComponent } from '@/utils/create';
import { useTranslate, currentLang } from '@/hooks/useTranslate';

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基本用法',
      imageLink: '图片链接',
      iconColor: '图标颜色',
      iconSize: '图标大小',
      copyToast: '复制成功',
    },
    'en-US': {
      basic: 'Basic Usage',
      imageLink: 'Image Link',
      iconColor: 'Icon Color',
      iconSize: 'Icon Size',
      copyToast: 'Copied successfully',
    },
  });
const { createDemo, translate } = createComponent('icon');

export default createDemo({
  props: {},
  setup() {
    initTranslate();
    return { icons, translate, currentLang };
  },
});
</script>

<style lang="scss">
.vin-cell {
  > .vin-iconfont {
    margin-right: 10px;
  }
}
.ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
  .li {
    flex: 0 0 25%;
    max-width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--vin-cell-color, var(--vin-title-color2, #666666));

    .icon-name {
      height: 40px;
      font-size: 12px;
      text-align: center;
    }
    .vin-iconfont {
      margin: 16px 0 16px;
    }

    .text {
      height: 40px;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
