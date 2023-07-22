import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Range from '../index.vue';
import { trigger, triggerDrag } from '../../../utils/test/event';

test('should render range when used ', async () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 30,
    },
  });
  const inner = wrapper.find<HTMLElement>('.vin-range-button .number');
  expect(inner.text()).toBe('30');
});

test('should render two buttons when use range props', async () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: [30, 70],
      range: true,
    },
  });
  const left = wrapper.find<HTMLElement>('.vin-range-button-wrapper-left .number');
  const right = wrapper.find<HTMLElement>('.vin-range-button-wrapper-right .number');
  expect(left.text()).toBe('30');
  expect(right.text()).toBe('70');
});

test('should set min and max when use min and max props', async () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 0,
      max: 10,
      min: -10,
      range: true,
    },
  });

  const min = wrapper.find<HTMLElement>('.min');
  const max = wrapper.find<HTMLElement>('.max');
  const btn = wrapper.find<HTMLElement>('.vin-range-button-wrapper-left .number');
  expect(min.text()).toBe('-10');
  expect(max.text()).toBe('10');
  expect(btn.text()).toBe('');
});

test('should change color template when use color props', async () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 10,
      inactiveColor: 'rgb(163,184,255)',
      buttonColor: 'rgb(52,96,250)',
      activeColor: 'rgb(238, 238, 238)',
    },
  });
  await nextTick();
  const root = wrapper.find<HTMLElement>('.vin-range');
  const bar = wrapper.find<HTMLElement>('.vin-range-bar');
  const btn = wrapper.find<HTMLElement>('.vin-range-button');
  expect(root.element.style.backgroundColor).toEqual('rgb(163, 184, 255)');
  expect(bar.element.style.background).toEqual('rgb(238, 238, 238)');
  expect(btn.element.style.borderColor).toEqual('rgb(52,96,250)');
});

test('should render slots template when use slots', async () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 10,
    },
    slots: {
      button: '<view class="test_div">btn</view>',
    },
  });
  const btn = wrapper.find<HTMLElement>('.vin-range-button-wrapper');
  expect(btn.html()).toContain('<view class="test_div">btn</view>');
});

test('should not render elements  when use hidden elements props', async () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 10,
      hiddenRange: true,
      hiddenTag: true,
    },
  });
  expect(wrapper.find<HTMLElement>('.vin-range-button').exists()).toBe(true);
  expect(wrapper.find<HTMLElement>('.min').exists()).toBe(false);
  expect(wrapper.find<HTMLElement>('.max').exists()).toBe(false);
  expect(wrapper.find<HTMLElement>('.vin-range-button .number').exists()).toBe(false);
});

test('should not allow to click slider when disabled', async () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 10,
      disabled: true,
    },
  });
  const range = wrapper.find('.vin-range');
  trigger(range, 'click', 100, 0);
  expect(wrapper.emitted('change')).toBeFalsy();
});

test('should emit "change" event after dragging button', () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 10,
    },
  });

  const button = wrapper.find('.vin-range-button');
  triggerDrag(button, 50, 0);
  expect(wrapper.emitted('change')!.pop()).toEqual([100]);
});
test('should emit "update:modelValue" event after dragging button', () => {
  const wrapper = mount(Range, {
    props: {
      modelValue: 10,
    },
  });

  const button = wrapper.find('.vin-range-button');
  triggerDrag(button, 50, 0);
  expect(wrapper.emitted('update:modelValue')!.pop()).toEqual([100]);
});
