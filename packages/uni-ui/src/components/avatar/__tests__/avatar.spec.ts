import { config, mount } from '@vue/test-utils';
import Avatar from '../index.vue';
import VinIcon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    VinIcon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('size props', async () => {
  const wrapper = mount(Avatar, {
    props: {
      size: 'small',
    },
  });
  const avatar: any = wrapper.find('.vin-avatar');
  expect(avatar.classes()).toContain('vin-avatar-small');
  await wrapper.setProps({ size: 'large' });
  expect(avatar.classes()).toContain('vin-avatar-large');
  await wrapper.setProps({ size: '30' });
  expect(avatar.element.style.width).toBe('30px');
});

test('shape props', () => {
  const wrapper = mount(Avatar, {
    props: {
      shape: 'square',
    },
  });
  const avatar: any = wrapper.find('.vin-avatar');
  expect(avatar.classes()).toContain('vin-avatar-square');
});

test('bgColor props', () => {
  const wrapper = mount(Avatar, {
    props: {
      bgColor: '#000000',
    },
  });
  const avatar: any = wrapper.find('.vin-avatar');
  expect(avatar.element.style.backgroundColor).toBe('rgb(0, 0, 0)');
});

test('color props', async () => {
  const wrapper = mount(Avatar, {
    props: {
      color: 'rgb(153, 153, 153)',
    },
  });
  const avatar: any = wrapper.find('.vin-avatar');
  expect(avatar.element.style.color).toBe('rgb(153, 153, 153)');
});

test('icon props', () => {
  const wrapper = mount(Avatar, {
    props: {
      icon: 'my',
    },
  });
  const icon: any = wrapper.find('.vin-icon');
  expect(icon.classes()).toContain('vin-icon-my');
});

test('url props', () => {
  const wrapper = mount(Avatar, {
    props: {
      url: 'https://via.placeholder.com/60x60/fbbd08/fff?text=Vin',
    },
  });
  const img: any = wrapper.find('img');
  expect(img.attributes().src).toBe('https://via.placeholder.com/60x60/fbbd08/fff?text=Vin');
});

test('alt props', () => {
  const wrapper = mount(Avatar, {
    props: {
      url: 'https://via.placeholder.com/60x60/fbbd08/fff?text=Vin',
      alt: '我是alt',
    },
  });
  const img: any = wrapper.find('img');
  expect(img.attributes().alt).toBe('我是alt');
});

// 点击事件
test('should emit active-avatarror event', () => {
  const wrapper = mount(Avatar);
  const avatar: any = wrapper.find('.vin-avatar');
  avatar.trigger('click');
  expect(wrapper.emitted('click')).toHaveLength(1);
});
