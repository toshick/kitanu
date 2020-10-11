<template>
  <AppChat
    :chatitems="chatitems"
    :infoitems="infoitems"
    :connecting="connecting"
    :submit="onSubmit"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import AppChat from '@/components/AppChat.vue';
import { ChatCommentType, ChatInfoItemType } from '@/components/types/app';
import { chatStore, chatinfoStore } from '@/store';

type State = {
  connecting: boolean;
};

export default Vue.extend({
  name: 'PageAppChat',
  components: { AppChat },
  data(): State {
    return {
      connecting: false,
    };
  },
  computed: {
    chatitems(): ChatCommentType[] {
      return chatStore.chatitems;
    },
    infoitems(): ChatInfoItemType[] {
      return chatinfoStore.infoitems;
    },
  },
  async mounted() {
    this.connecting = true;
    await chatStore.FetchPost();
    this.connecting = false;
  },
  methods: {
    async onSubmit(p: {
      fileItem?: FileItemType;
      text: string;
      reset?: () => void;
      good?: number;
      fukitype: string;
    }) {
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

      if (!p.good) {
        setTimeout(() => {
          this.kitanuTalk();
        }, 1000);
      }
    },
    showInlineLoading(flg: boolean) {
      this.sending = flg;
      this.scrollBottom();
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
