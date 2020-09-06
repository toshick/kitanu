import CaModalPG, { OpenParams } from 'camaleao-design/components/CaModalPG';
import CaToastPG, { OpenParamsToast } from 'camaleao-design/components/CaToastPG';

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
