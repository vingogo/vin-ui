<template>
  <view :class="containerClasses" :style="mainStyle">
    <view class="min" v-if="!hiddenRange">{{ +min }}</view>
    <view ref="root" :id="rootId" :style="wrapperStyle" :class="mainClass" @click.stop="onClick">
      <view class="vin-range-mark" v-if="marksList.length > 0">
        <text
          v-for="marks in marksList"
          :key="marks"
          :class="markClassName(marks)"
          :style="marksStyle(marks)"
        >
          {{ marks }}
          <text class="vin-range-tick" :style="tickStyle(marks)"></text>
        </text>
      </view>
      <view class="vin-range-bar" :style="barStyle">
        <template v-if="range">
          <view
            v-for="index of [0, 1]"
            :key="index"
            role="slider"
            :class="{
              'vin-range-button-wrapper-left': index == 0,
              'vin-range-button-wrapper-right': index == 1,
            }"
            :catch-move="true"
            :tabindex="disabled ? -1 : 0"
            :aria-valuemin="+min"
            :aria-valuenow="curValue(index)"
            :aria-valuemax="+max"
            aria-orientation="horizontal"
            @touchstart.stop.prevent="
              (e) => {
                if (typeof index === 'number') {
                  // 实时更新当前拖动的按钮索引
                  buttonIndex = index;
                }
                onTouchStart(e);
              }
            "
            @touchmove.stop.prevent="onTouchMove"
            @touchend.stop.prevent="onTouchEnd"
            @touchcancel.stop.prevent="onTouchEnd"
            @click="(e) => e.stopPropagation()"
          >
            <slot v-if="$slots.button" name="button"></slot>
            <view class="vin-range-button" v-else :style="buttonStyle">
              <view class="number" v-if="!hiddenTag">{{ curValue(index) }}</view>
            </view>
          </view>
        </template>
        <template v-else>
          <view
            role="slider"
            class="vin-range-button-wrapper"
            :tabindex="disabled ? -1 : 0"
            :aria-valuemin="+min"
            :aria-valuenow="curValue()"
            :aria-valuemax="+max"
            aria-orientation="horizontal"
            :catch-move="true"
            @touchstart.stop.prevent="
              (e) => {
                onTouchStart(e);
              }
            "
            @touchmove.stop.prevent="onTouchMove"
            @touchend.stop.prevent="onTouchEnd"
            @touchcancel.stop.prevent="onTouchEnd"
            @click="(e) => e.stopPropagation()"
          >
            <slot v-if="$slots.button" name="button"></slot>
            <view class="vin-range-button" v-else :style="buttonStyle">
              <view class="number" v-if="!hiddenTag">{{ curValue() }}</view>
            </view>
          </view>
        </template>
      </view>
    </view>
    <view class="max" v-if="!hiddenRange">{{ +max }}</view>
  </view>
</template>
<script lang="ts">
import {
  ref,
  toRefs,
  computed,
  CSSProperties,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
import { createComponent } from '../common/create';
import { useTouch, useRect } from '../../shared/hooks';
import { rangeProps } from './common';
import type { SliderValue } from './common';

const { componentName, create, useVinContext } = createComponent('range');

export default create({
  props: rangeProps,

  emits: ['change', 'drag-end', 'drag-start', 'update:modelValue'],

  setup(props, { emit }) {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const { getMainClass, getMainStyle } = useVinContext(props);
    const buttonIndex = ref(0);
    let startValue: SliderValue;
    let currentValue: SliderValue;

    const root = ref<HTMLElement>();
    const dragStatus = ref<'start' | 'draging' | ''>();
    const touch = useTouch();
    const refRandomId = Math.random().toString(36).slice(-8);

    const marksList = computed(() => {
      const { marks, max, min } = props;
      const marksKeys = Object.keys(marks);
      const list = marksKeys
        .map(parseFloat)
        .sort((a, b) => a - b)
        .filter((point) => point >= min && point <= max);
      return list;
    });
    const scope = computed(() => Number(props.max) - Number(props.min));

    const rootId = computed(() => `root-${refRandomId}`);

    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-vertical`]: props.vertical,
        [`${prefixCls}-show-number`]: !props.hiddenRange,
      });
    });
    const containerClasses = computed(() => {
      const prefixCls = 'vin-range-container';
      return {
        [prefixCls]: true,
        [`${prefixCls}-vertical`]: props.vertical,
      };
    });
    const wrapperStyle = computed(() => {
      return {
        background: props.inactiveColor,
      };
    });

    const mainStyle = computed(getMainStyle);

    const buttonStyle = computed(() => {
      return {
        borderColor: props.buttonColor,
      };
    });

    const isRange = (val: unknown): val is number[] => !!props.range && Array.isArray(val);

    const calcMainAxis = () => {
      const { modelValue, min } = props;
      if (isRange(modelValue)) {
        return `${((modelValue[1] - modelValue[0]) * 100) / scope.value}%`;
      }
      return `${((modelValue - Number(min)) * 100) / scope.value}%`;
    };

    const calcOffset = () => {
      const { modelValue, min } = props;
      if (isRange(modelValue)) {
        return `${((modelValue[0] - Number(min)) * 100) / scope.value}%`;
      }
      return '0%';
    };

    const barStyle = computed<CSSProperties>(() => {
      if (props.vertical) {
        return {
          height: calcMainAxis(),
          top: calcOffset(),
          background: props.activeColor,
          transition: dragStatus.value ? 'none' : undefined,
        };
      }
      return {
        width: calcMainAxis(),
        left: calcOffset(),
        background: props.activeColor,
        transition: dragStatus.value ? 'none' : undefined,
      };
    });
    const markClassName = (mark: any) => {
      const classPrefix = 'vin-range-mark';
      const { modelValue, max, min } = props;
      let lowerBound: any = Number(min);
      let upperBound: any = Number(max);
      if (props.range) {
        const [left, right] = modelValue as any;
        lowerBound = left;
        upperBound = right;
      } else {
        upperBound = modelValue;
      }
      const isActive = mark <= upperBound && mark >= lowerBound;
      return {
        [`${classPrefix}-text`]: true,
        [`${classPrefix}-text-active`]: isActive,
      };
    };
    const marksStyle = (mark: any) => {
      const { max, min, vertical } = props;
      let style: any = {
        left: `${((mark - Number(min)) / scope.value) * 100}%`,
      };
      if (vertical) {
        style = {
          top: `${((mark - Number(min)) / scope.value) * 100}%`,
        };
      }
      return style;
    };
    const tickStyle = (mark: any) => {
      const { modelValue, max, min } = props;
      let lowerBound: any = Number(min);
      let upperBound: any = Number(max);
      if (props.range) {
        const [left, right] = modelValue as any;
        lowerBound = left;
        upperBound = right;
      }
      const isActive = mark <= upperBound && mark >= lowerBound;
      const style: any = {
        background: !isActive ? props.inactiveColor : props.activeColor,
      };

      return style;
    };
    const format = (value: number) => {
      const { min, max, step } = props;
      value = Math.max(+min, Math.min(value, +max));
      return Math.round(value / +step) * +step;
    };

    const isSameValue = (newValue: SliderValue, oldValue: SliderValue) =>
      JSON.stringify(newValue) === JSON.stringify(oldValue);

    const handleOverlap = (value: number[]) => {
      if (value[0] > value[1]) {
        return value.slice(0).reverse();
      }
      return value;
    };

    const updateValue = (value: SliderValue, end?: boolean) => {
      if (isRange(value)) {
        value = handleOverlap(value).map(format);
      } else {
        value = format(value);
      }

      if (!isSameValue(value, props.modelValue)) {
        emit('update:modelValue', value);
      }

      if (end && !isSameValue(value, startValue)) {
        emit('change', value);
      }
    };

    const onClick = async (event: MouseEvent) => {
      if (props.disabled) {
        return;
      }

      const { min, modelValue } = props;
      const rect = await useRect(rootId.value, instance);
      let delta = (event as any).touches[0].clientX - rect.left;
      let total = rect.width;
      if (props.vertical) {
        delta = (event as any).touches[0].clientY - rect.top;
        total = rect.height;
      }
      const value = Number(min) + (delta / total) * scope.value;
      if (isRange(modelValue)) {
        const [left, right] = modelValue;
        const middle = (left + right) / 2;
        if (value <= middle) {
          updateValue([value, right], true);
        } else {
          updateValue([left, value], true);
        }
      } else {
        updateValue(value, true);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (props.disabled) {
        return;
      }

      touch.start(event);
      currentValue = props.modelValue;

      if (isRange(currentValue)) {
        startValue = currentValue.map(format);
      } else {
        startValue = format(currentValue);
      }

      dragStatus.value = 'start';
      event.stopPropagation();
      event.preventDefault();
    };

    const onTouchMove = async (event: TouchEvent) => {
      if (props.disabled) {
        return;
      }

      if (dragStatus.value === 'start') {
        emit('drag-start');
      }

      touch.move(event);
      dragStatus.value = 'draging';

      const rect = await useRect(rootId.value, instance);
      let delta = touch.deltaX.value;
      let total = rect.width;
      let diff = (delta / total) * scope.value;
      if (props.vertical) {
        delta = touch.deltaY.value;
        total = rect.height;
        diff = (delta / total) * scope.value;
      }
      if (isRange(startValue)) {
        (currentValue as number[])[buttonIndex.value] = startValue[buttonIndex.value] + diff;
      } else {
        currentValue = startValue + diff;
      }
      updateValue(currentValue);
      event.stopPropagation();
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (props.disabled) {
        return;
      }
      if (dragStatus.value === 'draging') {
        updateValue(currentValue, true);
        emit('drag-end');
      }
      dragStatus.value = '';
      event.stopPropagation();
      event.preventDefault();
    };

    const curValue = (idx?: number): number => {
      const value =
        Array.isArray(props.modelValue) && typeof idx === 'number'
          ? (props.modelValue as number[])[idx]
          : Number(props.modelValue);
      return value;
    };
    return {
      root,
      rootId,
      mainClass,
      mainStyle,
      wrapperStyle,
      buttonStyle,
      onClick,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      ...toRefs(props),
      barStyle,
      curValue,
      buttonIndex,
      containerClasses,
      markClassName,
      marksStyle,
      marksList,
      tickStyle,
      refRandomId,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
