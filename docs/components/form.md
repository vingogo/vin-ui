# Form 表单

### 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，需要与 Cell 组件搭配使用。

### 基础用法

```html
<template>
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
</template>
```

### 动态表单

```html
<template>
  <vin-form :model-value="dynamicForm.state" ref="dynamicRefForm">
    <vin-form-item
      label="姓名"
      prop="name"
      required
      :rules="[{ required: true, message: '请填写姓名' }]"
    >
      <input
        class="vin-input-text"
        v-model="dynamicForm.state.name"
        placeholder="请输入姓名"
        type="text"
      />
    </vin-form-item>
    <vin-form-item
      :label="'联系方式'+index"
      :prop="'tels.' + index + '.value'"
      required
      :rules="[{ required: true, message: '请填写联系方式'+index }]"
      :key="item.key"
      v-for="(item,index) in dynamicForm.state.tels"
    >
      <input
        class="vin-input-text"
        v-model="item.value"
        :placeholder="'请输入联系方式'+index"
        type="text"
      />
    </vin-form-item>
    <vin-cell>
      <vin-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add"
        >添加</vin-button
      >
      <vin-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove"
        >删除</vin-button
      >
      <vin-button
        type="primary"
        style="margin-right: 10px"
        size="small"
        @click="dynamicForm.methods.submit"
        >提交</vin-button
      >
      <vin-button size="small" @click="dynamicForm.methods.reset">重置提示状态</vin-button>
    </vin-cell>
  </vin-form>
</template>
<script lang="ts">
  import { ref, reactive } from 'vue';
  export default {
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
                console.log('success', dynamicForm);
              } else {
                console.log('error submit!!', errors);
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
            let newIndex = dynamicForm.state.tels.length;
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
  };
</script>
```

### 表单校验

```html
<template>
  <vin-form :model-value="formData" ref="ruleForm">
    <vin-form-item
      label="姓名"
      prop="name"
      required
      :rules="[{ required: true, message: '请填写姓名' }]"
    >
      <input
        class="vin-input-text"
        @blur="customBlurValidate('name')"
        v-model="formData.name"
        placeholder="请输入姓名，blur 事件校验"
        type="text"
      />
    </vin-form-item>
    <vin-form-item
      label="年龄"
      prop="age"
      required
      :rules="[
      { required: true, message: '请填写年龄' },
      { validator: customValidator, message: '必须输入数字' },
      { regex: /^(\d{1,2}|1\d{2}|200)$/, message: '必须输入0-200区间' }
    ]"
    >
      <input
        class="vin-input-text"
        v-model="formData.age"
        placeholder="请输入年龄，必须数字且0-200区间"
        type="text"
      />
    </vin-form-item>
    <vin-form-item
      label="联系电话"
      prop="tel"
      required
      :rules="[
      { required: true, message: '请填写联系电话' },
      { validator: asyncValidator, message: '电话格式不正确' }
    ]"
    >
      <input
        class="vin-input-text"
        v-model="formData.tel"
        placeholder="请输入联系电话，异步校验电话格式"
        type="text"
      />
    </vin-form-item>
    <vin-form-item
      label="地址"
      prop="address"
      required
      :rules="[{ required: true, message: '请填写地址' }]"
    >
      <input
        class="vin-input-text"
        v-model="formData.address"
        placeholder="请输入地址"
        type="text"
      />
    </vin-form-item>
    <vin-cell>
      <vin-button type="primary" size="small" style="margin-right: 10px" @click="submit"
        >提交</vin-button
      >
      <vin-button size="small" @click="reset">重置提示状态</vin-button>
    </vin-cell>
  </vin-form>
</template>
<script lang="ts">
  import { ref, reactive } from 'vue';
  export default {
    setup() {
      const formData = reactive({
        name: '',
        age: '',
        tel: '',
        address: '',
      });
      const validate = (item: any) => {
        console.log(item);
      };
      const ruleForm = ref<any>(null);

      const submit = () => {
        ruleForm.value.validate().then(({ valid, errors }: any) => {
          if (valid) {
            console.log('success', formData);
          } else {
            console.log('error submit!!', errors);
          }
        });
      };
      const reset = () => {
        ruleForm.value.reset();
      };
      // 失去焦点校验
      const customBlurValidate = (prop: string) => {
        ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
          if (valid) {
            console.log('success', formData);
          } else {
            console.log('error submit!!', errors);
          }
        });
      };
      // 函数校验
      const customValidator = (val: string) => /^\d+$/.test(val);
      // Promise 异步校验
      const asyncValidator = (val: string) => {
        return new Promise((resolve) => {
          Toast.loading('模拟异步验证中...');
          setTimeout(() => {
            Toast.hide();
            resolve(/^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/.test(val));
          }, 1000);
        });
      };
      return {
        ruleForm,
        formData,
        validate,
        customValidator,
        asyncValidator,
        customBlurValidate,
        submit,
        reset,
      };
    },
  };
</script>
```

### 表单类型

```html
<template>
  <vin-form>
    <vin-form-item label="开关">
      <vin-switch v-model="formData2.switch"></vin-switch>
    </vin-form-item>
    <vin-form-item label="复选框">
      <vin-checkbox v-model="formData2.checkbox">复选框</vin-checkbox>
    </vin-form-item>
    <vin-form-item label="单选按钮">
      <vin-radiogroup direction="horizontal" v-model="formData2.radio">
        <vin-radio label="1">选项1</vin-radio>
        <vin-radio disabled label="2">选项2</vin-radio>
        <vin-radio label="3">选项3</vin-radio>
      </vin-radiogroup>
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
      <vin-uploader
        url="http://服务地址"
        v-model:file-list="formData2.defaultFileList"
        maximum="3"
        multiple
      >
      </vin-uploader>
    </vin-form-item>
    <vin-form-item label="地址">
      <input
        class="vin-input-text"
        v-model="formData2.address"
        @click="addressModule.methods.show"
        readonly
        placeholder="请选择地址"
        type="text"
      />
      <!-- vin-address -->
      <vin-address
        v-model:visible="addressModule.state.show"
        :province="addressModule.state.province"
        :city="addressModule.state.city"
        :country="addressModule.state.country"
        :town="addressModule.state.town"
        @change="addressModule.methods.onChange"
        custom-address-title="请选择所在地区"
      ></vin-address>
    </vin-form-item>
  </vin-form>
</template>
<script lang="ts">
  import { ref, reactive } from 'vue';
  export default {
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
            url: 'https://via.placeholder.com/120x120/f87d09/fff?text=Vin+UI',
            status: 'success',
            message: '上传成功',
            type: 'image',
          },
          {
            name: '文件2.png',
            url: 'https://via.placeholder.com/120x120/f87d09/fff?text=Vin+UI',
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
        methods: {
          show() {
            addressModule.state.show = !addressModule.state.show;
            if (addressModule.state.show) {
              formData2.address = '';
            }
          },
          onChange({ custom, next, value }: any) {
            formData2.address += value.name;
            const name = addressModule.state[next];
            if (name.length < 1) {
              addressModule.state.show = false;
            }
          },
        },
      });
      return { formData2, addressModule };
    },
  };
</script>
```

### Form Props

| 参数        | 说明                                 | 类型   | 默认值 |
| ----------- | ------------------------------------ | ------ | ------ |
| model-value | 表单数据对象(使用表单校验时，_必填_) | object |        |

### Form Events

| 事件名   | 说明                       | 回调参数                                                   |
| -------- | -------------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验失败后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### FormItem Props

| 参数                | 说明                                                             | 类型             | 默认值  |
| ------------------- | ---------------------------------------------------------------- | ---------------- | ------- |
| required            | 是否显示必填字段的标签旁边的红色星号                             | boolean          | `false` |
| prop                | 表单域 v-model 字段， 在使用表单校验功能的情况下，该属性是必填的 | string           | -       |
| label-width         | 表单项 label 宽度，默认单位为`px`                                | number \| string | `90px`  |
| label-align         | 表单项 label 对齐方式，可选值为 `center` `right`                 | string           | `left`  |
| body-align          | 输入框对齐方式，可选值为 `center` `right`                        | string           | `left`  |
| rule                | 定义校验规则, 见下方说明                                         | Array            | -       |
| error-message-align | 错误提示文案对齐方式，可选值为 `center` `right`                  | string           | `left`  |
| show-error-line     | 是否在校验不通过时标红输入框                                     | boolean          | `true`  |
| show-error-message  | 是否在校验不通过时在输入框下方展示错误提示                       | boolean          | `true`  |

### FormItem Rule 数据结构

使用 FormItem 的`rules`属性可以定义校验规则，可选属性如下:

| 键名      | 说明                   | 类型                                          |
| --------- | ---------------------- | --------------------------------------------- |
| required  | 是否为必选字段         | boolean                                       |
| message   | 错误提示文案           | string                                        |
| validator | 通过函数进行校验       | (value, rule) => boolean \| string \| Promise |
| regex     | 通过正则表达式进行校验 | RegExp                                        |

### Methods

通过 [ref](https://v3.cn.vuejs.org/api/special-attributes.html#ref) 可以获取到 Form 实例并调用实例方法

| 方法名   | 说明                                                               | 参数                | 返回值  |
| -------- | ------------------------------------------------------------------ | ------------------- | ------- |
| submit   | 提交表单进行校验的方法                                             | -                   | Promise |
| reset    | 清空校验结果                                                       | -                   | -       |
| validate | 用户主动触发校验，用于用户自定义场景时触发，例如 blur、change 事件 | 同 FormItem prop 值 | -       |
