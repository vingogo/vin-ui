import { onReady, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

export interface ShareAppMessageOptions {
  title: string;
  path: string;
  imageUrl?: string;
  content?: string;
  desc?: string;
  bgImgUrl?: string;
  query?: string;
  success?: (result?: any) => void;
  fail?: (error?: Error) => void;
  complete?: () => void;
}

export const useShareAppMessage = (options?: Partial<ShareAppMessageOptions>) => {
  onReady(() => {
    onShareAppMessage((): any => {
      const pages = getCurrentPages();
      const currentPageFullpath = pages[0].$page?.fullPath || '/pages/index/index';

      return {
        title: '基于 Vue 3 的轻量、快速的多平台开发 UI 组件库',
        path: currentPageFullpath,
        success: () => {
          // 转发成功
          uni.showToast({
            title: '转发成功',
            icon: 'none',
          });
        },
        fail: () => {
          // 转发失败
          uni.showToast({
            title: '转发失败',
            icon: 'none',
          });
        },
        ...options,
      };
    });
  });
};

export interface ShareTimelineOptions {
  title: string;
  path: string;
  query?: string;
  imageUrl?: string;
  imageUrlId?: string;
  imagePreviewUrl?: string;
  imagePreviewUrlId?: string;
}

export const useShareTimeline = (options?: Partial<ShareTimelineOptions>) => {
  onReady(() => {
    onShareTimeline((): any => {
      const pages = getCurrentPages();
      const currentPageFullpath = pages[0].$page?.fullPath || '/pages/index/index';

      return {
        title: '基于 Vue 3 的轻量、快速的多平台开发 UI 组件库',
        path: currentPageFullpath,
        ...options,
      };
    });
  });
};
