import { mount } from '@vue/test-utils';
import { reactive, toRefs } from 'vue';
import Checkbox from '../index.vue';

test('basic usage', () => {
  const wrapper = mount(Checkbox, {
    props: {
      modelValue: '',
      label: '复选框',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('checkbox disabled test', async () => {
  const wrapper = mount({
    components: {
      [Checkbox.name]: Checkbox,
    },
    template: `
      <template>
        <vin-checkbox v-model="checkbox1" disabled>未选时禁用状态</vin-checkbox>
      </template>
    `,
    setup() {
      const state = reactive({
        checkbox1: true,
      });
      return { ...toRefs(state) };
    },
  });

  const items = wrapper.findAll('.vin-checkbox');

  await items[0].trigger('click');
  expect(wrapper.vm.checkbox1).toEqual(true);
  expect(wrapper.find('.vin-checkbox__icon--disable')).toBeTruthy();
});

test('checkbox text-position test', () => {
  const wrapper = mount({
    components: {
      'vin-checkbox': Checkbox,
    },
    template: `
      <template>
        <vin-checkbox v-model="checkbox1">right</vin-checkbox>
        <vin-checkbox v-model="checkbox2" text-position="left">left</vin-checkbox>
      </template>
    `,
    setup() {
      const state = reactive({
        checkbox1: true,
        checkbox2: true,
      });
      return { ...toRefs(state) };
    },
  });

  const items = wrapper.findAll('.vin-checkbox');
  expect((items[1] as any).find('.vin-checkbox--reverse')).toBeTruthy();
});

test('checkbox icon-size test', () => {
  const wrapper = mount({
    components: {
      'vin-checkbox': Checkbox,
    },
    template: `
      <template>
        <vin-checkbox v-model="checkbox5" icon-size="25">自定义尺寸25</vin-checkbox>
        <vin-checkbox v-model="checkbox6" icon-size="10">自定义尺寸10</vin-checkbox>
      </template>
    `,
    setup() {
      const state = reactive({
        checkbox5: true,
        checkbox6: true,
      });
      return { ...toRefs(state) };
    },
  });

  const items = wrapper.findAll('.vin-checkbox');
  expect((items[0].findAll('text') as any)[0].element.style.fontSize).toEqual('25px');
  expect((items[1].findAll('text') as any)[0].element.style.fontSize).toEqual('10px');
});

test('checkbox icon-name test', () => {
  const wrapper = mount({
    components: {
      'vin-checkbox': Checkbox,
    },
    template: `
      <template>
        <vin-checkbox v-model="checkbox5"  icon-name="checklist" icon-active-name="checklist">自定义图标</vin-checkbox>
        <vin-checkbox v-model="checkbox6">auxiliary</vin-checkbox>
      </template>
    `,
    setup() {
      const state = reactive({
        checkbox5: true,
        checkbox6: true,
      });
      return { ...toRefs(state) };
    },
  });

  const items = wrapper.findAll('.vin-checkbox');
  expect((items[0].findAll('text') as any)[0].classes()).toContain('vin-icon-checklist');
});

test('checkbox label test', () => {
  const wrapper = mount({
    components: {
      'vin-checkbox': Checkbox,
    },
    template: `
      <template>
        <vin-checkbox v-model="checkbox5" label="testlabel"></vin-checkbox>
        <vin-checkbox v-model="checkbox6">auxiliary</vin-checkbox>
      </template>
    `,
    setup() {
      const state = reactive({
        checkbox5: true,
        checkbox6: true,
      });
      return { ...toRefs(state) };
    },
  });

  const items = wrapper.findAll('.vin-checkbox');
  expect((items[0].findAll('text') as any)[0].find('testlabel')).toBeTruthy();
});

test('should emit "update:modelValue" event when checkbox is clicked', async () => {
  const wrapper = mount(Checkbox);

  wrapper.trigger('click');
  expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);

  await wrapper.setProps({ modelValue: true });
  wrapper.trigger('click');
  expect(wrapper.emitted('update:modelValue')![1]).toEqual([false]);
});

// test('should emit change event when modelValue is changed', async () => {
//   const wrapper = mount(Checkbox);

//   wrapper.trigger('click');
//   await wrapper.setProps({ modelValue: true });
//   expect(wrapper.emitted('change')![0]).toEqual([true]);

//   wrapper.trigger('click');
//   await wrapper.setProps({ modelValue: false });
//   expect(wrapper.emitted('change')![1]).toEqual([false]);
// });
