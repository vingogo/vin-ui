import { ref, nextTick, computed, onUnmounted, watchEffect } from 'vue';
import { sleep } from '../../shared/utils';
import { getClassNames } from './common';

const useTransition = (
  props: any,
  {
    beforeEnter,
    enter,
    afterEnter,
    beforeLeave,
    leave,
    afterLeave,
  }: {
    beforeEnter: () => void;
    enter: () => void;
    afterEnter: () => void;
    beforeLeave: () => void;
    leave: () => void;
    afterLeave: () => void;
  }
) => {
  const isShow = ref(false);
  const classes = ref('');
  const timer = ref();

  const classNames = computed(() =>
    getClassNames(props.name, {
      enterClass: props.enterClass,
      enterActiveClass: props.enterActiveClass,
      enterToClass: props.enterToClass,
      leaveClass: props.leaveClass,
      leaveActiveClass: props.leaveActiveClass,
      leaveToClass: props.leaveToClass,
    })
  );

  // 进入动画
  const onEnter = () => {
    beforeEnter?.();
    isShow.value = true;
    classes.value = `${classNames.value.enter} ${classNames.value.enterActive}`;

    nextTick(async () => {
      enter?.();
      await sleep(20);

      classes.value = classNames.value.enterTo;
      afterEnter?.();
    });
  };

  // 动画离场
  const onLeave = () => {
    beforeLeave?.();
    classes.value = `${classNames.value.leave} ${classNames.value.leaveActive}`;

    nextTick(async () => {
      leave?.();
      classes.value = classNames.value.leaveTo;

      timer.value = setTimeout(() => {
        afterLeave?.();
        isShow.value = false;
      }, parseInt(props.duration, 10));
    });
  };

  watchEffect(() => (props.show ? onEnter() : onLeave()));

  onUnmounted(() => clearTimeout(timer.value));

  return {
    isShow,
    classes,
    onEnter,
    onLeave,
  };
};

export default useTransition;
