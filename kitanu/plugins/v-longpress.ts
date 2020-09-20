import Vue from 'vue';
// import { VNode, VNodeDirective } from 'vue/types/vnode';
import { VNodeDirective } from 'vue/types/vnode';
import { isMobile } from '@/common/util';

/**
 * longpress
 */
Vue.directive('longpress', {
  bind(el: HTMLElement, binding: VNodeDirective) {
    setEvent(el, binding);
  },
  unbind(el: HTMLElement) {
    // イベント削除
    el.dispatchEvent(new CustomEvent('removeAllHandlers'));
  },
});

/**
 * リスナーセットおよび削除イベントセット
 */
function setEvent(el: HTMLElement, binding: VNodeDirective) {
  const func: any = binding.value;
  const duration: number = binding.arg ? +binding.arg : 800;
  let timerID: NodeJS.Timer | null = null;

  console.log('isMobile', isMobile);

  const eventKeyDown = isMobile ? 'touchstart' : 'mousedown';
  const eventKeyUp = isMobile ? 'touchend' : 'mouseup';

  function onMouseDown(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (timerID) clearTimeout(timerID);
    timerID = setTimeout(() => {
      if (func) func();
      timerID = null;
    }, duration);
  }

  function onMouseUp(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (timerID) clearTimeout(timerID);
    timerID = null;
  }

  el.addEventListener(eventKeyDown, onMouseDown);
  el.addEventListener(eventKeyUp, onMouseUp);

  const removeAllHandlers = () => {
    el.removeEventListener(eventKeyDown, onMouseDown);
    el.removeEventListener(eventKeyUp, onMouseUp);
    el.removeEventListener('removeAllHandlers', removeAllHandlers);
  };

  el.addEventListener('removeAllHandlers', removeAllHandlers);
}
