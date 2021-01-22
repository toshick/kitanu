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
            :is-self-post="i.createdByID == loginUserId"
            @good="(chatpostid) => $emit('good', chatpostid)"
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
  methods: {},
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
