import CaModalPG, { OpenParamsDialog } from 'camaleao-design/components/CaModalPG';

// export type ConfirmParams = {
//   title: string;
//   text: string;
//   onConfirm?: any;
//   target: Element | null;
//   btnLabel?: string;
//   type?: 'danger';
// };

export const openDialog = (params: OpenParamsDialog) => {
  CaModalPG.openDialog({
    modalTitle: params.modalTitle,
    confirmText: params.confirmText,
    onConfirm: params.onConfirm,
    target: params.target,
    titleIcon: {
      tag: 'ion-icon',
      attrs: {
        name: 'hand-left-outline',
      },
    },
    type: params.type,
    btnLabel: params.btnLabel,
    inputs: params.inputs,
    component: params.component,
    klass: params.klass ? ['view', params.klass] : ['view'],
  });
};

export const openView = (params: OpenParamsDialog) => {
  CaModalPG.openView({
    modalTitle: params.modalTitle,
    confirmText: params.confirmText,
    onConfirm: params.onConfirm,
    target: params.target,
    titleIcon: {
      tag: 'ion-icon',
      attrs: {
        name: 'moon',
      },
    },
    type: params.type,
    btnLabel: params.btnLabel,
    inputs: params.inputs,
    component: params.component,
    klass: params.klass ? ['view', params.klass] : ['view'],
  });
};
