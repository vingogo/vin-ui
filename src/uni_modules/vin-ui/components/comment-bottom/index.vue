<template>
  <view class="vin-comment-bottom">
    <view @click="handleClick" class="vin-comment-bottom__lable">
      <span v-if="type != 'complex'">{{ info.size }}</span></view
    >

    <view class="vin-comment-bottom__cpx">
      <template v-for="(name, i) in mergeOp" :key="i">
        <view
          :class="['vin-comment-bottom__cpx-item', `vin-comment-bottom__cpx-item--${name}`]"
          @click="operate(name)"
        >
          <template v-if="name != 'more'">
            <span>{{ info[name] }}</span>
            <vin-icon :name="name == 'like' ? 'fabulous' : 'comment'"></vin-icon>
          </template>
          <template v-if="name == 'more'">
            <vin-icon name="more-x"></vin-icon>
            <view
              class="vin-comment-bottom__cpx-item-popover"
              v-if="showPopver"
              @click="operate('popover')"
              >{{ translate('complaintsText') }}</view
            >
          </template>
        </view>
      </template>
    </view>
  </view>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue';
import { commonBottomProps } from './common';
import { createComponent } from '../common/create';

const { create, translate } = createComponent('comment-bottom');

export default create({
  props: commonBottomProps,
  emits: ['clickOperate', 'handleClick'],

  setup(props, { emit }) {
    const showPopver = ref(false);

    const mergeOp = ref([]);

    onMounted(() => {
      const deOp = ['replay', 'like', 'more'];

      if (props.operation) {
        props.operation.forEach((name: string) => {
          if (deOp.includes(name)) {
            (mergeOp.value as any).push(name);
          }
        });
      }
    });

    const operate = (type: string) => {
      if (type === 'more') {
        showPopver.value = !showPopver.value;
      }

      emit('clickOperate', type);
    };

    const handleClick = () => {
      emit('handleClick');
    };

    return { showPopver, operate, mergeOp, handleClick, translate };
  },
});
</script>
<style lang="scss">
@import '../comment/index.scss';
</style>
