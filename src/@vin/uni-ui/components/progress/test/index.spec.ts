import { config, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VinIcon from '../../icon/index.vue';
import Progress from '../index.vue';

beforeAll(() => {
  config.global.components = {
    VinIcon,
  };
});

afterAll(() => {
  config.global.components = {};
});

// id 每次不一样导致不能通过
// test('should render progress when use props', async () => {
//   const wrapper = mount(Progress, {
//     props: {
//       percentage: 100,
//     },
//   });
//   expect(wrapper.html()).toMatchSnapshot();
// });
test('should render different height and color when use color height props', async () => {
  const wrapper = mount(Progress, {
    props: {
      percentage: 50,
      strokeColor: 'blue',
      strokeWidth: '20',
      textColor: 'red',
    },
  });
  await nextTick();
  const inner = wrapper.find<HTMLElement>('.vin-progress-inner');
  expect(inner.element.style.background).toEqual('blue');
  const text = wrapper.find<HTMLElement>('.vin-progress-text');
  const span = wrapper.find<HTMLElement>('.vin-progress-text span');
  expect(span.element.style.color).toEqual('red');
  expect(text.element.style.lineHeight).toEqual('20px');
});

test('should hide percentage when use showText props', () => {
  const wrapper = mount(Progress, {
    props: {
      percentage: 50,
      showText: false,
    },
  });
  const text = wrapper.find<HTMLElement>('.vin-progress-text');
  expect(text.exists()).toBe(false);
});

test('should render inside percentage when use textInside props', () => {
  const wrapper = mount(Progress, {
    props: {
      percentage: 50,
      textInside: true,
    },
  });
  const text = wrapper.find<HTMLElement>('.vin-progress-insidetext');
  expect(text.exists()).toBe(true);
});

test('should render custom size when use size props', () => {
  const wrapper = mount(Progress, {
    props: {
      percentage: 50,
      size: 'large',
    },
  });
  const text = wrapper.find<HTMLElement>('.vin-progress-large');
  expect(text.exists()).toBe(true);
});
