import Locale from '@vingogo/uni-ui/locale';

export const { currentLang } = Locale;
export const useTranslate = (object: Record<string, any>) => {
  for (const [key, value] of Object.entries(object)) {
    Locale.merge(key, value);
  }
};

export const translateChange = () => {
  let href = '';
  const { location } = window.parent;
  const { currentLang } = Locale;
  if (currentLang.value === 'zh-CN') {
    href = location.href.replace('zh-CN', 'en-US');
    Locale.use('en-US');
  } else {
    href = location.href.replace('en-US', 'zh-CN');
    Locale.use('zh-CN');
  }
  location.href = href;
};
