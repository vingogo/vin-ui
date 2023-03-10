import { config, DOMWrapper, mount } from '@vue/test-utils';
import { nextTick, toRefs, ref, reactive } from 'vue';
import Form from '../index.vue';
import VinCellGroup from '../../cell-group/index.vue';
import FormItem from '../../form-item/index.vue';
import VinCell from '../../cell/index.vue';
import VinIcon from '../../icon/index.vue';
import VinButton from '../../button/index.vue';
import VinTextarea from '../../textarea/index.vue';
import VinSwitch from '../../switch/index.vue';
import VinCheckbox from '../../checkbox/index.vue';
// import VinRadio from '../../radio/index.vue';
// import VinRadioGroup from '../../radiogroup/index.vue';
import VinRate from '../../rate/index.vue';
import VinInputNumber from '../../input-number/index.vue';
import VinRange from '../../range/index.vue';
// import VinUploader from '../../uploader/index.vue';
// import VinAddress from '../../address/index.vue';
// import VinElevator from '../../elevator/index.vue';
import VinProgress from '../../progress/index.vue';
import VinPopup from '../../popup/index.vue';

beforeAll(() => {
  config.global.components = {
    VinCellGroup,
    FormItem,
    VinCell,
    VinIcon,
    VinButton,
    VinTextarea,
    VinSwitch,
    VinCheckbox,
    // VinRadio,
    // VinRadioGroup,
    VinRate,
    VinInputNumber,
    VinRange,
    // VinUploader,
    // VinAddress,
    // VinElevator,
    VinProgress,
    VinPopup,
  };
});

afterAll(() => {
  config.global.components = {};
});

describe('Form', () => {
  test('base Form', () => {
    const wrapper = mount(Form);
    const rate = wrapper.find('.vin-form');
    expect(rate.exists()).toBe(true);
  });

  test('base Form usage', async () => {
    const wrapper = mount({
      components: {
        'vin-form': Form,
        'vin-form-item': FormItem,
      },
      template: `
      <vin-form>
        <vin-form-item label="姓名">
          <input class="vin-input-text" placeholder="请输入姓名" type="text" />
        </vin-form-item>
        <vin-form-item label="年龄">
          <input class="vin-input-text" placeholder="请输入年龄" type="text" />
        </vin-form-item>
        <vin-form-item label="联系电话">
          <input class="vin-input-text" placeholder="请输入联系电话" type="text" />
        </vin-form-item>
        <vin-form-item label="地址">
          <input class="vin-input-text" placeholder="请输入地址" type="text" />
        </vin-form-item>
        <vin-form-item label="备注">
          <vin-textarea placeholder="请输入备注" type="text" />
        </vin-form-item>
      </vin-form>
      `,
    });
    await nextTick();
    const form = wrapper.find('.vin-cell-group__warp');
    expect(form.exists()).toBe(true);
    const formitem = wrapper.findAll('.vin-form-item');
    expect(formitem.length).toBe(5);
  });

  test('base Dynamic Form', async () => {
    const wrapper = mount({
      components: {
        'vin-form': Form,
        'vin-form-item': FormItem,
      },
      template: `
      <vin-form :model-value="dynamicForm.state" ref="dynamicRefForm">
        <vin-form-item label="姓名" :show-error-message="false" :show-error-line="false" error-message-align="center" body-align="center" label-width="90px" prop="name" required :rules="[{ required: true, message: '请填写姓名' }]">
          <input class="vin-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
        </vin-form-item>
        <vin-form-item
          :label="'联系方式' + index"
          :prop="'tels.' + index + '.value'"
          required
          :rules="[{ required: true, message: '请填写联系方式' + index }]"
          :key="item.key"
          v-for="(item, index) in dynamicForm.state.tels"
        >
          <input class="vin-input-text" v-model="item.value" :placeholder="'请输入联系方式' + index" type="text" />
        </vin-form-item>
        <vin-cell>
          <vin-button class="add" size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</vin-button>
          <vin-button class="remove" size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</vin-button>
          <vin-button class="submit" type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit"
            >提交
          </vin-button>
          <vin-button class="reset" size="small" @click="dynamicForm.methods.reset">重置提示状态</vin-button>
        </vin-cell>
      </vin-form>
      `,
      setup() {
        const dynamicRefForm = ref<any>(null);
        const dynamicForm = {
          state: reactive({
            name: '',
            tels: new Array({
              key: 1,
              value: '',
            }),
          }),
          methods: {
            submit() {
              dynamicRefForm.value.validate().then(({ valid, errors }: any) => {
                if (valid) {
                  // console.log('success', dynamicForm);
                } else {
                  // console.log('error submit!!', errors);
                }
              });
            },
            reset() {
              dynamicRefForm.value.reset();
            },
            remove() {
              dynamicForm.state.tels.splice(dynamicForm.state.tels.length - 1, 1);
            },
            add() {
              const newIndex = dynamicForm.state.tels.length;
              dynamicForm.state.tels.push({
                key: Date.now(),
                value: '',
              });
            },
          },
        };
        return {
          dynamicForm,
          dynamicRefForm,
        };
      },
    });
    await nextTick();
    const formitem = wrapper.findAll('.vin-form-item');
    expect(formitem.length).toBe(2);
    const form1 = wrapper.find('.vin-cell__title');
    expect(form1.classes()).toContain('required');
    expect((form1.element as HTMLElement).style.textAlign).toEqual('');
    expect((form1.element as HTMLElement).style.width).toEqual('90px');
    const form2 = wrapper.find('.vin-form-item__body__slots');
    expect((form2.element as HTMLElement).style.textAlign).toEqual('center');
    const form4 = wrapper.find('.submit');
    form4.trigger('click');
    await nextTick();
    const form3 = wrapper.find('.vin-form-item__body__tips');
    expect(form3.exists()).toBe(true);
    const form5 = wrapper.find('.vin-form-item.error.line::before');
    expect(form5.exists()).toBe(false);
    await nextTick();
    const form6 = wrapper.find('.add');
    form6.trigger('click');
    setTimeout(() => {
      expect(formitem.length).toBe(3);
    }, 0);
    const form7 = wrapper.find('.remove');
    form7.trigger('click');
    setTimeout(() => {
      expect(formitem.length).toBe(1);
    }, 0);
    const form8 = wrapper.find('.reset');
    form8.trigger('click');
    setTimeout(() => {
      expect(form3.exists()).toBe(false);
    }, 0);
  });

  test('base Form verification', async () => {
    const wrapper = mount({
      components: {
        'vin-form': Form,
        'vin-form-item': FormItem,
      },
      template: `
      <vin-form :model-value="formData" ref="ruleForm">
        <vin-form-item label="姓名" prop="name" required :rules="[{ required: true, message: '请填写姓名' }]">
          <input
            class="vin-input-text"
            v-model="formData.name"
            placeholder="请输入姓名，blur 事件校验"
            type="text"
          />
        </vin-form-item>
        <vin-cell>
          <vin-button class="submit" type="primary" size="small" style="margin-right: 10px" @click="submit">提交</vin-button>
          <vin-button class="resets" size="small" @click="reset">重置提示状态</vin-button>
        </vin-cell>
      </vin-form>
      `,
      setup() {
        const formData = reactive({
          name: '',
        });
        const ruleForm = ref<any>(null);
        const submit = () => {
          ruleForm.value.validate().then(({ valid, errors }: any) => {
            if (valid) {
              // console.log('success', formData);
            } else {
              // console.log('error submit!!!', errors);
            }
          });
        };
        const reset = () => {
          ruleForm.value.reset();
        };
        return {
          ruleForm,
          formData,
          submit,
          reset,
        };
      },
    });

    // .vin-input-text
    const formitem: DOMWrapper<Element> = wrapper.find('.vin-input-text');
    expect(formitem.exists()).toBe(true);
    expect(formitem.attributes().type).toBe('text');
    const formitem2: DOMWrapper<Element> = wrapper.find('.vin-form-item__body__tips');
    const formitem3: DOMWrapper<Element> = wrapper.find('.submit');
    formitem3.trigger('click');
    await nextTick();
    expect(formitem3.exists()).toBe(true);
    const formitem1: DOMWrapper<Element> = wrapper.find('.resets');

    formitem1.trigger('click');
    expect(formitem2.exists()).toBe(false);
  });

  test('base Form Type', async () => {
    const wrapper = mount({
      components: {
        'vin-form': Form,
        'vin-form-item': FormItem,
      },
      template: `
      <vin-form>
      <vin-form-item label="开关">
        <vin-switch v-model="formData2.switch"></vin-switch>
      </vin-form-item>
      <vin-form-item label="复选框">
        <vin-checkbox v-model="formData2.checkbox">复选框</vin-checkbox>
      </vin-form-item>
      <vin-form-item label="评分">
        <vin-rate v-model="formData2.rate" />
      </vin-form-item>
      <vin-form-item label="步进器">
        <vin-input-number v-model="formData2.number" />
      </vin-form-item>
      <vin-form-item label="滑块">
        <vin-range hidden-tag v-model="formData2.range"></vin-range>
      </vin-form-item>
      <vin-form-item label="文件上传">
        <vin-uploader url="http://服务地址" v-model:file-list="formData2.defaultFileList" maximum="3" multiple>
        </vin-uploader>
      </vin-form-item>
      <vin-form-item label="地址">
        <input
          class="vin-input-text"
          v-model="formData2.address"
          readonly
          placeholder="请选择地址"
          type="text"
        />
        <!-- Vin-address -->
        <vin-address
          v-model:visible="addressModule.state.show"
          :province="addressModule.state.province"
          :city="addressModule.state.city"
          :country="addressModule.state.country"
          :town="addressModule.state.town"
          custom-address-title="请选择所在地区"
        ></vin-address>
      </vin-form-item>
    </vin-form>
      `,
      setup() {
        const formData2 = reactive({
          switch: false,
          checkbox: false,
          radio: 0,
          number: 0,
          rate: 3,
          range: 30,
          address: '',
          defaultFileList: [
            {
              name: '文件1.png',
              url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
              status: 'success',
              message: '上传成功',
              type: 'image',
            },
            {
              name: '文件2.png',
              url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
              status: 'uploading',
              message: '上传中...',
              type: 'image',
            },
          ],
        });

        const addressModule = reactive({
          state: {
            show: false,
            province: [
              { id: 1, name: '北京' },
              { id: 2, name: '广西' },
              { id: 3, name: '江西' },
              { id: 4, name: '四川' },
            ],
            city: [
              { id: 7, name: '朝阳区' },
              { id: 8, name: '崇文区' },
              { id: 9, name: '昌平区' },
              { id: 6, name: '石景山区' },
            ],
            country: [
              { id: 3, name: '八里庄街道' },
              { id: 9, name: '北苑' },
              { id: 4, name: '常营乡' },
            ],
            town: [],
          },
        });
        return {
          formData2,
          addressModule,
        };
      },
    });
    await nextTick();
    const formitem = wrapper.findAll('.vin-form-item');
    expect(formitem.length).toBe(7);
    const formitem1 = wrapper.find('.vin-switch');
    expect(formitem1.exists()).toBe(true);
    const formitem2 = wrapper.find('.vin-checkbox');
    expect(formitem2.exists()).toBe(true);
    const formitem3 = wrapper.find('.vin-rate');
    expect(formitem3.exists()).toBe(true);
    const formitem4 = wrapper.find('.vin-input-number');
    expect(formitem4.exists()).toBe(true);
    const formitem5 = wrapper.find('.vin-range');
    expect(formitem5.exists()).toBe(true);
    // const formitem6 = wrapper.find('.vin-uploader');
    // expect(formitem6.exists()).toBe(true);
  });
});
