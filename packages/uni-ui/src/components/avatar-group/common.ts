import type { ExtractPropTypes } from 'vue';

export const AVATAR_KEY = Symbol('avatarGroup');

export const avatarGroupProps = {
  maxContent: {
    type: String,
    default: '',
  },
  maxCount: {
    type: [Number, String],
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  shape: {
    type: String,
    default: '',
  },
  maxBgColor: {
    type: String,
    default: '#eee',
  },
  maxColor: {
    type: String,
    default: '#666',
  },
  span: {
    type: String,
    default: '-8',
  },
  zIndex: {
    type: String,
    default: 'left',
  },
};

export type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>;
