import { config, DOMWrapper, mount } from '@vue/test-utils';
import { nextTick, toRefs, reactive } from 'vue';
import Steps from '../index.vue';
import Step from '../../step/index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    Icon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('should render horizontal class when props direction is to be horizontal', () => {
  const wrapper = mount(Steps, {
    props: {
      direction: 'horizontal',
    },
  });

  expect(wrapper.classes()).toContain('vin-steps-horizontal');
});

test('should first step checked when props current is to be 1', async () => {
  const wrapper = mount({
    components: {
      'vin-steps': Steps,
      'vin-step': Step,
    },
    template: `
      <vin-steps current="1">
        <vin-step title="步骤一">1</vin-step>
        <vin-step title="步骤二">2</vin-step>
        <vin-step title="步骤三">3</vin-step>
      </vin-steps>
    `,
    setup() {},
  });

  await nextTick();

  const stepItem = wrapper.findAll('.vin-step')[0];
  expect(stepItem.classes()).toContain('vin-step-process');
});

test('should render dot class when props progressDot is to be true', async () => {
  const wrapper = mount(Steps, {
    props: {
      progressDot: true,
    },
  });

  expect(wrapper.classes()).toContain('vin-steps-dot');
});

test('step props', async () => {
  const wrapper = mount({
    components: {
      'vin-steps': Steps,
      'vin-step': Step,
    },
    template: `
      <vin-steps>
        <vin-step title="已完成" content="您的订单已经打包完成，商品已发出" icon="service" iconColor="blue" size="14px">1</vin-step>
        <vin-step title="进行中" content="您的订单正在配送途中" icon="people" iconColor="blue" size="14px">2</vin-step>
        <vin-step title="未开始" content="收货地址为：北京市经济技术开发区科创十一街18号院京东大厦" icon="location2" iconColor="blue" size="14px">3</vin-step>
      </vin-steps>
    `,
  });

  await nextTick();

  const stepItemTitle = wrapper.findAll('.vin-step-title')[0];

  expect(stepItemTitle.element.innerHTML).toEqual('<span>已完成</span>');

  const stepItemContent = wrapper.findAll('.vin-step-content')[1];

  expect(stepItemContent.element.innerHTML).toEqual('<span>您的订单正在配送途中</span>');

  const stepItemIcon = wrapper.findAll('.vin-iconfont')[2];
  expect(stepItemIcon.classes()).toContain('vin-icon-location2');
  expect((stepItemIcon.element as HTMLElement).style.color).toEqual('blue');
  expect((stepItemIcon.element as HTMLElement).style.width).toEqual('14px');
});

test('should props current changes when trigger click', async () => {
  const wrapper = mount({
    components: {
      'vin-steps': Steps,
      'vin-step': Step,
      'vin-button': Button,
    },
    template: `
      <vin-steps :current="current">
        <vin-step title="已完成" content="您的订单已经打包完成，商品已发出">1</vin-step>
        <vin-step title="进行中" content="您的订单正在配送途中">2</vin-step>
        <vin-step title="未开始" content="收货地址为：北京市经济技术开发区科创十一街18号院京东大厦">3</vin-step>
      </vin-steps>
      <vin-button @click="handleClick">下一步</vin-button>
    `,
    setup() {
      const state = reactive({
        current: 1,
      });

      const handleClick = () => {
        if (state.current >= 3) {
          state.current = 1;
        } else {
          state.current += 1;
        }
      };

      return { ...toRefs(state), handleClick };
    },
  });

  const button = wrapper.find('.vin-button');
  await button.trigger('click');
  await nextTick();
  expect(wrapper.vm.current).toBe(2);

  const stepItem = wrapper.findAll('.vin-step')[1];
  expect(stepItem.classes()).toContain('vin-step-process');

  await button.trigger('click');
  await nextTick();
  expect(wrapper.vm.current).toBe(3);
});

test('should emited click when step trigger', async () => {
  const wrapper = mount({
    components: {
      'vin-steps': Steps,
      'vin-step': Step,
    },
    template: `
      <vin-steps :current="current">
        <vin-step title="已完成" content="您的订单已经打包完成，商品已发出">1</vin-step>
        <vin-step title="进行中" content="您的订单正在配送途中">2</vin-step>
        <vin-step title="未开始" content="收货地址为：北京市经济技术开发区科创十一街18号院京东大厦">3</vin-step>
      </vin-steps>
    `,
    setup() {
      const state = reactive({
        current: 1,
      });

      return { ...toRefs(state) };
    },
  });

  await nextTick();
  await wrapper.vm.$emit('click-step');
  expect(wrapper.emitted('click-step')).toBeTruthy();
});

test('render step slot', async () => {
  const wrapper = mount({
    components: {
      'vin-steps': Steps,
      'vin-step': Step,
    },
    template: `
      <vin-steps :current="current">
        <vin-step title="已完成" content="您的订单已经打包完成，商品已发出"><template v-slot:title>步骤一</template></vin-step>
        <vin-step title="进行中" content="您的订单正在配送途中">2</vin-step>
        <vin-step title="未开始">
          <template v-slot:content>
            <p>收货地址为：</p>
            <p>北京市经济技术开发区科创十一街18号院京东大厦</p>
          </template>
        </vin-step>
      </vin-steps>
    `,
    setup() {
      const state = reactive({
        current: 1,
      });

      return { ...toRefs(state) };
    },
  });

  expect(wrapper.html()).toContain('步骤一');
  expect(wrapper.html()).toContain('北京市经济技术开发区科创十一街18号院京东大厦');
});
