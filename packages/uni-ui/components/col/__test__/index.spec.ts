import { mount } from '@vue/test-utils';
import Col from '../index.vue';
import Row from '../../row/index.vue';

// 测试用例
test('should render Col correctly and should render gutter correctly', async () => {
  const wrapper = mount({
    components: {
      Row,
      Col,
    },
    template: `
      <Row gutter="6">
        <Col span="8">8</Col>
        <Col span="8">8</Col>
        <Col span="8">8</Col>
      </Row>
    `,
  });
  expect(wrapper.html()).toMatchSnapshot();
});
