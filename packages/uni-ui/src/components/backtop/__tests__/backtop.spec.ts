import { mount, config } from '@vue/test-utils';
import { nextTick } from 'vue';
import BackTop from '../index.vue';
import { mockScrollTop } from '../../../utils/test/unit';

import Icon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    Icon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('emit click event', () => {
  const wrapper = mount(BackTop);
  wrapper.find('.vin-backtop').trigger('click');
  expect(wrapper.emitted('click')!.length).toEqual(1);
});

test('backtop show', () => {
  const wrapper = mount(BackTop);
  const backtop = wrapper.find('.vin-backtop');
  expect(backtop.exists()).toBe(true);
});

test('backtop style', () => {
  const wrapper = mount(BackTop, {
    props: {
      bottom: 50,
    },
  });
  const backtop: any = wrapper.find('.vin-backtop');
  expect(backtop.element.style.bottom).toBe('50px');
});

// test('backtop style,backtop show', async () => {
//   const wrapper = mount(BackTop, {
//     props: {
//       right: 40,
//     },
//   });
//   await mockScrollTop(1000);
//   const show: any = wrapper.find('.show');
//   expect(show.exists()).toBe(true);
//   const backtop: any = wrapper.find('.vin-backtop');
//   expect(backtop.element.style.right).toBe('40px');
// });

test('backtop style', async () => {
  const wrapper = mount(BackTop, {
    props: {
      zIndex: 100,
      distance: 0,
    },
  });
  await nextTick();
  const backtop: any = wrapper.find('.vin-backtop');
  const show: any = wrapper.find('.show');
  expect(backtop.element.style.zIndex).toBe('100');
  expect(show.exists()).toBe(false);
});
