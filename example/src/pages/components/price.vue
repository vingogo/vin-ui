<template>
  <app-page-layout title="价格">
    <vin-cell-group :title="translate('title1')">
      <vin-cell>
        <vin-price :price="0" size="small" :need-symbol="false" />
      </vin-cell>
      <vin-cell>
        <vin-price :price="0" size="normal" :need-symbol="false" />
      </vin-cell>
      <vin-cell>
        <vin-price :price="0" size="large" :need-symbol="false" />
      </vin-cell>
    </vin-cell-group>
    <view class="h2">{{ translate('title2') }}</view>
    <vin-cell>
      <vin-price :price="8888" :decimal-digits="0" />
    </vin-cell>
    <view class="h2">{{ translate('titleStrike') }}</view>
    <vin-cell>
      <vin-price
        :price="8888"
        :decimal-digits="0"
        size="normal"
        :need-symbol="true"
        :thousands="true"
        strike-through
      />
    </vin-cell>
    <view class="h2">{{ translate('title3') }}</view>
    <vin-cell>
      <vin-price :price="10010.01" symbol="¥" />
    </vin-cell>
    <view class="h2">{{ translate('title4') }}</view>
    <vin-cell>
      <vin-price :price="8888.01" position="after" :symbol="translate('symbol')" />
    </vin-cell>
    <view class="h2">{{ translate('title5') }}</view>
    <vin-cell>
      <vin-price :price="15213.1221" :decimal-digits="3" :thousands="true" />
    </vin-cell>
  </app-page-layout>
</template>

<script lang="ts">
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('price');

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      title1: '支持三种尺寸：small、normal、large',
      title2: '不保留小数',
      title3: '货币符号',
      title4: '货币符号位置',
      titleStrike: '划线价',
      title5: '千位分隔',
      symbol: '元',
    },
    'en-US': {
      title1: 'Support three sizes：small、normal、large',
      title2: 'No decimals',
      title3: 'Currency symbol',
      title4: 'Currency symbol position',
      titleStrike: 'Strike Through',
      title5: 'Separated by thousands',
      symbol: 'RMB',
    },
  });

export default createDemo({
  setup() {
    initTranslate();
    return {
      translate,
    };
  },
});
</script>
