import { mount, config } from '@vue/test-utils';
import Skeleton from '../index.vue';

import VinAvatar from '../../avatar/index.vue';
import VinIcon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    VinAvatar,
    VinIcon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('should render with row width array correctly', () => {
  const wrapper = mount(Skeleton, {
    props: {
      width: '100px',
    },
  });
  const skeleton: any = wrapper.find('.vin-skeleton__block');
  expect(skeleton.element.style.width).toBe('100px');
});

test('should allow to disable animation', async () => {
  const wrapper = mount(Skeleton, {
    props: {
      row: '1',
    },
  });

  expect(wrapper.find('.vin-skeleton').exists()).toBeTruthy();

  await wrapper.setProps({ animated: false });
  expect(wrapper.find('.vin-skeleton-animation').exists()).toBeFalsy();
});

test('should change avatar size when using avatarSize prop', () => {
  const wrapper = mount(Skeleton, {
    props: {
      avatar: true,
      avatarSize: '20px',
    },
  });

  const avatar: any = wrapper.find('.vin-skeleton__avatar');
  expect(avatar.element.style.width).toMatchSnapshot('20px');
  expect(avatar.element.style.height).toMatchSnapshot('20px');
});

test('should change avatar shape when using avatarShape prop', () => {
  const wrapper = mount(Skeleton, {
    props: {
      avatar: true,
      avatarShape: 'square',
    },
  });
  expect(wrapper.find('.vin-skeleton__avatar').html()).toMatchSnapshot();
});

test('should be round when using round prop', () => {
  const wrapper = mount(Skeleton, {
    props: {
      title: true,
      round: true,
      avatar: true,
    },
  });
  expect(wrapper.find('.vin-skeleton__avatar').exists()).toBeTruthy();
});

test('should render default slot', () => {
  const wrapper = mount(Skeleton, {
    slots: {
      default: 'default',
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
