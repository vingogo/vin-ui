import { mount, config } from '@vue/test-utils';
import Switch from '../index.vue';

import VinIcon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    VinIcon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('render ok', () => {
  const wrapper = mount(Switch);

  expect(wrapper.html()).toMatchSnapshot();
});

test('prop modelValue test', () => {
  const wrapper = mount(Switch, {
    props: {
      modelValue: true,
    },
  });
  expect(wrapper.classes()).toContain('switch-open');
});

test('prop disable test', () => {
  const wrapper = mount(Switch, {
    props: {
      disable: true,
    },
  });
  expect(wrapper.classes()).toContain('vin-switch-disable');
});

test('prop loading test', () => {
  const wrapper = mount(Switch, {
    props: {
      loading: true,
    },
  });
  expect(wrapper.find('.vin-icon-loading1')).toBeTruthy();
});

test('prop  color and size on loading mode', () => {
  const wrapper = mount(Switch, {
    props: {
      loading: true,
      color: 'blue',
      size: '16px',
    },
  });
  const { style } = wrapper.find('.switch-button').findAll('text')[0].element;
  expect(style.color).toEqual('blue');
  expect(style.fontSize).toEqual('16px');
});

test('prop activeText test', () => {
  const wrapper = mount(Switch, {
    props: {
      activeText: 'test text',
    },
  });
  expect(wrapper.html()).toContain('test text');
});

test('emit click event', () => {
  const wrapper = mount(Switch);

  wrapper.trigger('click');
  expect(wrapper.emitted('change')).toBeTruthy();
});
