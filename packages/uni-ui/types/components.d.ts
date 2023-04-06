import type { App } from 'vue';

export const version: string;
export const install: (app: App) => void;

declare module 'vue' {
  export interface GlobalComponents {
    VinAvatar: typeof import('@vingogo/uni-ui/components/avatar/index.vue')['default'];
    VinAvatarGroup: typeof import('@vingogo/uni-ui/components/avatar-group/index.vue')['default'];
    VinBacktop: typeof import('@vingogo/uni-ui/components/backtop/index.vue')['default'];
    VinBadge: typeof import('@vingogo/uni-ui/components/badge/index.vue')['default'];
    VinButton: typeof import('@vingogo/uni-ui/components/button/index.vue')['default'];
    VinCalendar: typeof import('@vingogo/uni-ui/components/calendar/index.vue')['default'];
    VinCalendarItem: typeof import('@vingogo/uni-ui/components/calendar-item/index.vue')['default'];
    VinCascader: typeof import('@vingogo/uni-ui/components/cascader/index.vue')['default'];
    VinCascaderItem: typeof import('@vingogo/uni-ui/components/cascader/cascader-item.vue')['default'];
    VinCell: typeof import('@vingogo/uni-ui/components/cell/index.vue')['default'];
    VinCellGroup: typeof import('@vingogo/uni-ui/components/cell-group/index.vue')['default'];
    VinCheckbox: typeof import('@vingogo/uni-ui/components/checkbox/index.vue')['default'];
    VinCheckboxGroup: typeof import('@vingogo/uni-ui/components/checkbox-group/index.vue')['default'];
    VinCmtBottom: typeof import('@vingogo/uni-ui/components/comment/components/CmtBottom.vue')['default'];
    VinCmtHeader: typeof import('@vingogo/uni-ui/components/comment/components/CmtHeader.vue')['default'];
    VinCmtImages: typeof import('@vingogo/uni-ui/components/comment/components/CmtImages.vue')['default'];
    VinCol: typeof import('@vingogo/uni-ui/components/col/index.vue')['default'];
    VinComment: typeof import('@vingogo/uni-ui/components/comment/index.vue')['default'];
    VinDialog: typeof import('@vingogo/uni-ui/components/dialog/index.vue')['default'];
    VinDivider: typeof import('@vingogo/uni-ui/components/divider/index.vue')['default'];
    VinEmpty: typeof import('@vingogo/uni-ui/components/empty/index.vue')['default'];
    VinFixednav: typeof import('@vingogo/uni-ui/components/fixednav/index.vue')['default'];
    VinForm: typeof import('@vingogo/uni-ui/components/form/index.vue')['default'];
    VinFormItem: typeof import('@vingogo/uni-ui/components/form-item/index.vue')['default'];
    VinGrid: typeof import('@vingogo/uni-ui/components/grid/index.vue')['default'];
    VinGridItem: typeof import('@vingogo/uni-ui/components/grid-item/index.vue')['default'];
    VinIcon: typeof import('@vingogo/uni-ui/components/icon/index.vue')['default'];
    VinInfiniteloading: typeof import('@vingogo/uni-ui/components/infiniteloading/index.vue')['default'];
    VinInput: typeof import('@vingogo/uni-ui/components/input/index.vue')['default'];
    VinInputNumber: typeof import('@vingogo/uni-ui/components/input-number/index.vue')['default'];
    VinList: typeof import('@vingogo/uni-ui/components/list/index.vue')['default'];
    VinNavbar: typeof import('@vingogo/uni-ui/components/navbar/index.vue')['default'];
    VinNoticebar: typeof import('@vingogo/uni-ui/components/noticebar/index.vue')['default'];
    VinNotify: typeof import('@vingogo/uni-ui/components/notify/index.vue')['default'];
    VinOverlay: typeof import('@vingogo/uni-ui/components/overlay/index.vue')['default'];
    VinPopup: typeof import('@vingogo/uni-ui/components/popup/index.vue')['default'];
    VinProgress: typeof import('@vingogo/uni-ui/components/progress/index.vue')['default'];
    VinRadio: typeof import('@vingogo/uni-ui/components/radio/index.vue')['default'];
    VinRadiogroup: typeof import('@vingogo/uni-ui/components/radiogroup/index.vue')['default'];
    VinRange: typeof import('@vingogo/uni-ui/components/range/index.vue')['default'];
    VinRate: typeof import('@vingogo/uni-ui/components/rate/index.vue')['default'];
    VinRouterLink: typeof import('vue-router')['RouterLink'];
    VinRouterView: typeof import('vue-router')['RouterView'];
    VinRow: typeof import('@vingogo/uni-ui/components/row/index.vue')['default'];
    VinSearchbar: typeof import('@vingogo/uni-ui/components/searchbar/index.vue')['default'];
    VinSkeleton: typeof import('@vingogo/uni-ui/components/skeleton/index.vue')['default'];
    VinStep: typeof import('@vingogo/uni-ui/components/step/index.vue')['default'];
    VinSteps: typeof import('@vingogo/uni-ui/components/steps/index.vue')['default'];
    VinSwipe: typeof import('@vingogo/uni-ui/components/swipe/index.vue')['default'];
    VinSwitch: typeof import('@vingogo/uni-ui/components/switch/index.vue')['default'];
    VinTabbar: typeof import('@vingogo/uni-ui/components/tabbar/index.vue')['default'];
    VinTabbarItem: typeof import('@vingogo/uni-ui/components/tabbar-item/index.vue')['default'];
    VinTabpane: typeof import('@vingogo/uni-ui/components/tabpane/index.vue')['default'];
    VinTabs: typeof import('@vingogo/uni-ui/components/tabs/index.vue')['default'];
    VinTag: typeof import('@vingogo/uni-ui/components/tag/index.vue')['default'];
    VinTextarea: typeof import('@vingogo/uni-ui/components/textarea/index.vue')['default'];
    VinToast: typeof import('@vingogo/uni-ui/components/toast/index.vue')['default'];
    VinTransition: typeof import('@vingogo/uni-ui/components/transition/index.vue')['default'];
    VinUploader: typeof import('@vingogo/uni-ui/components/uploader/index.vue')['default'];
  }
}
