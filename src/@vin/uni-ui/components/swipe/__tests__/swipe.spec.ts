import { config, DOMWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Swipe from '../index.vue';
import VinButton from '../../button/index.vue';
import VinCell from '../../cell/index.vue';
import VinIcon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    VinButton,
    VinCell,
    VinIcon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('base swipe', () => {
  const wrapper = mount(Swipe);
  const swipe: DOMWrapper<Element> = wrapper.find('.vin-swipe');
  expect(swipe.exists()).toBe(true);
});

test('base swipe props disabled', async () => {
  const wrapper = mount(Swipe, {
    props: {
      disabled: false,
    },
    slots: {
      right: `<vin-button shape="square" style="height: 100%" type="danger"
      >删除</vin-button>`,
    },
  });
  await nextTick();
  const swipe1: DOMWrapper<Element> = wrapper.find('.vin-swipe__right');
  const swipe2: DOMWrapper<Element> = wrapper.find('.vin-button');
  expect(swipe1.exists()).toBe(true);
  expect(swipe1.text()).toBe('删除');
  expect(swipe2.exists()).toBe(true);
});
test('base swipe Slots', async () => {
  const wrapper = mount(Swipe, {
    slots: {
      left: `<vin-button shape="square" style="height: 100%" type="success"
      >选择</vin-button>`,
    },
  });
  await nextTick();
  const swipe: DOMWrapper<Element> = wrapper.find('.vin-swipe__left');
  const swipe2: DOMWrapper<Element> = wrapper.find('.vin-button');
  expect(swipe.exists()).toBe(true);
  expect(swipe.text()).toBe('选择');
  expect(swipe2.exists()).toBe(true);
});
test('base swipe content', async () => {
  const wrapper = mount(Swipe, {
    slots: {
      default: '<vin-cell round-radius="0" desc="左滑右滑都可以哦" />',
    },
  });
  await nextTick();
  const swipe2: DOMWrapper<Element> = wrapper.find('.vin-swipe__content');
  const swipe3: DOMWrapper<Element> = wrapper.find('.vin-cell');
  expect(swipe2.exists()).toBe(true);
  expect(swipe2.text()).toBe('左滑右滑都可以哦');
  expect(swipe3.exists()).toBe(true);
});
