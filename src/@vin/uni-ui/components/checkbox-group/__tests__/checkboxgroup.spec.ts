import { mount } from '@vue/test-utils';
import { reactive, toRefs } from 'vue';
import Checkboxgroup from '../index.vue';
import Checkbox from '../../checkbox/index.vue';

test('checkbox-group basic usage', async () => {
  const wrapper = mount({
    components: {
      'vin-checkboxgroup': Checkboxgroup,
      'vin-checkbox': Checkbox,
    },
    template: `
      <template>
        <vin-checkboxgroup v-model="checkboxgroup1">
          <vin-checkbox label="1">组合复选框</vin-checkbox>
          <vin-checkbox label="2">组合复选框</vin-checkbox>
          <vin-checkbox label="3">组合复选框</vin-checkbox>
          <vin-checkbox label="4">组合复选框</vin-checkbox>
        </vin-checkboxgroup>
      </template>
    `,
    setup() {
      const state = reactive({
        checkboxgroup1: [],
      });
      return { ...toRefs(state) };
    },
  });

  const items = wrapper.findAll('.vin-checkbox');

  await items[0].trigger('click');
  expect(wrapper.vm.checkboxgroup1).toEqual(['1']);
});

test('checkbox-group disabled test', async () => {
  const wrapper = mount({
    components: {
      'vin-checkboxgroup': Checkboxgroup,
      'vin-checkbox': Checkbox,
    },
    template: `
      <template>
        <vin-checkboxgroup v-model="checkboxgroup1" disabled>
          <vin-checkbox label="1">组合复选框</vin-checkbox>
          <vin-checkbox label="2">组合复选框</vin-checkbox>
          <vin-checkbox label="3">组合复选框</vin-checkbox>
          <vin-checkbox label="4">组合复选框</vin-checkbox>
        </vin-checkboxgroup>
      </template>
    `,
    setup() {
      const state = reactive({
        checkboxgroup1: [],
      });
      return { ...toRefs(state) };
    },
  });

  const items = wrapper.findAll('.vin-checkbox');

  await items[0].trigger('click');
  expect(wrapper.vm.checkboxgroup1).toEqual([]);
  expect(wrapper.find('.vin-checkbox__icon--disable')).toBeTruthy();
});

// test('checkbox-group change event test',async () => {
//   const wrapper = mount({
//     components: {
//       'vin-checkboxgroup': Checkboxgroup,
//       'vin-checkbox': Checkbox
//     },
//     template: `
//       <template>
//         <vin-checkboxgroup v-model="checkboxgroup1" @change="">
//           <vin-checkbox label="1">组合复选框</vin-checkbox>
//           <vin-checkbox label="2">组合复选框</vin-checkbox>
//           <vin-checkbox label="3">组合复选框</vin-checkbox>
//           <vin-checkbox label="4">组合复选框</vin-checkbox>
//         </vin-checkboxgroup>
//       </template>
//     `,
//     setup() {
//       const state = reactive({
//         checkboxgroup1: [],
//       });
//       return { ...toRefs(state) };
//     }
//   });

//   const items = wrapper.findAll('.vin-checkbox');

//   await items[0].trigger('click');
//   // expect(wrapper.vm.checkboxgroup1).toEqual(['1']);
//   expect(wrapper.emitted('change')![0]).toEqual(['1']);
// });
