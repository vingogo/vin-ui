import { mount } from '@vue/test-utils';
import { reactive, toRefs } from 'vue';
import RadioGroup from '../index.vue';
import Radio from '../../radio/index.vue';

test('should emit "update:modelValue" and "change" event when radio is clicked', async () => {
  const wrapper = mount({
    emits: ['change'],
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" @change="change">
          <vin-radio label="1" icon-size="12"></vin-radio>
          <vin-radio label="2" icon-size="12"></vin-radio>
          <vin-radio label="3" icon-size="12"></vin-radio>
          <vin-radio label="4" icon-size="12"></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup(props, { emit }) {
      const state = reactive({
        radioVal: '',
      });
      return {
        emit,
        change(value: string) {
          emit('change', value);
        },
        ...toRefs(state),
      };
    },
  });

  const items = wrapper.findAll('.vin-radio');

  await items[0].trigger('click');
  expect(wrapper.vm.radioVal).toEqual('1');
  expect(wrapper.emitted('change')![0]).toEqual(['1']);
});

test('radiogroup text-position test', () => {
  const wrapper = mount({
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" text-position="left">
          <vin-radio label="1" icon-size="12"></vin-radio>
          <vin-radio label="2" icon-size="12"></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup() {
      const state = reactive({
        radioVal: '',
      });
      return {
        ...toRefs(state),
      };
    },
  });

  const items = wrapper.findAll('.vin-radio');
  expect((items[1] as any).find('.vin-radio--reverse')).toBeTruthy();
});

test('radiogroup direction test', () => {
  const wrapper = mount({
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio label="1" icon-size="12"></vin-radio>
          <vin-radio label="2" icon-size="12"></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup() {
      const state = reactive({
        radioVal: '',
      });
      return {
        ...toRefs(state),
      };
    },
  });

  const items = wrapper.findAll('.vin-radiogroup');
  expect((items[0] as any).find('.vin-radiogroup--horizontal')).toBeTruthy();
});

test('radio disabled test', async () => {
  const wrapper = mount({
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio label="1"></vin-radio>
          <vin-radio label="2" disabled></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup() {
      const state = reactive({
        radioVal: '',
      });
      return {
        ...toRefs(state),
      };
    },
  });

  const items: any = wrapper.findAll('.vin-radio');
  expect(items[1].find('.vin-radio__icon--disable')).toBeTruthy();
});

test('radio icon-size test', async () => {
  const wrapper = mount({
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio label="1" icon-size="25"></vin-radio>
          <vin-radio label="2" icon-size="12" disabled></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup() {
      const state = reactive({
        radioVal: '',
      });
      return {
        ...toRefs(state),
      };
    },
  });

  const items: any = wrapper.findAll('.vin-radio');
  expect((items[0].findAll('text') as any)[0].element.style.fontSize).toEqual('25px');
  expect((items[1].findAll('text') as any)[0].element.style.fontSize).toEqual('12px');
});

test('radio icon-name test', async () => {
  const wrapper = mount({
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio label="1" icon-size="25" icon-name="checklist" icon-active-name="checklist"></vin-radio>
          <vin-radio label="2" icon-size="12"></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup() {
      const state = reactive({
        radioVal: '',
      });
      return {
        ...toRefs(state),
      };
    },
  });

  const items = wrapper.findAll('.vin-radio');
  expect((items[0].findAll('text') as any)[0].classes()).toContain('vin-icon-checklist');
});

test('radio label test', async () => {
  const wrapper = mount({
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio icon-size="25" label="testlabel"></vin-radio>
          <vin-radio label="2" icon-size="12"></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup() {
      const state = reactive({
        radioVal: '',
      });
      return {
        ...toRefs(state),
      };
    },
  });

  const items = wrapper.findAll('.vin-radio');
  expect((items[0].findAll('text') as any)[0].find('testlabel')).toBeTruthy();
});

test('radio shape test', async () => {
  const wrapper = mount({
    components: {
      'vin-radiogroup': RadioGroup,
      'vin-radio': Radio,
    },
    template: `
      <template>
        <vin-radiogroup v-model="radioVal" direction="horizontal">
          <vin-radio icon-size="25" label="1" shape="button"></vin-radio>
          <vin-radio label="2" icon-size="12"></vin-radio>
        </vin-radiogroup>
      </template>
    `,
    setup() {
      const state = reactive({
        radioVal: '',
      });
      return {
        ...toRefs(state),
      };
    },
  });

  const items = wrapper.findAll('.vin-radio');
  expect((items[0] as any).find('.vin-radio--button')).toBeTruthy();
  expect((items[1] as any).find('.vin-radio--round')).toBeTruthy();
});
