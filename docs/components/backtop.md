# BackTop 返回顶部

### 介绍

提供较长的页面快捷返回顶部功能。

### 基本用法

```html
<vin-backtop height="100vh">
  <template v-slot:content>
    <view class="text-data">我是测试数据1</view>
    <view class="text-data">我是测试数据2</view>
    <view class="text-data">我是测试数据3</view>
    <view class="text-data">我是测试数据4</view>
    <view class="text-data">我是测试数据5</view>
    <view class="text-data">我是测试数据6</view>
    ...
  </template>
</vin-backtop>
```

### 设置出现位置

```html
<vin-backtop :distance="200"></vin-backtop>
```

### 自定义样式

```html
<vin-backtop :distance="100" :bottom="90"><view>自定义内容</view></vin-backtop>
```

### click 事件

```html
<vin-backtop @click="handleClick"></vin-backtop>
```

```html
<script>
  export default createDemo({
    setup(props, { emit }) {
      const handleClick = () => {
        console.log('触发返回顶部');
      };

      return {
        handleClick,
      };
    },
  });
</script>
```

### API

### Prop

| 字段     | 说明                   | 类型   | 默认值  |
| -------- | ---------------------- | ------ | ------- |
| height   | 滚动区域的高度         | String | `100vh` |
| bottom   | 距离页面底部距离       | Number | `20`    |
| right    | 距离页面右侧距离       | Number | `10`    |
| distance | 页面垂直滚动多高后出现 | Number | `200`   |
| z-index  | 设置组件页面层级       | Number | `10`    |

### Event

| 名称  | 说明               | 回调参数          |
| ----- | ------------------ | ----------------- |
| click | 按钮点击时触发事件 | event: MouseEvent |
