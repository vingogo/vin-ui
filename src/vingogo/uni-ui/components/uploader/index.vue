<template>
  <view :class="mainClass" :style="mainStyle">
    <view class="vin-uploader__slot" v-if="$slots.default">
      <slot></slot>
      <template v-if="maximum - fileList.length">
        <view class="vin-uploader__input" @click="onChange"></view>
      </template>
    </view>

    <view
      class="vin-uploader__preview"
      :class="[listType]"
      v-for="(item, index) in fileList"
      :key="item.uid"
    >
      <view class="vin-uploader__preview-img" v-if="listType == 'picture' && !$slots.default">
        <view class="vin-uploader__preview__progress" v-if="item.status == 'ready'">
          <view class="vin-uploader__preview__progress__msg">{{ item.message }}</view>
        </view>
        <view class="vin-uploader__preview__progress" v-else-if="item.status != 'success'">
          <vin-icon color="#fff" :name="item.status == 'error' ? 'failure' : 'loading'"></vin-icon>
          <view class="vin-uploader__preview__progress__msg">{{ item.message }}</view>
        </view>
        <vin-icon
          v-if="isDeletable"
          @click="onDelete(item, index)"
          custom-class="close"
          name="failure"
        ></vin-icon>
        <img
          class="vin-uploader__preview-img__c"
          @click="fileItemClick(item)"
          v-if="item.type.includes('image') && item.url"
          :src="item.url"
        />
        <view v-else class="vin-uploader__preview-img__file">
          <view @click="fileItemClick(item)" class="vin-uploader__preview-img__file__name">
            <vin-icon color="#808080" name="link"></vin-icon>&nbsp;{{ item.name }}
          </view>
        </view>
        <view class="tips">{{ item.name }}</view>
      </view>
      <view class="vin-uploader__preview-list" v-else-if="listType == 'list'">
        <view
          @click="fileItemClick(item)"
          class="vin-uploader__preview-img__file__name"
          :class="[item.status]"
        >
          <vin-icon name="link" />&nbsp;{{ item.name }}
        </view>
        <vin-icon
          custom-class="vin-uploader__preview-img__file__del"
          @click="onDelete(item, index)"
          color="#808080"
          name="del"
        />
        <vin-progress
          size="small"
          :percentage="item.percentage"
          v-if="item.status == 'uploading'"
          stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
          :show-text="false"
        >
        </vin-progress>
      </view>
    </view>
    <view
      class="vin-uploader__upload"
      :class="[listType]"
      v-if="listType == 'picture' && !$slots.default && maximum - fileList.length"
    >
      <vin-icon :size="uploadIconSize" color="#808080" :name="uploadIcon"></vin-icon>
      <view class="vin-uploader__input" @click="onChange"></view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, reactive } from 'vue';
import { createComponent } from '../../common/create';
import { uploaderProps } from './common';

import type { FileItem } from './type';
import { chooseFile, createUploader } from './utils';
import type {
  ChooseFile,
  UploadOptions,
  OnProgressUpdateResult,
  UploadFileSuccessCallbackResult,
  GeneralCallbackResult,
} from './utils';

const { componentName, create, translate, useVinContext } = createComponent('uploader');
export default create({
  props: uploaderProps,
  emits: [
    'start',
    'progress',
    'oversize',
    'success',
    'failure',
    'change',
    'delete',
    'update:fileList',
    'file-item-click',
  ],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const fileList: FileItem[] = reactive(props.fileList) as Array<FileItem>;
    let uploadQueue: Promise<{ upload: () => void }>[] = [];

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    const fileItemClick = (fileItem: FileItem) => {
      emit('file-item-click', { fileItem });
    };

    const clearUploadQueue = (index = -1) => {
      if (index > -1) {
        uploadQueue.splice(index, 1);
      } else {
        uploadQueue = [];
      }
    };

    const executeUpload = (fileItem: FileItem, index?: number) => {
      const { type, url, name, formData } = fileItem;

      const uploadOption: UploadOptions = {
        url: props.url,
        filePath: url,
        name,
        fileType: type,
        header: props.headers,
        timeout: props?.timeout,
        xhrState: props.xhrState,
        formData,
        file: fileItem,
      };

      uploadOption.onStart = (option: UploadOptions) => {
        fileItem.status = 'ready';
        fileItem.message = translate('readyUpload');
        clearUploadQueue(index);
        emit('start', option);
      };

      uploadOption.onProgress = (event: OnProgressUpdateResult, option: UploadOptions) => {
        fileItem.status = 'uploading';
        fileItem.message = translate('uploading');
        fileItem.percentage = event.progress;
        emit('progress', { event, option, percentage: fileItem.percentage });
      };

      uploadOption.onSuccess = (result: UploadFileSuccessCallbackResult, option: UploadOptions) => {
        fileItem.status = 'success';
        fileItem.message = translate('success');
        emit('success', {
          result,
          option,
          fileItem,
        });
        emit('update:fileList', fileList);
      };

      uploadOption.onFailure = (result: GeneralCallbackResult, option: UploadOptions) => {
        fileItem.status = 'error';
        fileItem.message = translate('error');
        emit('failure', {
          result,
          option,
          fileItem,
        });
      };

      const task = createUploader(uploadOption);
      if (props.autoUpload) {
        task.upload();
      } else {
        uploadQueue.push(
          new Promise((resolve, reject) => {
            resolve(task);
          })
        );
      }
    };

    const submit = () => {
      Promise.all(uploadQueue).then((res) => {
        res.forEach((i) => i.upload());
      });
    };

    const readFile = (files: ChooseFile[]) => {
      files.forEach((file: ChooseFile, index: number) => {
        // const formData = new FormData();
        // for (const [key, value] of Object.entries(props.data)) {
        //   formData.append(key, value);
        // }

        const fileItem = reactive({} as FileItem);

        fileItem.uid = new Date().getTime().toString();
        fileItem.status = 'ready';
        fileItem.formData = props.data;
        fileItem.message = translate('waitingUpload');
        fileItem.url = file.url;
        fileItem.name = file.name;
        fileItem.type = file.type;

        executeUpload(fileItem, index);

        console.log('fileList', fileList);

        fileList.push(fileItem);
      });
    };

    const filterFiles = (files: ChooseFile[]) => {
      const maximum = (props.maximum as number) * 1;
      const maximize = (props.maximize as number) * 1;
      const oversizes = new Array<ChooseFile>();
      files = files.filter((file: ChooseFile) => {
        if (file.size > maximize) {
          oversizes.push(file);
          return false;
        }
        return true;
      });
      if (oversizes.length) {
        emit('oversize', oversizes);
      }
      const currentFileLength = files.length + fileList.length;
      if (currentFileLength > maximum) {
        files.splice(files.length - (currentFileLength - maximum));
      }
      return files;
    };

    const onDelete = (file: FileItem, index: number) => {
      clearUploadQueue(index);
      if (props.beforeDelete(file, fileList)) {
        fileList.splice(index, 1);
        emit('delete', {
          file,
          fileList,
          index,
        });
      } else {
        // console.log('用户阻止了删除！');
      }
    };

    const onChange = (event: InputEvent) => {
      if (props.disabled) {
        return;
      }

      const maximum = (props.maximum as number) * 1;

      chooseFile({
        accept: props.accept,
        multiple: props.multiple,
        capture: props.capture,
        compressed: props.compressed,
        maxDuration: props.maxDuration,
        sizeType: props.sizeType,
        camera: props.camera,
        maxCount: maximum - fileList.length,
      }).then((files) => {
        if (props.beforeUpload) {
          props.beforeUpload(files).then((f: ChooseFile[]) => {
            const filteredFiles: ChooseFile[] = filterFiles(new Array<ChooseFile>().slice.call(f));
            readFile(filteredFiles);
          });
        } else {
          const filteredFiles: ChooseFile[] = filterFiles(
            new Array<ChooseFile>().slice.call(files)
          );
          readFile(filteredFiles);
        }

        emit('change', { fileList, event });
      });
    };

    return {
      mainStyle,
      onChange,
      onDelete,
      fileList,
      mainClass,
      fileItemClick,
      clearUploadQueue,
      submit,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
