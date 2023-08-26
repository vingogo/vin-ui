import { getCurrentInstance } from 'vue';
import type { ComponentPublicInstance } from 'vue';

export function useExpose(apis: Record<string, any>) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy as ComponentPublicInstance, apis);
  }
}
