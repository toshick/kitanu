<template>
  <section class="app view chat">
    <AppHeader>
      <a class="btn-back" @click.stop.prevent="goChatList"><ion-icon name="chevron-back" size="medium" /></a>

      <h1>{{ title }}</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header margin-left-auto" href=""><ion-icon name="log-in" size="medium" /></a>
        <a class="btn-header" @click="scrollBottom"><ion-icon name="log-in-outline" size="medium" /></a>
      </template>
    </AppHeader>
    <AppBody ref="appbody">
      <ChatInfo :infoitems="infoitems" />
      <ul>
        <li v-for="(i, index) in chatitems" :key="`${index}-${i.text}`">
          <ChatComment v-if="!i.npc" :myitem="i" :opposite="index % 2 === 1" :last="index === chatitems.length - 1" />
          <ChatCommentGood v-if="i.npc" :myitem="i" :last="index === chatitems.length - 1" />
        </li>
      </ul>
      <LoadingInline v-show="visbleInlineLoading" class="loading-inline" />
    </AppBody>
    <AppFooter mode="chat" @talk="startTalk" @menu="openMenu" @submit="onSubmit" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { openView, toast } from '@/common/util';
import mixinScrollview from '@/mixin/mxinScrollview';
import { ChatCommentType, ChatInfoItemType, FileItemType, PostSubmitItemType } from '@/components/types/app';
import { chatStore } from '@/store';
import ChatComment from './parts/ChatComment.vue';
import ChatCommentGood from './parts/ChatCommentGood.vue';
import ChatInfo from './parts/ChatInfo.vue';
import AppBody from './AppBody.vue';
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';
import TextInputModal from './parts/TextInputModal.vue';
import LoadingInline from './parts/LoadingInline.vue';

type State = {
  sending: boolean;
};

export default Vue.extend({
  name: 'AppChat',
  components: {
    ChatComment,
    ChatCommentGood,
    ChatInfo,
    AppFooter,
    AppHeader,
    AppBody,
    LoadingInline,
  },
  mixins: [mixinScrollview],
  props: {
    title: {
      default: 'むだい',
      type: String,
    },
    chatitems: {
      default: () => [],
      type: Array as PropType<ChatCommentType[]>,
    },
    infoitems: {
      default: () => [],
      type: Array as PropType<ChatInfoItemType[]>,
    },
    connecting: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {
      sending: false,
    };
  },
  computed: {
    visbleInlineLoading(): boolean {
      return this.connecting || this.sending;
    },
  },
  watch: {
    chatitems(newdata: ChatCommentType[], olddata: ChatCommentType[]) {
      if (newdata.length !== olddata.length) {
        setTimeout(() => {
          this.scrollBottomSmooth();
        }, 500);
      }
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    startTalk() {
      const $t = this.$el.closest('.mobileview') || null;

      openView({
        modalTitle: '確認しますヨ',
        target: $t,
        component: TextInputModal,
        klass: ['view-textinput'],
        compoParams: {
          confirmText: 'なんだかしらんけどよろしいですか？なんだかしらんけどよろしいですか？',
          onConfirm: () => {
            console.log('いえす');
          },
        },
      });
    },
    async onSubmit(p: { fileItem?: FileItemType; text: string; reset?: () => void; good?: number; fukitype: string }) {
      this.showInlineLoading(true);

      const param: PostSubmitItemType = {
        fileItem: p.fileItem || null,
        text: p.text,
        good: p.good || null,
        fukitype: p.fukitype,
        npc: false,
      };
      await chatStore.PostChat(param);
      toast('とーこうしたヌ');
      this.showInlineLoading(false);
      if (p.reset) p.reset();

      setTimeout(() => {
        this.kitanuTalk();
      }, 1000);
    },

    showInlineLoading(flg: boolean) {
      this.sending = flg;
      this.scrollBottom();
    },
    async kitanuTalk() {
      const param: PostSubmitItemType = {
        npc: true,
      };
      await chatStore.PostChat(param);
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
  padding: 0 0 40px;
}
</style>
