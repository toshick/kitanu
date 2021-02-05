import Vue from 'vue';
import { CreateElement } from 'vue/types/umd';
import CaModalPG, { OpenParams } from 'camaleao-design/components/CaModalPG';
import CaToastPG, {
  OpenParamsToast,
} from 'camaleao-design/components/CaToastPG';
// import ModalSideMenu from '@/components/parts/ModalSideMenu.vue';
import Loading from '@/components/parts/Loading.vue';
import Particle from '@/components/parts/Particle.vue';
import dayjs from 'dayjs';
export { zeropad, base64ToFile } from './util-other';
export { ArrayUtil } from './util-array';

/**
 * isLocal
 */
export const isLocal: boolean = (() => {
  if (location.hostname === 'localhost') return true;
  return false;
})();

/**
 * isMobile
 */
export const isMobile: boolean = (() => {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) return true;
  return false;
})();

/**
 * log
 */
export function log(...args: any[]) {
  if (isLocal) console.log('【LOG】' + args.join(', '));
}

/**
 * 1*1 transparent png img
 */
export const placeholderImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export const openDialog = (params: OpenParams) => {
  // particleEffect('#ac9934');
  CaModalPG.openDialog({
    ...params,
    klass: params.klass
      ? [...params.klass, 'view', '-transparentbg']
      : ['view', '-transparentbg'],
    transition: params.transition || 'scalefade',
    easyClose: params.easyClose || false,
  });
};

export const openView = (params: OpenParams) => {
  // particleEffect();
  CaModalPG.openView({
    ...params,
    klass: params.klass ? [...params.klass, 'view'] : ['view'],
    transition: params.transition || 'scalefade',
  });
};

export const openModal = (params: OpenParams) => {
  // particleEffect();
  CaModalPG.openView({
    ...params,
    klass: params.klass ? [...params.klass, 'view'] : ['view'],
    transition: params.transition || 'modal',
  });
};

export const drillDown = (params: OpenParams) => {
  // particleEffect();
  CaModalPG.drillDown({
    ...params,
    klass: params.klass ? [...params.klass, 'view'] : ['view'],
  });
};

type ToastOption = Omit<OpenParamsToast, 'text'>;
export const toast = (text: string, params?: ToastOption) => {
  const p = params || {};
  CaToastPG.open({
    ...p,
    text,
  });
};

// export const sidemenu = (params: OpenParams) => {
//   particleEffect();

//   CaModalPG.modalMenu({
//     ...params,
//     component: ModalSideMenu,
//     klass: ['-sidemenu'],
//   });
// };

let closeLoading: any | null = null;

export const loading = (flg: boolean) => {
  if (!flg) {
    if (closeLoading) {
      closeLoading();
    }
    closeLoading = null;
    return;
  }
  if (closeLoading) {
    return;
  }
  const params: OpenParams = { easyClose: false };
  const vm = CaModalPG.openView({
    ...params,
    component: Loading,
    klass: ['-loading'],
    transition: 'scalefade',
  });

  vm.$children.forEach((child: any) => {
    if (child.close) {
      closeLoading = child.close;
    }
  });
};

/**
 * zeropad
 */
// export const zeropad = (num: number, keta: number = 5) => {
//   let str = `${num}`;
//   if (str.length >= keta) return str;
//   while (str.length < keta) {
//     str = `0${str}`;
//   }
//   return str;
// };

/**
 * particleEffect
 */
export const particleEffect = (color?: string, target?: Element | null) => {
  const $el = document.createElement('article');
  const $body: Element = target || document.body;
  if ($body) {
    $body.appendChild($el);
  }

  const vm = new Vue({
    el: $el,
    props: {
      visible: {
        default: true,
        type: Boolean,
      },
    },
    beforeDestroy() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    render(h: CreateElement) {
      const self: any = this;
      return h(Particle, {
        props: {
          color,
        },
        on: {
          finish() {
            self.visible = false;
            setTimeout(() => {
              self.$destroy();
            }, 0);
          },
        },
        directives: [
          {
            name: 'show',
            value: self.visible,
          },
        ],
      });
    },
  });
  return vm;
};

/**
 * hiraToKana
 */
export function hiraToKana(str: string) {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

/**
 * setClipBoard
 */
export function setClipBoard(str: string) {
  const $input = document.createElement('input');
  $input.setAttribute('style', 'opacity: 0');
  $input.value = str;
  document.body.appendChild($input);
  $input.select();
  document.execCommand('copy');
  $input.parentNode?.removeChild($input);
}

/**
 * dateDisp
 */
export function dateDisp(unixtime: number) {
  return dayjs(unixtime).format('YYYY.MM.DD HH:mm');
}
