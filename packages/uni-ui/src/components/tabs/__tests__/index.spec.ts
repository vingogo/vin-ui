import { config, DOMWrapper, mount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import Tabs from '../index.vue';
import TabPane from '../../tabpane/index.vue';
import VinIcon from '../../icon/index.vue';

beforeAll(() => {
  config.global.components = {
    VinIcon,
  };
});

afterAll(() => {
  config.global.components = {};
});

test('base Tabs', () => {
  const wrapper = mount(Tabs);
  const rate = wrapper.find('.vin-tabs');
  expect(rate.exists()).toBe(true);
});

test('base tabs props', async () => {
  const wrapper = mount(Tabs, {
    props: {
      modelValue: '0',
      background: '#f5f5f5',
      color: '#f5f5f5',
      direction: 'horizontal',
      type: 'smile',
      size: 'large',
      'title-scroll': true,
    },
    components: {
      'vin-tabs': Tabs,
      'vin-tabpane': TabPane,
    },
  });
  await nextTick();
  const stepItem = wrapper.find('.vin-tabs__titles');
  expect((stepItem.element as HTMLElement).style.background).toEqual('rgb(245, 245, 245)');
  const item = wrapper.findAll('.horizontal');
  expect(item.length).toBe(1);
  const item1 = wrapper.findAll('.vin-tabs__titles')[0];
  expect(item1.classes()).toContain('smile');
  const item2 = wrapper.findAll('.vin-tabs__titles')[0];
  expect(item2.classes()).toContain('large');
  const item3 = wrapper.findAll('.vin-tabs__titles')[0];
  expect(item3.classes()).toContain('scrollable');
});

test('base other props', async () => {
  const wrapper = mount(Tabs, {
    props: {
      'animated-time': 500,
      'title-gutter': '20px',
    },
    components: {
      'vin-tabs': Tabs,
      'vin-tabpane': TabPane,
    },
  });
  await nextTick();
  const stepItem = wrapper.find('.vin-tabs__content');
  expect((stepItem.element as HTMLElement).style.transitionDuration).toEqual('500ms');
  setTimeout(() => {
    const stepItem1 = wrapper.find('.vin-tabs__titles-item');
    expect((stepItem1.element as HTMLElement).style.marginLeft).toEqual('20px');
  }, 0);
});

test('base Tabs Slots', async () => {
  const wrapper = mount({
    components: {
      'vin-tabs': Tabs,
      'vin-tabpane': TabPane,
    },
    template: `
    <vin-tabs v-model="state.tab7value">
      <template v-slot:titles>
        <view
          class="vin-tabs__titles-item"
          @click="state.tab7value = item.paneKey"
          :class="{ active: state.tab7value == item.paneKey }"
          :key="item.paneKey"
          v-for="item in state.list6"
        >
          <vin-icon v-if="item.icon" :name="item.icon" />
          <span class="vin-tabs__titles-item__text">{{ item.title }}</span>
          <span class="vin-tabs__titles-item__line"></span>
        </view>
      </template>
      <vin-tabpane v-for="item in state.list6" :pane-key="item.paneKey">
        {{ item.title }}
      </vin-tabpane>
    </vin-tabs>
    `,
    setup() {
      const state = reactive({
        tab7value: 'c1',
        list6: [
          {
            title: '自定义 1',
            paneKey: 'c1',
            icon: 'fabulous',
          },
          {
            title: '自定义 2',
            paneKey: 'c2',
            icon: 'Vin',
          },
          {
            title: '自定义 3',
            paneKey: 'c3',
          },
        ],
      });
      return { state };
    },
  });
  await nextTick();
  const tab1 = wrapper.find('.vin-tabs__titles');
  expect(tab1.exists()).toBe(true);
  const tab2 = wrapper.findAll('.vin-tabs__titles-item');
  expect(tab2.length).toBe(3);
  const tab3 = wrapper.findAll('.vin-tabs__titles-item__text');
  expect(tab3[0].html()).toContain('自定义 1');
  expect(tab3[1].html()).toContain('自定义 2');
  expect(tab3[2].html()).toContain('自定义 3');
  const tab4 = wrapper.find('.vin-tabs__content');
  expect(tab4.exists()).toBe(true);
});

test('base Tabpane Props', async () => {
  const wrapper = mount({
    components: {
      'vin-tabs': Tabs,
      'vin-tabpane': TabPane,
    },
    template: `
    <vin-tabs v-model="state.tab2value">
      <vin-tabpane title="Tab 1" pane-key="0"> </vin-tabpane>
      <vin-tabpane title="Tab 2" pane-key="1" :disabled="true"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3" pane-key="2"> Tab 3 </vin-tabpane>
    </vin-tabs>
    `,
    setup() {
      const state = reactive({
        tab2value: '0',
      });
      return { state };
    },
  });
  await nextTick();
  const tab = wrapper.findAll('.vin-tabs__titles-item');
  expect(tab.length).toBe(3);
  const tab1 = wrapper.findAll('.vin-tabs__titles-item')[1];
  expect(tab1.classes()).toContain('disabled');
  const tab2 = wrapper.findAll('.vin-tabs__titles-item')[0];
  expect(tab2.classes()).toContain('active');
  const tab3 = wrapper.findAll('.vin-tabs__titles-item__text');
  expect(tab3[0].html()).toContain('Tab 1');
});

test('base click', async () => {
  const wrapper = mount({
    components: {
      'vin-tabs': Tabs,
      'vin-tabpane': TabPane,
    },
    template: `
    <vin-tabs v-model="state.tab1value">
      <vin-tabpane title="Tab 1"> Tab 1 </vin-tabpane>
      <vin-tabpane title="Tab 2"> Tab 2 </vin-tabpane>
      <vin-tabpane title="Tab 3"> Tab 3 </vin-tabpane>
    </vin-tabs>
    `,
    setup() {
      const state = reactive({
        tab1value: 0,
      });
      return { state };
    },
  });
  await nextTick();
  const tab = wrapper.find('.vin-tabs__titles-item');
  expect(tab.classes()).toContain('active');
  tab.trigger('click');
  const tab1 = wrapper.find('.vin-tabs__content');
  expect((tab1.element as HTMLElement).style.transform).toEqual('translate3d(-0%, 0, 0)');
});
