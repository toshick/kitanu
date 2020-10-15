import Vue from 'vue';
import sanitizeHTML from 'sanitize-html';
import { storiesOf } from '@storybook/vue';
import 'camaleao-design/components/install';
import '@/plugins/global.ts';
import '@/plugins/v-longpress.ts';

import ViewTop from '@/components/ViewTop.vue';
import ViewSetting from '@/components/ViewSetting.vue';
import ViewAlbumDetail from '@/components/ViewAlbumDetail.vue';
import ViewAlbumList from '@/components/ViewAlbumList.vue';
import ViewSelectMember from '@/components/ViewSelectMember.vue';
import ViewChatList from '@/components/ViewChatList.vue';
import ViewChat from '@/components/ViewChat.vue';

import { infoitems, chatitems, postItems, members, albumItems } from './dummydata.js';

Vue.config.ignoredElements = ['ion-icon'];
Vue.prototype.$sanitize = sanitizeHTML;

storiesOf('キータヌ', module).add('チャット', () => ({
  components: {
    ViewChatList,
    ViewChat,
    ViewTop,
    ViewSetting,
    ViewAlbumDetail,
    ViewAlbumList,
    ViewSelectMember,
  },
  data: () => {
    return {
      chatitems,
      infoitems,
      postItems,
      members,
      albumItems,
    };
  },
  template: `<main>
  <div class="mobileview-des">
    ・リアルタイムにアルバムを構築していく<br>
    ・スワイプいれる？
  </div>
  <section class="appviews">
  <div class="mobileview"><ViewTop :infoitems="infoitems" :chatitems="chatitems" /></div>
  <div class="mobileview"><ViewChatList :members="members" /></div>
  <div class="mobileview"><ViewChat :chatitems="chatitems" :infoitems="infoitems" :members="members" /></div>
  <div class="mobileview"><ViewSetting /></div>
  <div class="mobileview"><ViewAlbumList :albumItems="albumItems" /></div>
  <div class="mobileview"><ViewAlbumDetail :members="members" :post-items="postItems" /></div>

  <div class="mobileview"><ViewSelectMember :members="members" /></div>
  

  
  
    </section></main>`,
}));
