<template>
  <view class="demo full">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-swipe>
      <vin-cell round-radius="0" :desc="translate('leftDel')" />
      <template #right>
        <vin-button shape="square" custom-style="height: 100%" type="danger">{{
          translate('delete')
        }}</vin-button>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('disable') }}</view>
    <vin-swipe disabled>
      <vin-cell round-radius="0" :desc="translate('disable')" />
      <template #right>
        <vin-button shape="square" custom-style="height: 100%" type="danger">{{
          translate('delete')
        }}</vin-button>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('swipeLR') }}</view>
    <vin-swipe>
      <template #left>
        <vin-button shape="square" custom-style="height: 100%" type="success">{{
          translate('select')
        }}</vin-button>
      </template>
      <vin-cell round-radius="0" :desc="translate('swipeLRDesc')" />
      <template #right>
        <view style="height: 100%">
          <vin-button shape="square" custom-style="height: 100%" type="danger">{{
            translate('delete')
          }}</vin-button>
          <vin-button shape="square" custom-style="height: 100%" type="info">{{
            translate('collect')
          }}</vin-button>
        </view>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('async') }}</view>
    <vin-swipe ref="refSwipe" @open="open" @close="close">
      <vin-cell :title="translate('asyncDesc')">
        <template v-slot:link>
          <vin-switch
            v-model="checked"
            @change="changSwitch"
            :active-text="translate('open')"
            :inactive-text="translate('close')"
          />
        </template>
      </vin-cell>
      <template #right>
        <vin-button shape="square" custom-style="height: 100%" type="danger">{{
          translate('delete')
        }}</vin-button>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('custom') }}</view>
    <vin-swipe>
      <template #left>
        <vin-button shape="square" custom-style="height: 100%" type="success">{{
          translate('select')
        }}</vin-button>
      </template>
      <vin-cell :title="translate('desc')">
        <template v-slot:link>
          <vin-input-number v-model="number" />
        </template>
      </vin-cell>
      <template #right>
        <view style="height: 100%">
          <vin-button shape="square" custom-style="height: 100%" type="danger">{{
            translate('delete')
          }}</vin-button>
          <vin-button shape="square" custom-style="height: 100%" type="info">{{
            translate('collect')
          }}</vin-button>
        </view>
      </template>
    </vin-swipe>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@vingogo/uni-ui/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('swipe');

useTranslate({
  'zh-CN': {
    basic: '????????????',
    leftDel: '????????????',
    disable: '????????????',
    swipeLR: '????????????',
    swipeLRDesc: '????????????????????????',
    async: '????????????',
    asyncDesc: '??????????????????',
    open: '???',
    close: '???',
    custom: '?????????',
    desc: '????????????',
    delete: '??????',
    select: '??????',
    collect: '??????',
  },
  'en-US': {
    basic: 'Basic Usage',
    leftDel: 'Swipe left to delete',
    disable: 'Disable swipe',
    swipeLR: 'Swipe left and right',
    swipeLRDesc: 'You can swipe left and right',
    async: 'Async control swipe',
    asyncDesc: 'Async on and off',
    open: 'on',
    close: 'off',
    custom: 'Custom',
    desc: 'product description',
    delete: 'Delelte',
    select: 'Select',
    collect: 'Collect',
  },
});
export default createDemo({
  props: {},
  setup() {
    const refSwipe = ref<HTMLElement>();
    const checked = ref(false);
    const number = ref(0);
    const changSwitch = (value: boolean) => {
      if (value) {
        refSwipe.value?.open('left');
      } else {
        refSwipe.value?.close();
      }
    };
    const open = (obj: any) => {
      checked.value = true;
    };
    const close = () => {
      checked.value = false;
    };
    return { checked, number, changSwitch, refSwipe, open, close, translate };
  },
});
</script>

<style lang="scss" scoped></style>
