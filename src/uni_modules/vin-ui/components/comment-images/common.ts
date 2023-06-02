import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../common';

interface VideosType {
  id: number | string;
  mainUrl: string;
  videoUrl: string;
}

interface ImagesType {
  smallImgUrl: string;
  bigImgUrl: string;
  imgUrl: string;
}

export const commonImagesProps = {
  ...commonProps,
  type: {
    type: String,
    default: 'one', // one multi
  },
  videos: {
    type: Array as PropType<VideosType[]>,
    default: () => [],
  },
  images: {
    type: Array as PropType<ImagesType[]>,
    default: () => [],
  },
};

export type CommonImagesProps = ExtractPropTypes<typeof commonImagesProps>;
