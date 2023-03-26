import type { ExtractPropTypes } from 'vue';
import { commonProps } from '../common';

export const AVATAR_KEY = Symbol('avatarGroup');

export const avatarProps = {
  ...commonProps,
  size: {
    type: String,
    default: '',
  },
  shape: {
    type: String,
    default: 'round',
  },
  bgColor: {
    type: String,
    default: '#eee',
  },
  color: {
    type: String,
    default: '#666',
  },
  url: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
};

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;
