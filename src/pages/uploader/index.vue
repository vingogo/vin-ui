<template>
  <view class="demo bg-w">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-uploader :url="uploadUrl"></vin-uploader>
    <view class="h2">{{ translate('title1') }}</view>
    <vin-uploader
      :url="uploadUrl"
      v-model:file-list="defaultFileList"
      @delete="onDelete"
      maximum="3"
      multiple
    >
    </vin-uploader>
    <view class="h2">{{ translate('title2') }}</view>
    <vin-uploader
      :url="uploadUrl"
      v-model:file-list="defaultFileList"
      maximum="10"
      multiple
      list-type="list"
    >
      <vin-button type="success" size="small">{{ translate('uploadfile') }}</vin-button>
    </vin-uploader>
    <view class="h2">{{ translate('title3') }}</view>
    <vin-uploader :url="uploadUrl">
      <vin-button type="success" size="small">{{ translate('uploadfile') }}</vin-button>
    </vin-uploader>
    <view class="h2">{{ translate('title4') }}</view>
    <vin-uploader :url="uploadUrl" @progress="onProgress">
      <vin-button type="success" size="small">{{ translate('uploadfile') }}</vin-button>
    </vin-uploader>
    <br />
    <vin-progress
      :percentage="progressPercentage"
      stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
      :status="progressPercentage == 100 ? '' : 'active'"
    >
    </vin-progress>
    <view class="h2">{{ translate('title5') }}</view>
    <vin-uploader :url="uploadUrl" capture></vin-uploader>
    <view class="h2">{{ translate('title6') }}</view>
    <vin-uploader :url="uploadUrl" multiple maximum="5"></vin-uploader>
    <view class="h2">{{ translate('title7') }}</view>
    <vin-uploader
      :url="uploadUrl"
      multiple
      :maximize="1024 * 50"
      @oversize="onOversize"
    ></vin-uploader>
    <view class="h2">{{ translate('title9') }}</view>
    <vin-uploader :url="uploadUrl" :headers="headers"></vin-uploader>
    <view class="h2">{{ translate('title10') }}</view>
    <vin-uploader :url="uploadUrl" maximum="5" :auto-upload="false" ref="uploadRef"></vin-uploader>
    <br />
    <vin-button type="success" size="small" @click="submitUpload">{{
      translate('title11')
    }}</vin-button>
    <view class="h2">{{ translate('title12') }}</view>
    <vin-uploader disabled></vin-uploader>
  </view>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { createComponent } from '@vingogo/uni-ui/components/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('uploader');

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基本用法',
      uploadfile: '上传文件',
      title1: '上传状态',
      title2: '基础用法-上传列表展示',
      title3: '自定义上传样式',
      title4: '自定义上传使用默认进度条',
      title5: '直接调起摄像头（移动端生效）',
      title6: '限制上传数量5个',
      title7: '限制上传大小（每个文件最大不超过 50kb）',
      title9: '自定义数据 headers ',
      title10: '选中文件后，通过按钮手动执行上传',
      title11: '执行上传',
      title12: '禁用状态',
    },
    'en-US': {
      basic: 'Basic Usage',
      uploadfile: 'Upload files',
      title1: 'Upload status',
      title2: 'Basic usage - upload list display',
      title3: 'Custom upload style',
      title4: 'Custom upload uses default progress bar',
      title5: 'Directly activate the camera (effective on the mobile terminal)',
      title6: 'Limit the number of uploads to 5',
      title7: 'Limit upload size (up to 50kb per file)',
      title9: 'Custom data headers',
      title10: 'Once the file is selected, manually perform the upload via the button',
      title11: 'Perform upload',
      title12: 'Disabled state',
    },
  });
export default createDemo({
  setup() {
    initTranslate();
    const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts';
    const progressPercentage = ref<string | number>(0);
    const headers = {
      custom: 'test',
    };

    const defaultFileList = computed(() => [
      {
        name: 'file 1.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'success',
        message: translate('success'),
        type: 'image',
      },
      {
        name: 'file 2.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'error',
        message: translate('error'),
        type: 'image',
      },
      {
        name: 'file 3.png',
        url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
        status: 'uploading',
        message: translate('uploading'),
        type: 'image',
      },
    ]);
    const fileToDataURL = (file: Blob): Promise<any> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = (e) => resolve((e.target as FileReader).result);
        reader.readAsDataURL(file);
      });
    };
    const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = dataURL;
      });
    };
    const onOversize = (files: File[]) => {
      console.log('oversize 触发 文件大小不能超过 50kb', files);
    };
    const onDelete = (obj: any) => {
      console.log('delete 事件触发', obj);
    };
    const onProgress = ({ event, options, percentage }: any) => {
      progressPercentage.value = percentage;
      console.log('progress 事件触发', percentage);
    };

    const uploadRef = ref<any>(null);
    const submitUpload = () => {
      uploadRef.value.submit();
    };
    return {
      onOversize,
      onDelete,
      onProgress,
      progressPercentage,
      uploadUrl,
      defaultFileList,
      headers,
      uploadRef,
      submitUpload,
      translate,
    };
  },
});
</script>
