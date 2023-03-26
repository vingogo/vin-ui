import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';
import type { FileItem, SizeType, SourceType, AcceptType } from './type';

export const uploaderProps = {
  ...commonProps,
  name: { type: String, default: 'file' },
  url: { type: String, default: '' },
  timeout: { type: Number, default: 1000 * 30 },
  fileList: { type: Array, default: () => [] },
  isPreview: { type: Boolean, default: true },
  listType: { type: String, default: 'picture' },
  isDeletable: { type: Boolean, default: true },
  capture: { type: Array as PropType<SourceType[]>, default: ['album', 'camera'] },
  maximize: { type: [Number, String], default: Number.MAX_VALUE },
  maximum: { type: [Number, String], default: 1 },
  accept: { type: String as PropType<AcceptType>, default: 'image' },
  headers: { type: Object, default: {} },
  data: { type: Object, default: {} },
  uploadIcon: { type: String, default: 'photograph' },
  uploadIconSize: { type: [String, Number], default: '' },
  xhrState: { type: Number, default: 200 },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  autoUpload: { type: Boolean, default: true },
  beforeUpload: {
    type: Function,
    default: null,
  },
  beforeDelete: {
    type: Function,
    default: (file: FileItem, files: FileItem[]) => {
      return true;
    },
  },
  onChange: { type: Function },

  // 当accept为video时生效，是否压缩视频，默认为true（默认 true ）
  compressed: { type: Boolean, default: true },
  // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒（默认 60 ）
  maxDuration: { type: Number, default: 60 },
  // 所选的图片的尺寸, 可选值为original compressed
  sizeType: {
    type: Array as PropType<SizeType[]>,
    default: ['original', 'compressed'],
  },
  // 当accept为video时生效，可选值为back或front
  camera: {
    type: String as PropType<'back' | 'front'>,
    default: 'back',
  },
};

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>;
