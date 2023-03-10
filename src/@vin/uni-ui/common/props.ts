import type { CSSProperties, PropType, ExtractPropTypes } from 'vue';

const commonProps = {
  customClass: {
    type: [String, Array],
    default: '',
  },
  customStyle: {
    type: [String, Object] as PropType<CSSProperties>,
    default: '',
  },
};

export type CommonProps = ExtractPropTypes<typeof commonProps>;

export default commonProps;
