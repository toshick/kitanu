import Vue from 'vue';
import axios from 'axios';
import sanitizeHTML from 'sanitize-html';
import { OpenParams } from 'camaleao-design/components/CaModalPG';
import { openModal, openDialog, openView, toast, sidemenu, drillDown, loading } from '@/common/util';
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
    openModal(params: OpenParams) {
      const $t = this.$el.closest('.mobileview') || null;
      openModal({ target: $t, ...params });
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

// manifestのlinkタグを生成
function setManifest(path: string) {
  const manifest = document.createElement('link');
  manifest.rel = 'manifest';
  manifest.href = path;
  document.head.appendChild(manifest);
}

// OSに応じて読み込むmanifestを変更
const userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('iphone') > 0 || userAgent.indexOf('ipad') > 0) {
  setManifest('/manifest-ios.json');
} else {
  setManifest('/manifest.json');
}

// serviceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      // 登録成功
      console.log('ServiceWorker の登録に成功しました。スコープ: ', registration.scope);
    })
    .catch(function (err) {
      // 登録失敗
      console.log('ServiceWorker の登録に失敗しました。', err);
    });
}
