import { computed, reactive, VNode, watch } from 'vue';
import { getPropByPath, isObject, isPromise } from '../../shared/utils';
import { FormItemRule } from '../form-item/types';
import { ErrorMessage, FormRule } from './types';
import { useProvide } from '../../shared/hooks';
import { createComponent } from '../common/create';

const { create, componentName } = createComponent('form');

export const FORM_KEY = Symbol('Form');

export const Component = create({
  props: {
    modelValue: {
      type: Object,
      default: {},
    },
  },
  emits: ['validate'],

  setup(props, { emit }) {
    const formErrorTip = computed(() => reactive<any>({}));
    const { internalChildren } = useProvide(
      FORM_KEY,
      `${componentName}-item`,
    )({ props, formErrorTip });

    const clearErrorTips = () => {
      Object.keys(formErrorTip.value).forEach((item) => {
        formErrorTip.value[item] = '';
      });
    };

    const reset = () => {
      clearErrorTips();
    };

    watch(
      () => props.modelValue,
      (value: any) => {
        clearErrorTips(value);
      },
      { immediate: true },
    );

    const findFormItem = (vnodes: VNode[]) => {
      let task: FormRule[] = [];
      vnodes.forEach((vnode: VNode) => {
        let { type } = vnode;
        type = (type as any).name || type;
        if (type === 'vin-form-item') {
          task.push({
            prop: vnode.props?.prop,
            rules: vnode.props?.rules || [],
          });
        } else if (Array.isArray(vnode.children) && vnode.children?.length) {
          task = task.concat(findFormItem(vnode.children as VNode[]));
        } else if (isObject(vnode.children) && Object.keys(vnode.children)) {
          // 异步节点获取
          if ((vnode.children as any)?.default) {
            // eslint-disable-next-line no-param-reassign
            vnode.children = (vnode.children as any).default();
            task = task.concat(findFormItem(vnode.children as VNode[]));
          }
        }
      });
      return task;
    };

    const tipMessage = (errorMsg: ErrorMessage) => {
      if (errorMsg.message) {
        emit('validate', errorMsg);
      }
      formErrorTip.value[errorMsg.prop] = errorMsg.message;
    };

    const checkRule = (item: FormRule): Promise<ErrorMessage | boolean> => {
      const { rules, prop } = item;

      const errorPromise = (errorMsg: ErrorMessage): Promise<ErrorMessage> => {
        return new Promise((resolve) => {
          tipMessage(errorMsg);
          resolve(errorMsg);
        });
      };

      if (!prop) {
        console.warn('[VinUI] <FormItem> 使用 rules 校验规则时 , 必须设置 prop 参数');
      }

      const value = getPropByPath(props.modelValue, prop || '');

      // clear tips
      tipMessage({ prop, message: '' });
      const resRules = [...rules];
      while (resRules.length) {
        const { required, validator, regex, message } = resRules.shift() as FormItemRule;
        const errorMsg = { prop, message };
        if (required) {
          if (!value) {
            return errorPromise(errorMsg);
          }
        }
        if (regex && !regex.test(String(value))) {
          return errorPromise(errorMsg);
        }
        if (validator) {
          const result = validator(value);
          if (isPromise(result)) {
            return new Promise((resolve) => {
              result.then((res) => {
                if (!res) {
                  tipMessage(errorMsg);
                  resolve(errorMsg);
                } else {
                  resolve(true);
                }
              });
            });
          }
          if (!result) {
            return errorPromise(errorMsg);
          }
        }
      }
      return Promise.resolve(true);
    };

    /**
     * 校验
     * @param customProp 指定校验，用于用户自定义场景时触发，例如 blur、change 事件
     * @returns
     */
    const validate = (customProp = '') => {
      return new Promise((resolve) => {
        const task = findFormItem(internalChildren?.map((child) => child.vnode));

        const errors = task.map((item) => {
          if (customProp) {
            if (customProp === item.prop) {
              return checkRule(item);
            }
            return Promise.resolve(true);
          }
          return checkRule(item);
        });

        Promise.all(errors).then((errorRes) => {
          // eslint-disable-next-line no-param-reassign
          errorRes = errorRes.filter((item) => item !== true);
          const res = { valid: true, errors: [] };
          if (errorRes.length) {
            res.valid = false;
            res.errors = errorRes as any;
          }
          resolve(res);
        });
      });
    };
    const onSubmit = () => {
      validate();
      return false;
    };
    return {
      validate,
      reset,
      onSubmit,
      formErrorTip,
    };
  },
});
