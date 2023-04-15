import { config, mount } from '@vue/test-utils';
import { nextTick, toRefs, reactive } from 'vue';
import VinIcon from '../../icon/index.vue';
import VinRate from '../../rate/index.vue';
import Comment from '../index.vue';
// import { Sku as SkuData, Goods } from '../data';
import CommentData from '../comment_data.json';

beforeAll(() => {
  config.global.components = {
    VinIcon,
    VinRate,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('comment init render', async () => {
  const wrapper = mount(Comment, {
    props: {
      images: CommentData.Comment.images,
      videos: CommentData.Comment.videos,
      info: CommentData.Comment.info,
    },
  });
  await nextTick();
  expect(wrapper.find('.vin-comment__main').exists()).toBeTruthy();
});

test('comment mutli images', async () => {
  const wrapper = mount(Comment, {
    props: {
      headerType: 'complex',
      imagesRows: 'multi',
      images: CommentData.Comment.images,
      videos: CommentData.Comment.videos,
      info: CommentData.Comment.info,
    },
  });
  await nextTick();
  expect(wrapper.find('.vin-comment-images__mask').exists()).toBeTruthy();
});
