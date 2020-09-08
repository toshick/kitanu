import CaModalPG, { OpenParams } from 'camaleao-design/components/CaModalPG';
import CaToastPG, { OpenParamsToast } from 'camaleao-design/components/CaToastPG';
import ModalSideMenu from '@/components/parts/ModalSideMenu.vue';

export const openDialog = (params: OpenParams) => {
  CaModalPG.openDialog({
    ...params,
    klass: params.klass ? [...params.klass, 'view'] : ['view'],
  });
};

export const openView = (params: OpenParams) => {
  CaModalPG.openView({
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

export const sidemenu = (params: OpenParams) => {
  CaModalPG.modalMenu({
    ...params,
    component: ModalSideMenu,
    klass: ['-sidemenu'],
  });
};

/**
 * shuffle
 */
export function shuffle(array: Array<any>): Array<any> {
  const ret: Array<any> = array.concat();
  for (let i = ret.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = ret[i];
    ret[i] = ret[r];
    ret[r] = tmp;
  }
  return ret;
}
