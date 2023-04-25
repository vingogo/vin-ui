<template>
  <demo-page-layout title="背景">
    <!-- 简介 -->
    <view class="demo-title heading-2">简介</view>
    <view class="paragraph">
      容器的背景表现, class 控制。一些组件包含了通用属性
      <text class="code">bg</text>
      也是用的这些类。
    </view>

    <!-- 基础背景色 -->
    <view class="demo-title heading-2">基础背景色</view>
    <view class="paragraph">
      <text class="code">.bg-{color}</text>
      基础的背景颜色。
    </view>

    <view class="card-box bg-white">
      <view class="card-item__wrapper" v-for="(item, index) in color" :key="index">
        <view :class="'bg-' + item.name" class="card-item">
          <view class="text-xl card-item__desc">{{ item.desc }}</view>
          <view class="text-sm card-item__value">
            <text class="text-ABC">#{{ item.value }}</text>
            <text>.bg-{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 淡色背景 -->
    <view class="demo-title heading-2">淡色背景</view>
    <view class="paragraph">
      <text class="code">.bg-{color}-thin</text>
      更浅的颜色。为适应暗色主题,注意有透明度！
    </view>

    <view class="card-box">
      <view class="card-item__wrapper" v-for="(item, index) in color" :key="index">
        <view :class="`bg-${item.name}-thin`" class="card-item">
          <view class="text-xl card-item__desc">{{ item.desc }}</view>
          <view class="text-sm card-item__value">
            <text>.bg-{{ item.name }}-thin</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 渐变背景色 -->
    <view class="demo-title heading-2">过渡渐变色</view>
    <view class="paragraph">
      <text class="code">.bg-{color}-{color}</text>
      支持所有基础色到基础色的渐变。
    </view>

    <view class="demo-title heading-2">特殊的渐变背景色</view>
    <view class="paragraph">
      <text class="code">.bg-{color}-gradient</text>
      精心调整的色值，更加自然的过渡色。
    </view>

    <view class="card-box">
      <view class="card-item__wrapper" v-for="(item, index) in color" :key="index">
        <view :class="`bg-${item.name}-gradient`" class="card-item">
          <view class="text-xl card-item__desc">{{ item.desc }}</view>
          <view class="text-sm card-item__value">
            <text>.bg-{{ item.name }}-gradient</text>
          </view>
        </view>
      </view>
    </view>

    <view class="paragraph">
      <view class="demo-title heading-2">高亮色</view>
      <text class="code">.bg-{color}-light</text>
      带有一定色彩的高亮背景。在深浅主题下保持一致。
    </view>

    <view class="card-box">
      <view class="card-item__wrapper" v-for="(item, index) in color" :key="index">
        <view :class="`bg-${item.name}-light`" class="card-item">
          <view class="text-xl card-item__desc">{{ item.desc }}</view>
          <view class="text-sm card-item__value">
            <text>.bg-{{ item.name }}-light</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 灰度背景色 -->
    <view class="demo-title heading-2">浅色灰度值</view>

    <view class="paragraph">
      <text class="code">.bg-{gray}</text>
      <text class="code">#aaaaaa</text>~<text class="code">#ffffff</text>
      的浅色灰度值
    </view>

    <view class="card-box">
      <view class="card-item__wrapper" v-for="(item, index) in gray" :key="index">
        <view :class="`bg-${item.name}`" class="card-item">
          {{ item.name }}
        </view>
      </view>
    </view>

    <view class="demo-title heading-2">深色灰度值</view>
    <view class="paragraph">
      <text class="code">.bg-{dark}</text>
      <text class="code">#999999</text>~<text class="code">#000000</text>
      的深色灰度值
    </view>

    <view class="card-box">
      <view class="card-item__wrapper" v-for="(item, index) in dark" :key="index">
        <view :class="`bg-${item.name}`" class="card-item">
          {{ item.name }}
        </view>
      </view>
    </view>
  </demo-page-layout>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      color: [
        { name: 'yellow', value: 'fbbd08', desc: '明黄' },
        { name: 'orange', value: 'f37b1d', desc: '橘橙' },
        { name: 'red', value: 'e54d42', desc: '嫣红' },
        { name: 'pink', value: 'e03997', desc: '桃粉' },
        { name: 'mauve', value: 'b745cb', desc: '木槿' },
        { name: 'purple', value: '905ddf', desc: '姹紫' },
        { name: 'blue', value: '0081ff', desc: '海蓝' },
        { name: 'cyan', value: '1cbbb4', desc: '天青' },
        { name: 'green', value: '3eb93b', desc: '森绿' },
        { name: 'olive', value: '8dc63f', desc: '橄榄' },
        { name: 'grey', value: '8799a3', desc: '玄灰' },
        { name: 'brown', value: 'a5673f', desc: '棕褐' },
      ],
      gray: [
        { name: 'white', value: 'ffffff' },
        { name: 'gray-f', value: 'f8f9fa' },
        { name: 'gray-e', value: 'eeeeee' },
        { name: 'gray-d', value: 'dddddd' },
        { name: 'gray-c', value: 'cccccc' },
        { name: 'gray-b', value: 'bbbbbb' },
        { name: 'gray-a', value: 'aaaaaa' },
      ],
      dark: [
        { name: 'dark-9', value: '999999' },
        { name: 'dark-8', value: '888888' },
        { name: 'dark-7', value: '777777' },
        { name: 'dark-6', value: '666666' },
        { name: 'dark-5', value: '555555' },
        { name: 'dark-4', value: '444444' },
        { name: 'dark-3', value: '333333' },
        { name: 'dark-2', value: '222222' },
        { name: 'dark-1', value: '111111' },
        { name: 'black', value: '000000' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  border-radius: 5px;
  color: #303030;

  .card-item {
    padding: 15px;
    border-radius: 5px;

    &__wrapper {
      box-sizing: border-box;
      width: 50%;
      padding: 10px;
    }

    &__desc {
      padding-bottom: 10px;
    }

    &__value {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
