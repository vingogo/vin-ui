<template>
  <view class="demo padding">
    <view class="h2">{{ translate('basic') }}</view>
    <view class="steps-wrapper">
      <vin-steps :current="current1" @click-step="handleClickStep">
        <vin-step :title="translate('step1')">
          1
          <template v-slot:title>{{ translate('step1') }}</template>
        </vin-step>
        <vin-step :title="translate('step2')">2</vin-step>
        <vin-step :title="translate('step3')">3</vin-step>
      </vin-steps>
      <view class="steps-button">
        <vin-button size="mini" type="primary" @click="handleStep('current1')">{{
          translate('next')
        }}</vin-button>
      </view>
    </view>
    <view class="h2">{{ translate('desc') }}</view>
    <view class="steps-wrapper">
      <vin-steps :current="current2">
        <vin-step :title="translate('step1')" :content="translate('stepdesc')">1</vin-step>
        <vin-step :title="translate('step2')" :content="translate('stepdesc')"></vin-step>
        <vin-step :title="translate('step3')" :content="translate('stepdesc')"></vin-step>
      </vin-steps>
      <view class="steps-button" style="margin-top: 10px">
        <vin-button size="mini" type="primary" @click="handleStep('current2')">{{
          translate('next')
        }}</vin-button>
      </view>
    </view>
    <view class="h2">{{ translate('cicon') }}</view>
    <view class="steps-wrapper">
      <vin-steps current="1">
        <vin-step :title="translate('complete')" icon="service">1</vin-step>
        <vin-step :title="translate('progress')" icon="people">2</vin-step>
        <vin-step :title="translate('start')" icon="location2">3</vin-step>
      </vin-steps>
    </view>
    <view class="h2">{{ translate('verstep') }}</view>
    <view class="steps-wrapper" style="height: 300px; padding: 15px 30px">
      <vin-steps direction="vertical" current="2">
        <vin-step :title="translate('complete')" :content="translate('content1')">1</vin-step>
        <vin-step :title="translate('progress')" :content="translate('content2')">2</vin-step>
        <vin-step :title="translate('start')" :content="translate('content3')">3</vin-step>
      </vin-steps>
    </view>
    <view class="h2">{{ translate('verstep') }}</view>
    <view class="steps-wrapper" style="height: 350px; padding: 15px 40px">
      <vin-steps direction="vertical" progress-dot current="2">
        <vin-step :title="translate('complete')" :content="translate('content1')">1</vin-step>
        <vin-step :title="translate('progress')" :content="translate('content2')">2</vin-step>
        <vin-step :title="translate('start')"
          >3
          <template v-slot:content>
            <p>{{ translate('content4') }}???</p>
            <p>{{ translate('content5') }}</p>
          </template>
        </vin-step>
      </vin-steps>
    </view>
  </view>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { createComponent } from '@vingogo/uni-ui/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('steps');

useTranslate({
  'zh-CN': {
    basic: '????????????',
    step1: '?????????',
    step2: '?????????',
    step3: '?????????',
    desc: '?????????????????????',
    stepdesc: '????????????',
    next: '?????????',
    cicon: '???????????????',
    complete: '?????????',
    progress: '?????????',
    start: '?????????',
    content1: '????????????????????????????????????????????????',
    content2: '??????????????????????????????',
    content3: '???????????????????????????????????????????????????????????????18??????',
    content4: '???????????????',
    content5: '?????????????????????????????????????????????18??????',
    verstep: '???????????????',
  },
  'en-US': {
    basic: 'Basic Usage',
    step1: 'Step One',
    step2: 'Step Two',
    step3: 'Step Three',
    desc: 'Title and description information',
    stepdesc: 'Step description',
    next: 'next step',
    cicon: 'Custom Icon',
    complete: 'Completed',
    progress: 'In progress',
    start: 'Not started',
    content1: 'Your order has been packaged and the goods have been delivered',
    content2: 'Your order is in transit',
    content3:
      'The receiving address is yard 18, Kechuang 11th Street, Beijing Economic and Technological Development Zone',
    content4: 'The receiving address is',
    content5: 'Yard 18, Kechuang 11th Street, Beijing Economic and Technological Development Zone',
    verstep: 'Vertical step bar',
  },
});
export default createDemo({
  props: {},
  setup() {
    const state = reactive({
      current1: 1,
      current2: 1,
      current3: 1,
      current4: 1,
      current5: 1,
    });

    const handleStep = (params) => {
      if (state[params] >= 3) {
        state[params] = 1;
      } else {
        state[params] += 1;
      }
    };

    const handleClickStep = (index: number) => {
      console.log(index);
    };

    return {
      ...toRefs(state),
      handleStep,
      handleClickStep,
      translate,
    };
  },
});
</script>

<style lang="scss">
.padding {
  padding-left: 0 !important;
  padding-right: 0 !important;
  h2 {
    padding-left: 27px !important;
  }
}
.steps-wrapper {
  width: 100%;
  padding: 15px 0;
  background-color: #fff;
  .steps-button {
    text-align: center;
  }
}
</style>
