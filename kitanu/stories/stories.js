import Vue from 'vue';
import sanitizeHTML from 'sanitize-html';
import { storiesOf } from '@storybook/vue';
import 'camaleao-design/components/install';
import '@/plugins/global.ts';
import '@/plugins/v-longpress.ts';

import AppTop from '@/components/AppTop.vue';
import AppSetting from '@/components/AppSetting.vue';
import AlbumDetail from '@/components/AlbumDetail.vue';
import AppAlbumList from '@/components/AppAlbumList.vue';
import AppSelectMember from '@/components/AppSelectMember.vue';
import AppChatList from '@/components/AppChatList.vue';
import AppChat from '@/components/AppChat.vue';

import { infoitems, chatitems, postItems, members } from './dummydata.js';

Vue.config.ignoredElements = ['ion-icon'];
Vue.prototype.$sanitize = sanitizeHTML;

storiesOf('キータヌ', module).add('チャット', () => ({
  components: {
    AppChatList,
    AppChat,
    AppTop,
    AppSetting,
    AlbumDetail,
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
  <div class="mobileview"><AppChatList :members="members" /></div>
  <div class="mobileview"><AppChat :chatitems="chatitems" :infoitems="infoitems" :members="members" /></div>
  <div class="mobileview"><AppSetting /></div>
  <div class="mobileview"><AppAlbumList /></div>
  <div class="mobileview"><AlbumDetail :members="members" :post-items="postItems" /></div>

  <div class="mobileview"><AppSelectMember :members="members" /></div>
  

  
  
    </section></main>`,
}));
