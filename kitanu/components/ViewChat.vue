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
      <ul>
        <li v-for="(i, index) in chatitems" :key="`${index}-${i.text}`">
          <ChatComment
            v-if="!i.npc"
            :myitem="i"
            :opposite="index % 2 === 1"
            :last="index === chatitems.length - 1"
          />
          <ChatCommentNPC
            v-if="i.npc"
            :myitem="i"
            :last="index === chatitems.length - 1"
          />
        </li>
      </ul>
      <LoadingInline v-show="visbleInlineLoading" class="loading-inline" />
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
  TypeChatComment,
  TypeChatInfoItem,
  TypeUser,
} from '@/components/types/app';

import ChatComment from './parts/ChatComment.vue';
import ChatCommentNPC from './parts/ChatCommentNPC.vue';
import LoadingInline from './parts/LoadingInline.vue';

type State = {};

export default Vue.extend({
  name: 'AppChat',
  components: {
    ChatComment,
    ChatCommentNPC,
    LoadingInline,
  },
  props: {
    title: {
      default: 'むだい',
      type: String,
    },
    chatitems: {
      default: () => [],
      type: Array as PropType<TypeChatComment[]>,
    },
    infoitems: {
      default: () => [],
      type: Array as PropType<TypeChatInfoItem[]>,
    },
    members: {
      default: () => [],
      type: Array as PropType<TypeUser[]>,
    },
    isconnecting: {
      default: false,
      type: Boolean,
    },
    sending: {
      default: false,
      type: Boolean,
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
    // close() {
    //   this.$emit('close');
    // },
    // startTalk() {
    //   const $t = this.$el.closest('.mobileview') || null;
    //   this.openView({
    //     modalTitle: '確認しますヨ',
    //     target: $t,
    //     component: TextInputModal,
    //     klass: ['view-textinput'],
    //     compoParams: {
    //       confirmText:
    //         'なんだかしらんけどよろしいですか？なんだかしらんけどよろしいですか？',
    //       onConfirm: () => {
    //         console.log('いえす');
    //       },
    //     },
    //   });
    // },
    // onSubmit(p: any) {
    //   this.$emit('submit', p);
    // },
    // selectMember() {
    //   this.$emit('selectMember');
    // },
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
  padding: 0 0 40px;
}
</style>
