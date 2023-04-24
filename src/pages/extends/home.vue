<template>
  <view class="demo home demo-home">
    <view class="demo-home__header">
      <text class="demo-home__title">Vin UI</text>
      <text class="demo-home__slogan">轻量、快速的多平台开发UI组件库</text>
    </view>

    <view class="container">
      <block v-for="(nav, navindex) in nav" :key="navindex">
        <view class="demo-title heading-2">{{ nav.title }}</view>
        <view class="cols-2">
          <view class="item" v-for="(item, index) in nav.subnav" :key="index">
            <Card :data="item"></Card>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import Card from '@/components/card.vue';
import config from '../../../config.json';

export default {
  components: {
    Card,
  },
  setup() {
    return {
      nav: [
        {
          title: '拓展样式',
          subnav: [
            {
              path: '/pages/extends/background',
              name: 'background',
              title: '背景',
            },
            {
              path: '/pages/extends/text',
              name: 'text',
              title: '文本',
            },
            {
              path: '/pages/icon/index',
              name: 'icon',
              title: '图标',
            },
            {
              path: '/pages/extends/shadow',
              name: 'shadow',
              title: '阴影',
            },
            {
              path: '/pages/extends/border',
              name: 'border',
              title: '边框',
            },
          ],
        },
        ...config.list.map((item) => {
          return {
            title: item.name,
            subnav: item.components.map((comp) => {
              return {
                path: `/pages/${comp.name.toLocaleLowerCase()}/index`,
                name: comp.name,
                title: comp.desc,
              };
            }),
          };
        }),
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$desc-text-color: #909ca4;

.demo-home {
  min-height: 10vh;
  padding: 30px 20px 20px;
  color: #fff;
  background-color: #fff;
  background-image: url('https://cdn.vingogo.cn/ui-bg.png');
  background-repeat: no-repeat;
  background-size: contain;

  &__header {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 32px;
    text-align: center;
    margin-top: 25px;
  }

  &__title {
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
  }

  &__slogan {
    margin-top: 10px;
    font-size: 14px;
  }
}

.container {
  margin-top: 30px;
}

.home {
  padding: 15px 5px 15px;

  .demo-title {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.cols-2 {
  display: flex;
  flex-wrap: wrap;

  .item {
    box-sizing: border-box;
    width: calc(100% / 2);
    padding: 10px;
  }
}
</style>
