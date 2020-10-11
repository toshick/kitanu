import Vue from 'vue';
import sanitizeHTML from 'sanitize-html';
import { storiesOf } from '@storybook/vue';
import 'camaleao-design/components/install';
import '@/plugins/global.ts';
import '@/plugins/v-longpress.ts';

import AppTop from '@/components/AppTop.vue';
import AppSetting from '@/components/AppSetting.vue';
import AppAlbumDetail from '@/components/AppAlbumDetail.vue';
import AppAlbumList from '@/components/AppAlbumList.vue';
import AppSelectMember from '@/components/AppSelectMember.vue';
import AppChat from '@/components/AppChat.vue';

import { infoitems, chatitems, postItems, members } from './dummydata.js';

Vue.config.ignoredElements = ['ion-icon'];
Vue.prototype.$sanitize = sanitizeHTML;

storiesOf('キータヌ', module).add('チャット', () => ({
  components: {
    AppChat,
    AppTop,
    AppSetting,
    AppAlbumDetail,
    AppAlbumList,
    AppSelectMember,
  },
  data: () => {
    return {
      chatitems,
      infoitems,
      postItems,
      members,
    };
  },
  template: `<main>
  <div class="mobileview-des">
    ・リアルタイムにアルバムを構築していく<br>
    ・スワイプいれる？
  </div>
  <section class="appviews">
  <div class="mobileview"><AppTop :infoitems="infoitems" :chatitems="chatitems" /></div>
  <div class="mobileview"><AppChat :chatitems="chatitems" :infoitems="infoitems" /></div>
  <div class="mobileview"><AppSetting /></div>
  <div class="mobileview"><AppAlbumList /></div>
  <div class="mobileview"><AppAlbumDetail :members="members" :post-items="postItems" /></div>

  <div class="mobileview"><AppSelectMember :members="members" /></div>
  

  
  
    </section></main>`,
}));
