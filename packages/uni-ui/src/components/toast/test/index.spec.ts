import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Toast from '../index.vue';

function sleep(delay = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

describe('component toast', () => {
  test('should render toast after using msg and id', async () => {
    const wrapper = mount(Toast, {
      props: {
        id: '12313',
        msg: 'taost',
      },
    });
    await sleep(1000);
    const toast = wrapper.find('.vin-toast');
    expect(toast.exists()).toBe(true);
  });

  test('should be displayed long enough when use duration ', async () => {
    const wrapper = mount(Toast, {
      props: {
        msg: 'taost',
        duration: 3000,
      },
    });
    await sleep(100);
    const toast: any = wrapper.find('.vin-toast');
    expect(toast.exists()).toBe(true);
    await sleep(3100);
    expect(toast.element.style.display).toEqual('none');
  });

  test('should change cover style after using cover-color prop', async () => {
    const wrapper = mount(Toast, {
      props: {
        cover: true,
        coverColor: 'black',
      },
    });
    await sleep();
    const toastCover: any = wrapper.find('.vin-toast-cover');
    expect(toastCover.element.style.backgroundColor).toEqual('black');
  });
  test('should close Toast when using closeOnClickOverlay prop and clicked', async () => {
    const wrapper = mount(Toast, {
      props: {
        cover: true,
        coverColor: 'black',
        closeOnClickOverlay: true,
      },
    });
    await sleep();
    const toast: any = wrapper.find('.vin-toast');
    toast.trigger('click');
    await nextTick();
    expect(toast.element.style.display).toEqual('none');
  });
  test('should render customClass when using customClass prop ', async () => {
    const wrapper = mount(Toast, {
      props: {
        customClass: 'custom',
      },
    });
    await sleep();
    const toast: any = wrapper.find('.custom');
    expect(toast.exists()).toBe(true);
  });
  test('should change icon size when using icon-size prop', async () => {
    const wrapper = mount(Toast, {
      props: {
        icon: 'success',
        size: '30',
      },
    });

    await sleep();
    const icon: any = wrapper.find('.vin-icon');
    expect(icon.element.style.fontSize).toEqual('30px');
  });
});
