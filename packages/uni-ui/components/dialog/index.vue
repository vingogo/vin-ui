<template>
  <vin-popup
    v-model:visible="showPopup"
    :close-on-click-overlay="closeOnClickOverlay"
    :lock-scroll="lockScroll"
    :pop-class="overlayClass"
    :custom-style="overlayStyle"
    round
    @click-overlay="closed"
    @click-close-icon="closed"
  >
    <view :class="mainClass" :style="mainStyle">
      <view v-if="title" class="vin-dialog__header">
        <slot v-if="$slots.header" name="header"></slot>
        <template v-else>{{ title }}</template>
      </view>

      <view class="vin-dialog__content" :style="{ textAlign }">
        <slot v-if="$slots.default" name="default"></slot>
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
        <view v-else-if="typeof content === 'string'" v-html="content"></view>
      </view>

      <view
        class="vin-dialog__footer"
        :class="{ [footerDirection]: footerDirection }"
        v-if="!noFooter"
      >
        <slot v-if="$slots.footer" name="footer"></slot>
        <template v-else>
          <vin-button
            size="small"
            plain
            type="primary"
            custom-class="vin-dialog__footer-cancel"
            v-if="!noCancelBtn"
            @click="onCancel"
          >
            {{ cancelText || translate('cancel') }}
          </vin-button>
          <vin-button
            v-if="!noOkBtn"
            size="small"
            type="primary"
            custom-class="vin-dialog__footer-ok"
            @click="onOk"
          >
            {{ okText || translate('confirm') }}
          </vin-button>
        </template>
      </view>
    </view>
  </vin-popup>
</template>
<script lang="ts">
import { computed, watch, ref } from 'vue';
import { createComponent } from '../common/create';
import { dialogProps } from './common';

const { create, translate, useVinContext } = createComponent('dialog');

export default create({
  inheritAttrs: false,
  props: dialogProps,
  emits: ['update', 'update:visible', 'ok', 'cancel', 'open', 'opened', 'close', 'closed'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const showPopup = ref(props.visible);

    watch(
      () => props.visible,
      (value) => {
        showPopup.value = value;
      }
    );

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    const update = (val: boolean) => {
      emit('update', val);
      emit('update:visible', val);
    };

    const closed = () => {
      update(false);
      emit('closed');
    };

    const onCancel = () => {
      emit('cancel');
      if (props.cancelAutoClose) {
        closed();
      }
    };

    const onOk = () => {
      closed();
      emit('ok');
    };

    return {
      closed,
      mainClass,
      mainStyle,
      onCancel,
      onOk,
      showPopup,
      translate,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
