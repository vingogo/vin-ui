import { config, mount } from '@vue/test-utils';
import AvatarGroup from '../index.vue';
import Icon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    Icon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('size props', async () => {
  const wrapper = mount(AvatarGroup, {
    props: {
      size: 'small',
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
