<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      v-if="needSymbol && position == 'before'"
      class="vin-price--symbol"
      :class="`vin-price--symbol-${size}`"
      decode="true"
    >
      {{ symbolChar }}
    </view>
    <view :class="`vin-price--${size}`">{{ formatThousands(price) }}</view>
    <view :class="`vin-price--decimal-${size}`" v-if="decimalDigits != 0">.</view>
    <view :class="`vin-price--decimal-${size}`">{{ formatDecimal(price) }}</view>
    <view
      v-if="needSymbol && position == 'after'"
      class="vin-price--symbol"
      :class="`vin-price--symbol-${size}`"
      decode="true"
    >
      {{ symbolChar }}
    </view>
  </view>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { priceProps } from './common';

const { create, useVinContext, componentName } = createComponent('price');

export default create({
  props: priceProps,
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const mainClass = computed(() =>
      getMainClass({
        [`${componentName}--strike`]: props.strikeThrough,
      }),
    );
    const mainStyle = computed(getMainStyle);

    const replaceSpecialChar = (str: string) => {
      let url = str.replace(/&quot;/g, '"');
      url = url.replace(/&amp;/g, '&');
      url = url.replace(/&lt;/g, '<');
      url = url.replace(/&gt;/g, '>');
      url = url.replace(/&nbsp;/g, ' ');
      url = url.replace(/&yen;/g, '￥');
      return url;
    };
    const symbolChar = computed(() => {
      const symbol = props.needSymbol ? replaceSpecialChar(props.symbol) : '';
      return symbol;
    });
    const checkPoint = (price: string | number) => {
      return String(price).indexOf('.') > 0;
    };

    const formatThousands = (value: any) => {
      let num = value;
      if (Number(num) === 0) {
        num = 0;
      }
      if (checkPoint(num)) {
        num = Number(num).toFixed(props.decimalDigits);
        num = typeof num.split('.') === 'string' ? num.split('.') : num.split('.')[0];
      } else {
        num = num.toString();
      }
      if (props.thousands) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
      return num;
    };
    const formatDecimal = (value: any) => {
      let decimalNum = value;
      if (Number(decimalNum) === 0) {
        decimalNum = 0;
      }
      if (checkPoint(decimalNum)) {
        decimalNum = Number(decimalNum).toFixed(props.decimalDigits);
        decimalNum =
          typeof decimalNum.split('.') === 'string'
            ? 0
            : decimalNum.split('.')[1]
            ? decimalNum.split('.')[1]
            : 0;
      } else {
        decimalNum = 0;
      }
      const result = `0.${decimalNum}`;
      const resultFixed = Number(result).toFixed(props.decimalDigits);
      return String(resultFixed).substring(2, resultFixed.length);
    };

    return {
      mainClass,
      mainStyle,
      symbolChar,
      checkPoint,
      formatThousands,
      formatDecimal,
      replaceSpecialChar,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
