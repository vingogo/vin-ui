import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { mockScrollTop } from '../../../utils/test/unit';
import List from '../index.vue';

test('should render height', async () => {
  const wrapper = mount(List, {
    props: {
      height: 50,
      listData: new Array(100).fill(0),
    },
  });

  await nextTick();

  const listItem = wrapper.findAll('.vin-list-item')[0];
  expect((listItem.element as any).style.height).toEqual('50px');
});

test('should render height', async () => {
  const visibleCount = Math.ceil(667 / 50);
  const wrapper = mount(List, {
    props: {
      height: 50,
      listData: new Array(100).fill(0),
    },
  });

  await nextTick();
  await mockScrollTop(100);

  const listItem = wrapper.findAll('.vin-list-item');
  expect(listItem.length).toBe(visibleCount);
});
