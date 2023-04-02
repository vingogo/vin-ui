# 国际化

## 介绍

`VinUI` 支持多语言，组件默认使用中文。具体可参照以下方式进行国际化设置

## 使用方法

### 多语言切换

VinUI 通过 `Locale` 组件实现多语言支持，使用 `Locale.use` 方法可以切换当前使用的语言。

```js
import { Locale } from '@vingogo/uni-ui';

// 引入英文语言包
import enUS from '@vingogo/uni-ui/lib/locale/lang/en-US';
Locale.use('en-US', enUS);
```

### 覆盖语言包

通过 `Locale.merge` 方法可以实现文案的修改和扩展，示例如下：

```js
import { Locale } from '@vingogo/uni-ui';

Locale.merge('zh-CN', {
  // 将全局 "确认" 修改为 "关闭"
  confirm: '关闭',
  // 修改某个组件内部语言
  shortpassword: {
    title: '请输入密码', // 将 "请输入密码" 修改为 "请输入卡密"
  },
});
```

### 目前支持的语言

| 语言     | 文件名 | 版本     |
| -------- | ------ | -------- |
| 英语     | en-US  | `v0.1.0` |
| 简体中文 | zh-CN  | `v0.1.0` |
| 繁體中文 | zh-TW  | `v0.1.0` |

## 常见问题

### 找不到所需的语言包？

如果上方列表中没有你需要的语言，欢迎给我们提 `Pull Request` 来增加新的语言包。

### 业务代码如何实现国际化？

可以使用 `vue-i18n` 来实现。
