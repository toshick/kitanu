import Vue from 'vue';
import axios from 'axios';
import sanitizeHTML from 'sanitize-html';
import { OpenParams } from 'camaleao-design/components/CaModalPG';
import { openDialog, openView, toast, sidemenu, drillDown, loading } from '@/common/util';
import AppSetting from '@/components/AppSetting.vue';
// import TextInputModal from '@/components/parts/TextInputModal.vue';

import 'camaleao-design/components/install';
import 'camaleao-design/form/validation.ts';

Vue.prototype.$sanitize = sanitizeHTML;

/**
 * axios settings
 */
axios.defaults.headers.common['X-Requested-By'] = 'kitanu-requested-by';
Vue.prototype.$http = axios;

/**
 * 拡大縮小禁止
 */
document.addEventListener('touchmove', mobileNoScroll, { passive: false });

function mobileNoScroll(e: any) {
  if (e.touches.length >= 2) {
    e.preventDefault();
  }
}

/**
 * mixin
 */
Vue.mixin({
  methods: {
    changeView(name: string) {
      this.$router.push(name);
    },
    drillDown(params: OpenParams) {
      const $t = this.$el.closest('.mobileview') || null;
      drillDown({ target: $t, ...params });
    },
    openView(params: OpenParams) {
      const $t = this.$el.closest('.mobileview') || null;
      openView({ target: $t, ...params });
    },
    showLoading(flg: boolean) {
      loading(flg);
    },
    toast(txt: string) {
      const $t = this.$el.closest('.mobileview') || null;
      toast(txt, { target: $t });
    },
    openMenu() {
      const $t = this.$el.closest('.mobileview') || null;
      sidemenu({
        target: $t,
      });
    },
    showSetting() {
      const $t = this.$el.closest('.mobileview') || null;
      drillDown({ target: $t, component: AppSetting });
    },
    showConfirm(title: string, onConfirm: () => void) {
      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: title,
        target: $t,
        klass: ['view-textinput'],
        compoParams: {
          confirmText: 'なんだかしらんけどよろしいですか？なんだかしらんけどよろしいですか？',
          onConfirm,
        },
      });
    },
  },
});
