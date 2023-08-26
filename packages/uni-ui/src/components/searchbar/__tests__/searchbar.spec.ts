import { mount, config } from '@vue/test-utils';
import SearchBar from '../index.vue';

import VinIcon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    VinIcon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('basic usage', () => {
  const wrapper = mount(SearchBar, {
    props: {
      modelValue: '',
    },
  });

  expect(wrapper.find('.vin-searchbar').html()).toMatchSnapshot();
});

test('should limit maxlength of input value when using maxlength prop', async () => {
  const wrapper = mount(SearchBar, {
    props: {
      maxLength: 3,
      modelValue: '9999',
    },
  });

  const input = wrapper.find('input');
  input.trigger('input');
  expect((wrapper.emitted('change') as any)[0][0]).toEqual('999');
  input.element.value = '9999';
});

test('should format input value when type is number', () => {
  const wrapper = mount(SearchBar, {
    props: {
      type: 'number',
      modelValue: '',
    },
  });
  const input = wrapper.find('input');
  input.trigger('input');
  expect((wrapper.emitted('change') as any)[0][0]).toEqual('');
  input.element.value = '9999';
});

test('should format input value when type is number', () => {
  const wrapper = mount(SearchBar, {
    props: {
      type: 'number',
      modelValue: '',
    },
  });
  const input = wrapper.find('input');
  input.element.value = '1';
  input.trigger('input');
  expect((wrapper.emitted('change') as any)[0][0]).toEqual('1');

  input.element.value = '12';
  input.trigger('input');
  expect((wrapper.emitted('change') as any)[1][0]).toEqual('12');
});

test('backgrounds prop test', () => {
  const wrapper = mount(SearchBar, {
    props: {
      modelValue: '',
      background: 'red',
      inputBackground: 'green',
    },
  });
  const outer: any = wrapper.find('.vin-searchbar');
  const inner: any = wrapper.find('.vin-searchbar__search-input');
  expect(outer.element.style.backgroundColor).toEqual('red');
  expect(inner.element.style.backgroundColor).toEqual('green');
});

test('change event test', async () => {
  const wrapper = mount(SearchBar, {
    props: {
      modelValue: '',
    },
  });

  const input = wrapper.find('input');
  await input.trigger('input');
  expect(wrapper.emitted('change')).toBeTruthy();
});

test('change event test', async () => {
  const wrapper = mount(SearchBar, {
    props: {
      modelValue: '',
    },
  });

  const input = wrapper.find('input');
  await input.trigger('input');
  expect(wrapper.emitted('change')).toBeTruthy();
});

test('focus event focus', async () => {
  const wrapper = mount(SearchBar, {
    props: {
      modelValue: '',
    },
  });

  const input = wrapper.find('input');
  await input.trigger('focus');
  expect(wrapper.emitted('focus')).toBeTruthy();
});

test('blur event test', async () => {
  const wrapper = mount(SearchBar, {
    props: {
      modelValue: '',
    },
  });

  const input = wrapper.find('input');
  await input.trigger('blur');
  expect(wrapper.emitted('blur')).toBeTruthy();
});

test('clear event test', async () => {
  const wrapper = mount(SearchBar, {
    props: { modelValue: 3 },
  });
  const input = wrapper.find('input');
  const clear = wrapper.find('.vin-searchbar__input-clear');
  wrapper.find('input').trigger('input');
  expect(input.element.value).toBe('3');
  await clear.trigger('click');
  // 修改update:modelValue
  expect((wrapper.emitted('update:modelValue') as any)[1][0]).toEqual('');
  expect(clear.exists()).toBe(true);
});

test('slot test', () => {
  const wrapper = mount(SearchBar, {
    props: { modelValue: '' },
    slots: {
      default: () => {
        `
          <template v-slot:leftout>
            <vin-icon size="20" name="left"></vin-icon>
          </template>
          <template v-slot:leftin>
            <vin-icon size="14" name="search2"></vin-icon>
          </template>
          <template v-slot:rightin>
            <vin-icon size="20" name="photograph"></vin-icon>
          </template>
          <template v-slot:rightout>
            <vin-icon size="20" name="message"></vin-icon>
          </template>
        `;
      },
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
