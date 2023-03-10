import { config, mount } from '@vue/test-utils';
import Icon from '../index.vue';

test('should render icon fabulous', async () => {
  const wrapper = mount(Icon, {
    props: {
      name: 'fabulous',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
test('should render icon image type', async () => {
  const wrapper = mount(Icon, {
    props: {
      name: 'https://vingogo.cn/docs/images/logo.png',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should render icon fabulous color', async () => {
  const wrapper = mount(Icon, {
    props: {
      name: 'fabulous',
      color: 'red',
    },
  });

  expect(wrapper.find<HTMLElement>('.vin-icon-fabulous').element.style.color).toEqual('red');
  expect(wrapper.html()).toMatchSnapshot();
});

test('should render icon fabulous size', async () => {
  const wrapper = mount(Icon, {
    props: {
      name: 'fabulous',
      size: '24',
    },
  });

  expect(wrapper.find<HTMLElement>('.vin-icon-fabulous').element.style.fontSize).toEqual('24px');
  expect(wrapper.html()).toMatchSnapshot();
});
