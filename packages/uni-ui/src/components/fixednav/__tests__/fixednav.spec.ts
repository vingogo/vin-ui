import { config, DOMWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import FixedNav from '../index.vue';
import VinIcon from '../../icon/index.vue';
import vinOverlay from '../../overlay/index.vue';

beforeAll(() => {
  config.global.components = {
    VinIcon,
    vinOverlay,
  };
});

afterAll(() => {
  config.global.components = {};
});
describe('FixedNav', () => {
  test('base vin-fixednav', () => {
    const wrapper = mount(FixedNav);
    const rate = wrapper.find('.vin-fixednav');
    expect(rate.exists()).toBe(true);
  });

  test('should be displayed after setting the visible', () => {
    const wrapper = mount(FixedNav, {
      props: {
        visible: true,
        overlay: true,
      },
    });
    const fixednav: DOMWrapper<Element> = wrapper.find('.vin-fixednav__list');
    expect(fixednav.exists()).toBe(true);
  });
  test('should be displayed after setting the type', () => {
    const wrapper = mount(FixedNav, {
      props: {
        type: 'left',
      },
    });
    const fixednav: DOMWrapper<Element> = wrapper.find('.left');
    expect(fixednav.exists()).toBe(true);
  });

  // test('should be displayed after setting the un-active-text', async () => {
  //   const wrapper = mount(FixedNav, {
  //     props: {
  //       'un-active-text': '展开',
  //       'active-text': '收起',
  //     },
  //   });
  //   const _html1 = wrapper.find('.vin-overlay');
  //   expect(_html1.exists()).toBe(true);
  //   const _html = wrapper.find('.vin-fixednav__btn');
  //   expect(_html.html()).toContain('展开');
  //   wrapper.find('.vin-fixednav__btn').trigger('click');
  //   await nextTick();
  //   expect(wrapper.emitted('update:visible')![0]).toEqual([true]);
  // });

  test('should be displayed after setting the position', () => {
    const wrapper = mount(FixedNav, {
      props: {
        position: { top: '210px' },
      },
    });
    const fixednav = wrapper.find('.vin-fixednav');
    expect((fixednav.element as HTMLElement).style.top).toBe('210px');
  });
});
