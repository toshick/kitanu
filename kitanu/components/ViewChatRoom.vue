<template>
  <section class="app view chat">
    <ViewHeader>
      <a class="btn-back" @click.stop.prevent="goChatList"
        ><ion-icon name="chevron-back" size="medium"
      /></a>

      <h1>{{ title }}</h1>
      <!-- right -->
      <template v-slot:right>
        <ParticleButton
          class="btn-header margin-left-auto"
          @click="$emit('select-member')"
        >
          <ion-icon name="skull-outline" size="medium"></ion-icon>
        </ParticleButton>
      </template>
    </ViewHeader>
    <ViewBody ref="appbody">
      <LoadingInline v-show="visbleInlineLoading" class="loading-inline" />
      <ul>
        <li v-for="(i, index) in chatPosts" :key="`${index}-${i.text}`">
          <ChatPost
            v-if="!i.npc"
            :myitem="i"
            :last="index === chatPosts.length - 1"
            :login-user-id="loginUserId"
            @good="(chatpostid) => $emit('good', chatpostid)"
            @edit="(chatpost) => editPost(chatpost)"
            @submit-comment="
              (chatpostid, str) => $emit('submit-comment', chatpostid, str)
            "
            @focus="focusElement"
          />
          <ChatPostNPC
            v-else
            :myitem="i"
            :last="index === chatPosts.length - 1"
          />
        </li>
      </ul>
      <!-- <LoadingInline v-show="visbleInlineLoading" class="loading-inline" /> -->
    </ViewBody>
    <ViewFooter
      ref="footer"
      mode="chat"
      :isconnecting="isconnecting || sending"
      @submit="(p) => $emit('submit', p)"
    />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

import {
  TypeChatPost,
  TypeChatInfoItem,
  TypeUser,
} from '@/components/types/apptypes';
import { ValueIterateeCustom } from 'cypress/types/lodash';

// import ChatPost from './parts/ChatPost.vue';
// import ChatPostNPC from './parts/ChatPostNPC.vue';
// import LoadingInline from './parts/LoadingInline.vue';

type State = {};

export default Vue.extend({
  name: 'ViewChatRoom',

  props: {
    title: {
      default: 'むだい',
      type: String,
    },
    chatPosts: {
      default: () => [],
      type: Array as PropType<TypeChatPost[]>,
    },
    // infoItems: {
    //   default: () => [],
    //   type: Array as PropType<TypeChatInfoItem[]>,
    // },
    // members: {
    //   default: () => [],
    //   type: Array as PropType<TypeUser[]>,
    // },
    isconnecting: {
      default: false,
      type: Boolean,
    },
    sending: {
      default: false,
      type: Boolean,
    },
    loginUserId: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    visbleInlineLoading(): boolean {
      return this.isconnecting || this.sending;
    },
  },
  mounted() {},
  methods: {
    editPost(chatpost: TypeChatPost) {
      const footer: any = this.$refs.footer;
      footer.focusInput(chatpost);
    },
    focusElement(top: number) {
      const appbody: any = this.$refs.appbody;
      const $el = appbody.$el;
      const val = top + $el.scrollTop - 60;
      $el.scrollTo({
        top: val,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
ul {
  padding: 10px 0 30px;
}
.chat {
  background-color: #fff;
}
.loading-inline {
  padding: 30px 0 10px;
}
</style>
