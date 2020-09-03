import Vue from 'vue';
// import { ValidationProvider, ValidationObserver } from 'vee-validate';

import axios from 'axios';
import sanitizeHTML from 'sanitize-html';
import 'camaleao-design/components/install';

// validation
// import '@/components/form/validation';

/**
 * ValidationProvider
 */
// Vue.component('ValidationObserver', ValidationObserver);
// Vue.component('ValidationProvider', ValidationProvider);

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
    // デフォルトの動作をさせない
    e.preventDefault();
  }
}
