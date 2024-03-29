# Toast 吐司

### 介绍

用于轻提示。

### 基本用法

```html
<vin-toast
  :msg="page.state.msg"
  v-model:visible="page.state.show"
  :type="page.state.type"
  @closed="page.methods.onClosed"
  :cover="page.state.cover"
/>
<vin-cell
  title="Text 文字提示"
  is-link
  @click="page.methods.openToast('text','网络失败，请稍后再试~')"
></vin-cell>
<vin-cell
  title="Title 标题文字"
  is-link
  @click="page.methods.openToast('text', '网络失败，请稍后再试~',false,'标题文字')"
></vin-cell>
<vin-cell
  title="Text 自定义位置"
  is-link
  @click="page.methods.openToast('text', '自定义位置',false,'','20%',false)"
></vin-cell>
<vin-cell
  title="Success 成功提示"
  is-link
  @click="page.methods.openToast('success','成功提示')"
></vin-cell>
<vin-cell
  title="Error 失败提示"
  is-link
  @click="page.methods.openToast('fail','失败提示')"
></vin-cell>
<vin-cell
  title="Warning 警告提示"
  is-link
  @click="page.methods.openToast('warn','警告提示')"
></vin-cell>
<vin-cell
  title="Loading 加载提示"
  is-link
  @click="page.methods.openToast('loading','加载中')"
></vin-cell>
<vin-cell
  title="Loading 带白色背景遮罩"
  is-link
  @click="page.methods.openToast('loading','加载中',true)"
></vin-cell>
```

```javascript
import { reactive } from 'vue';
export default {
  setup() {
    const page = {
      state: reactive({
        msg: 'toast',
        type: 'text',
        show: false,
        cover: false,
        title: '',
        bottom: '',
        center: true,
      }),
      methods: {
        openToast: (type: string, msg: string, cover: boolean = false) => {
          page.state.show = true;
          page.state.msg = msg;
          page.state.type = type;
          page.state.cover = cover;
          page.state.title = title;
          page.state.bottom = bottom;
          page.state.center = center;
        },
        onClosed: () => console.log('closed'),
      },
    };
    return {
      page,
    };
  },
};
```

## Props

| 字段                   | 说明                                                                      | 类型         | 默认值                           |
| ---------------------- | ------------------------------------------------------------------------- | ------------ | -------------------------------- | --- | ------------------------------------------------ | ------ | --- |
| msg                    | 消息文本内容,支持传入 HTML                                                | String/VNode | ""                               |
| duration               | 展示时长（毫秒）<br>值为 0 时，toast 不会自动消失（loading 类型默认为 0） | Number       | 2000                             |
| title                  | 标题                                                                      | String       | ''                               |
| center                 | 是否展示在页面中部（为 false 时展示在底部）                               | Boolean      | true                             |
| bottom                 | 距页面底部的距离（像素或者百分比），option.center 为 false 时生效         | String       | "30px"                           |     | 距页面底部的距离（像素），center 为 false 时生效 | Number | 30  |
| text-align-center      | 多行文案是否居中                                                          | Boolean      | true                             |
| bg-color               | 背景颜色（透明度）                                                        | String       | "rgba(0, 0, 0, 0.8)"             |
| custom-class           | 自定义类名                                                                | String       | ""                               |
| icon                   | 自定义图标，**对应 icon 组件，支持图片链接**                              | String       | ""                               |
| icon-size              | 自定义图标大小                                                            | String       | "20"                             |
| size                   | 文案尺寸，**small**/**base**/**large**三选一                              | String       | "base"                           |
| cover                  | 是否显示遮罩层，loading 类型默认显示                                      | Boolean      | loading 类型 true/其他类型 false |
| cover-color            | 遮罩层颜色，默认透明                                                      | String       | "rgba(0,0,0,0)"                  |
| loading-rotate         | loading 图标是否旋转，仅对 loading 类型生效                               | Boolean      | true                             |
| on-close               | 关闭时触发的事件                                                          | function     | null                             |
| close-on-click-overlay | 是否在点击遮罩层后关闭提示                                                | Boolean      | false                            |
| toast-style            | 提示框 style                                                              | object       | {}                               |
| toast-class            | 提示框 class                                                              | String       | ""                               |
| type                   | 弹框类型 可选值（text、success、fail、warn、loading）                     | String       | ""                               |
