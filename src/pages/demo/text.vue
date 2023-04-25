<template>
  <demo-page-layout title="文本">
    <!-- 简介 -->
    <view class="demo-title heading-2">简介</view>
    <view class="paragraph">文本字体样式,Class控制。适用于任何组件元素。</view>

    <!-- 尺寸 -->
    <view class="demo-title heading-2">尺寸</view>
    <view class="paragraph">
      添加包含尺寸的Class来控制文字大小。
      <text class="code">.text-{size}</text>
    </view>

    <view class="card-box">
      <view v-for="(item, index) in size" :key="index" class="text-box bg-white">
        <view class="code">{{ item.class }}</view>
        <view :class="item.class">用途：{{ item.info }}</view>
      </view>
    </view>

    <!-- 截断 -->
    <view class="demo-title heading-2">截断</view>
    <view class="paragraph">
      添加
      <text class="code">.text-cut</text>
      来控制段落的截断。
    </view>

    <view class="text-box bg-white text-cut">{{ longText }}</view>

    <view class="paragraph">
      多行截断使用
      <text class="code">.text-linecut-{line}</text>
      支持2~10行的截断，想实现更多行的截断可以试试在行内样式里写
      <text class="code">-webkit-line-clamp: 11;</text>
    </view>

    <view class="text-box bg-white">
      <view class="text-linecut">{{ longText }}</view>
    </view>

    <!-- 对齐 -->
    <view class="demo-title heading-2">对齐</view>
    <view class="paragraph">
      添加
      <text class="code">.text-{ align }</text>
      来控制文本的对齐。
    </view>

    <view>
      <view class="text-box bg-white">
        <view class="text-left">{{ sorttext }}</view>
      </view>
      <view class="text-box bg-white">
        <view class="text-center">{{ sorttext }}</view>
      </view>
      <view class="text-box bg-white">
        <view class="text-right">{{ sorttext }}</view>
      </view>
      <view class="text-box bg-white">
        <view class="text-justify">{{ longText }}</view>
      </view>
      <view class="text-box bg-white">
        <view class="text-justify-line">{{ sorttext }}</view>
      </view>
    </view>
  </demo-page-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('tag');

export default createDemo({
  setup() {
    const size = ref([
      { class: 'text-xs', size: 10, info: '说明文本，标签文字或关注度低的文字', tag: '组件库' },
      {
        class: 'text-sm',
        size: 12,
        info: '页面辅助信息，次级内容等',
      },
      {
        class: 'text-df',
        size: 14,
        info: '页面默认字号，用于摘要或阅读文本',
      },
      {
        class: 'text-lg',
        size: 16,
        info: '页面三级标题，首要层级显示内容',
      },
      {
        class: 'text-xl',
        size: 18,
        info: '页面二级标题，用于结果页等单一信息页',
      },
      {
        class: 'text-xxl',
        size: 22,
        info: '页面一级标题,或者用于金额数字等信息',
      },
      {
        class: 'text-sl',
        size: 40,
        info: '用于较大图标、数字等较大显示',
      },
      {
        class: 'text-xsl',
        size: 60,
        info: '用于超大图标、数字等特大显示',
      },
    ]);
    const longText = ref(
      '发光的翅萤在暮色中翩翩起舞，身后留下夜光残影，但女孩重重地将它们从面前拍走，毫不在意这转瞬即逝的优雅。她双眼垂向地面，踢开一块石头，任其在盘错的树根间跳跃，毫不理会茂密华盖间透过的夕阳。紫夜貂的花瓣缓缓张开，向温润的暮色吐出微光的花粉，但匆匆路过的她却顺手将花茎扭断。'
    );
    const sorttext = ref('我的潜能无穷无尽。休想压住我。');

    return {
      size,
      longText,
      sorttext,
    };
  },
});
</script>

<style lang="scss">
.text-box {
  padding: 10px;
  margin: 15px 0;
  border-radius: 5px;
}
</style>
