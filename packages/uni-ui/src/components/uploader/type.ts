export type SizeType = 'original' | 'compressed';
export type SourceType = 'album' | 'camera' | 'user' | 'environment';
export type FileItemStatus = 'ready' | 'uploading' | 'success' | 'error';
export type AcceptType = 'image' | 'media' | 'video' | 'all';
export type FileType = 'image' | 'video' | 'audio';
export type FileItem = {
  status: FileItemStatus;

  message: string;

  uid: string;

  name: string;

  url?: string;

  type?: FileType;

  path?: string;

  percentage: string | number;

  formData: any;
};
