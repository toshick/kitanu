import Vue from 'vue';
// import { VNode, VNodeDirective } from 'vue/types/vnode';
import { VNodeDirective } from 'vue/types/vnode';

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

  el.addEventListener('mousedown', onMouseDown);
  el.addEventListener('mouseup', onMouseUp);

  const removeAllHandlers = () => {
    el.removeEventListener('mousedown', onMouseDown);
    el.removeEventListener('mouseup', onMouseUp);
    el.removeEventListener('removeAllHandlers', removeAllHandlers);
  };

  el.addEventListener('removeAllHandlers', removeAllHandlers);
}
