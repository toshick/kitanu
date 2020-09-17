import CaModalPG, { OpenParams } from 'camaleao-design/components/CaModalPG';
import CaToastPG, { OpenParamsToast } from 'camaleao-design/components/CaToastPG';
import ModalSideMenu from '@/components/parts/ModalSideMenu.vue';
import Loading from '@/components/parts/Loading.vue';

export const openDialog = (params: OpenParams) => {
  CaModalPG.openDialog({
    ...params,
    klass: params.klass ? [...params.klass, 'view', '-transparentbg'] : ['view', '-transparentbg'],
    transition: params.transition || 'scalefade',
  });
};

export const openView = (params: OpenParams) => {
  CaModalPG.openView({
    ...params,
    klass: params.klass ? [...params.klass, 'view'] : ['view'],
    transition: params.transition || 'scalefade',
  });
};

export const openModal = (params: OpenParams) => {
  CaModalPG.openView({
    ...params,
    klass: params.klass ? [...params.klass, 'view'] : ['view'],
    transition: params.transition || 'modal',
  });
};

export const drillDown = (params: OpenParams) => {
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

export const sidemenu = (params: OpenParams) => {
  CaModalPG.modalMenu({
    ...params,
    component: ModalSideMenu,
    klass: ['-sidemenu'],
  });
};

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
  });

  vm.$children.forEach((child: any) => {
    if (child.close) {
      closeLoading = child.close;
    }
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

/**
 * 1*1 transparent png img
 */
export const placeholderImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
