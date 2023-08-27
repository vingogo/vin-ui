import { computed } from 'vue';
import { normalizeClass, stringifyStyle, normalizeStyle } from '../../shared/utils';

const classPrefix = 'vin';

const useVinContext = (props: any, { componentName }: { componentName: string }) => {
  const mainClass = computed(() => {
    const cls = normalizeClass([props.customClass, { [componentName]: true }]);

    return cls;
  });

  const mainStyle = computed(() => {
    return stringifyStyle(normalizeStyle(props.customStyle));
  });

  const getMainClass = (cls: unknown) => {
    return normalizeClass([props.customClass, { [componentName]: true }, cls]);
  };

  const getMainStyle = (style: unknown) => {
    return stringifyStyle(normalizeStyle([props.customStyle, style]));
  };

  return {
    classPrefix,
    mainClass,
    mainStyle,
    getMainClass,
    getMainStyle,
  };
};

export default useVinContext;
