<template>
  <view class="demo full">
    <view class="h2">基本用法</view>
    <view>
      <vin-cell>
        <vin-progress percentage="30" />
      </vin-cell>
    </view>

    <view class="h2">线形进度条-设置颜色高度</view>
    <view>
      <vin-cell>
        <vin-progress
          percentage="30"
          stroke-color=" rgba(250,44,25,0.47)"
          stroke-width="20"
          text-color="red"
        />
      </vin-cell>
    </view>
    <view class="h2">线形进度条-百分比不显示</view>
    <view>
      <vin-cell>
        <vin-progress percentage="50" :show-text="false" stroke-height="24" />
      </vin-cell>
    </view>
    <view class="h2">线形进度条-百分比外显</view>
    <view>
      <vin-cell>
        <vin-progress percentage="30" />
      </vin-cell>
    </view>
    <view class="h2">线形进度条-百分比内显</view>
    <view>
      <vin-cell>
        <vin-progress percentage="60" :text-inside="true" />
      </vin-cell>
    </view>
    <view class="h2">线形进度条-百分比内显自定义</view>
    <view>
      <vin-cell>
        <vin-progress percentage="60" :text-inside="true">
          <vin-icon
            style="display: block"
            size="30"
            name="https://cdn.vingogo.cn/logo.png"
          ></vin-icon>
        </vin-progress>
      </vin-cell>
    </view>
    <view class="h2">线形进度条-自定义尺寸(内置"small","base","large"三种规格)</view>
    <view>
      <vin-cell>
        <vin-progress percentage="30" :text-inside="true" size="small"> </vin-progress>
      </vin-cell>
      <vin-cell>
        <vin-progress percentage="50" :text-inside="true" size="base"> </vin-progress>
      </vin-cell>
      <vin-cell>
        <vin-progress percentage="70" :text-inside="true" size="large"> </vin-progress>
      </vin-cell>
    </view>
    <view class="h2">线形进度条-状态显示</view>
    <view>
      <vin-cell>
        <vin-progress
          percentage="30"
          stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
          status="active"
        />
      </vin-cell>
      <vin-cell>
        <vin-progress percentage="50" status="icon" />
      </vin-cell>
      <vin-cell>
        <vin-progress
          percentage="100"
          stroke-color="linear-gradient(90deg, rgba(180,236,81,1) 0%,rgba(66,147,33,1) 100%)"
          stroke-width="15"
          status="icon"
          icon-name="issue"
          icon-color="red"
        />
      </vin-cell>
    </view>
    <view class="h2">设置百分比</view>
    <view class="progress-box">
      <vin-cell>
        <vin-progress :percentage="val" />
      </vin-cell>
      <vin-cell>
        <vin-button type="default" @click="setReduceVal">减少</vin-button>
        <vin-button type="primary" @click="setAddVal">增加</vin-button>
      </vin-cell>
    </view>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@vin/uni-ui/common/create';

const { createDemo } = createComponent('progress');
export default createDemo({
  props: {},
  setup() {
    const val = ref(0);
    const setAddVal = () => {
      if (val.value >= 100) {
        return false;
      }
      val.value += 10;
    };
    const setReduceVal = () => {
      if (val.value <= 0) {
        return false;
      }
      val.value -= 10;
    };
    return {
      val,
      setAddVal,
      setReduceVal,
    };
  },
});
</script>

<style lang="scss">
.progress-box {
  .vin-button {
    margin-right: 10px;
  }
}
</style>
