import { mount } from '@vue/test-utils';
import Row from '../index.vue';

test('should add "vin-row-flex-nowrap" class when wrap prop is false', () => {
  const wrapper = mount(Row, {
    props: {
      wrap: 'nowrap',
    },
  });
  expect(wrapper.classes()).toContain('vin-row-flex-nowrap');
});
