import type { SizeType, SourceType, AcceptType, FileType } from './type';
import { omit } from '../../shared/utils';

type UniChooseFileSuccessCallbackResult = {
  /**
   * 本地文件路径列表
   */
  tempFilePaths?: string[];
  /**
   * 本地文件列表，每一项是一个 File 对象
   */
  tempFiles: ({
    path: string;
    size: number;
    name: string;
    type: string;
  } & File)[];
};

export type ChooseFile = {
  url: string;
  size: number;
  name: string;
  type: FileType;
  thumb?: string;
  [k: string]: unknown;
};

type UniChooseVideoSuccess = UniNamespace.ChooseVideoSuccess & { thumbTempFilePath: string };

const omitProps = <T>(obj: T, keys: string[]) => {
  if (!['[object Object]', '[object File]'].includes(Object.prototype.toString.call(obj))) {
    return {};
  }

  return omit(obj as unknown as Record<string, unknown>, keys);
};

const formatImage = (res: UniChooseFileSuccessCallbackResult): ChooseFile[] => {
  return res.tempFiles.map((item) => ({
    ...omitProps(item, ['path']),
    type: 'image',
    url: item.path,
    thumb: item.path,
    size: item.size,
    name: item.name || 'image',
  }));
};

const formatVideo = (res: UniChooseVideoSuccess): ChooseFile[] => {
  return [
    {
      ...omitProps(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
      type: 'video',
      url: res.tempFilePath,
      thumb: res.thumbTempFilePath,
      size: res.size,
      name: res.name || 'video',
    },
  ];
};

const formatMedia = (
  res: UniApp.ChooseMediaSuccessCallbackResult & { name?: string }
): ChooseFile[] => {
  return res.tempFiles.map((item) => ({
    ...omitProps(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
    type: res.type as FileType,
    url: item.tempFilePath,
    thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
    size: item.size,
    name: res?.name || 'media',
  }));
};

const formatFile = (res: UniChooseFileSuccessCallbackResult): ChooseFile[] => {
  return res.tempFiles?.map?.((item) => ({
    ...omitProps(item, ['path']),
    url: item.path,
    size: item.size,
    name: item.name || 'file',
    // #ifdef H5
    type: item.type as FileType,
    // #endif
  }));
};

export type ChooseFileOptions = {
  accept: AcceptType;
  multiple: boolean;
  capture: SourceType[];
  compressed: boolean;
  maxDuration: number;
  sizeType: SizeType[];
  camera?: 'back' | 'front';
  maxCount: number;
};

export const chooseFile = ({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount,
}: ChooseFileOptions): Promise<ChooseFile[]> => {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case 'image':
        uni.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType,
          success: (res) => resolve(formatImage(res as UniChooseFileSuccessCallbackResult)),
          fail: reject,
        });
        break;
      // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-LARK || MP-JD
      case 'media':
        uni.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture as ('album' | 'camera')[],
          maxDuration,
          sizeType,
          camera,
          success: (res) => resolve(formatMedia(res)),
          fail: reject,
        });
        break;
      // #endif
      case 'video':
        uni.chooseVideo({
          sourceType: capture,
          compressed,
          maxDuration,
          camera,
          success: (res) => resolve(formatVideo(res as UniChooseVideoSuccess)),
          fail: reject,
        });
        break;
      default:
        // #ifdef MP-WEIXIN
        uni.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: (res) =>
            resolve(formatFile(res as unknown as UniChooseFileSuccessCallbackResult)),
          fail: reject,
        });
        // #endif
        // #ifdef H5
        uni.chooseFile({
          count: multiple ? maxCount : 1,
          type: 'all',
          success: (res) => resolve(formatFile(res as UniChooseFileSuccessCallbackResult)),
          fail: reject,
        });
      // #endif
    }
  });
};

export type OnProgressUpdateResult = UniApp.OnProgressUpdateResult;
export type UploadFileSuccessCallbackResult = UniApp.UploadFileSuccessCallbackResult;
export type GeneralCallbackResult = UniApp.GeneralCallbackResult;

export type UploadOptions = UniNamespace.UploadFileOption & {
  xhrState?: number;
  onStart?: Function;
  onProgress?: Function;
  onSuccess?: Function;
  onFailure?: Function;
};

export const createUploader = (options: UploadOptions) => {
  const upload = () => {
    const uploadTask = uni.uploadFile({
      url: options.url,
      fileType: options.fileType,
      file: options.file,
      filePath: options.filePath,
      name: options.name,
      header: options.header,
      timeout: options.timeout,
      formData: options.formData,
      success: (result) => {
        if (options.xhrState === result.statusCode) {
          options.onSuccess?.(result, options);
        } else {
          options.onFailure?.(result, options);
        }
      },
      fail: (result) => {
        options.onFailure?.(result, options);
      },
    });

    options.onStart?.(options);

    uploadTask.onProgressUpdate((event) => {
      options.onProgress?.(event, options);
    });
  };

  return { upload };
};
