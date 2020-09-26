<template>
  <section class="app view">
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
          <ChatComment :myitem="i" :opposite="index % 2 === 1" />
        </li>
      </ul>
    </AppBody>
    <AppFooter mode="chat" @talk="startTalk" @menu="openMenu" @submit="onSubmit" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { openView, toast } from '@/common/util';
import { ChatCommentType, ChatInfoItemType, FileItemType, PostSubmitItemType } from '@/components/types/app';
import { chatStore } from '@/store';
import ChatComment from './parts/ChatComment.vue';
import ChatInfo from './parts/ChatInfo.vue';
import AppBody from './AppBody.vue';
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';
import TextInputModal from './parts/TextInputModal.vue';

type State = {};

export default Vue.extend({
  name: 'AppChat',
  components: {
    ChatComment,
    ChatInfo,
    AppFooter,
    AppHeader,
    AppBody,
  },
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
  },
  data(): State {
    return {
      // items: items.concat(items),
      // infoitems,
    };
  },
  watch: {
    chatitems(newdata: ChatCommentType[], olddata: ChatCommentType[]) {
      if (newdata.length !== olddata.length) {
        // scroll to bottom
        this.scrollBottom();
      }
    },
  },
  mounted() {
    this.scrollBottom();
  },
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
    async onSubmit(p: { fileItem: FileItemType; text: string; reset: () => void }) {
      // const fileItem = p.fileItem;

      this.showLoading(true);

      const param: PostSubmitItemType = {
        fileItem: p.fileItem,
        text: p.text,
      };
      await chatStore.PostChat(param);
      toast('とーこうしたヌ');
      this.showLoading(false);
      p.reset();
    },
    scrollBottom() {
      Array.from(Array(2)).forEach((_, n: number) => {
        setTimeout(() => {
          this.scrollBottomExe();
        }, 200 * n);
      });
    },
    scrollBottomExe() {
      const $el = this.$el.querySelector('.app-body') as Element;
      const bottom = $el.scrollHeight - $el.clientHeight;
      $el.scrollTo(0, bottom);
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
</style>
