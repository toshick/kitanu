import Vue from 'vue';
import axios from 'axios';
import sanitizeHTML from 'sanitize-html';
import { OpenParams } from 'camaleao-design/components/CaModalPG';
import { particleEffect, openModal, openDialog, openView, toast, drillDown, loading, placeholderImg } from '@/common/util';
import AppSetting from '@/components/AppSetting.vue';
import Particle from '@/components/parts/Particle.vue';

import 'camaleao-design/components/install';
import 'camaleao-design/form/validation.ts';
Vue.component('Particle', Particle);

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
 * yall
 */
// tslint:disable-next-line:no-var-requires
const yall = require('yall-js').default;
document.addEventListener('DOMContentLoaded', () => {
  yall({
    observeChanges: true,
    events: {
      // The object key is sent as the first argument to `addEventListener`,
      // which is the event. The corresponding value can be the callback if you
      // don't want to send any options to `addEventListener`.
      load(e: any) {
        if (!e.target.classList.contains('lazy') && e.target.nodeName === 'IMG') {
          e.target.classList.add('yall-loaded');
        }
      },
      // If we want to pass options to the third argument in `addEventListener`,
      // we can use a nested object syntax like so:
      error: {
        // Here, the `listener` member is the callback.
        listener(e: any) {
          if (!e.target.classList.contains('lazy') && e.target.nodeName === 'IMG') {
            e.target.classList.add('yall-error');
          }
        },
        // The option below is sent as the third argument to `addEventListener`,
        // offering more control over how events are bound. If you want to
        // specify `useCapture` in lieu of options pass a boolean here instead.
        options: {
          once: true,
        },
      },
    },
  });
});

/**
 * mixin
 */
Vue.mixin({
  data() {
    return {
      placeholderImg,
    };
  },
  methods: {
    goTop() {
      this.$router.push('/');
    },
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
    openDialog(params: OpenParams) {
      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        target: $t,
        ...params,
        titleIcon: {
          tag: 'ion-icon',
          attrs: {
            name: 'hand-right-outline',
          },
        },
      });
    },
    showLoading(flg: boolean) {
      loading(flg);
    },
    toast(txt: string) {
      const $t = this.$el.closest('.mobileview') || null;
      toast(txt, { target: $t });
    },
    openMenu() {
      // const $t = this.$el.closest('.mobileview') || null;
      // sidemenu({
      //   target: $t,
      // });
      this.$root.$emit('openMenu');
    },
    showSetting() {
      const $t = this.$el.closest('.mobileview') || null;
      drillDown({ target: $t, component: AppSetting });
    },
    showConfirm(p: { title: string; text: string; isDanger?: boolean }, onConfirm: () => void) {
      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: p.title,
        target: $t,
        klass: ['view-textinput'],
        compoParams: {
          confirmText: p.text,
          onConfirm,
          type: p.isDanger ? 'danger' : '',
        },
        titleIcon: {
          tag: 'ion-icon',
          attrs: {
            name: 'hand-right-outline',
          },
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
