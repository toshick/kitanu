<template>
  <AppChat :chatitems="chatitems" :infoitems="infoitems" :connecting="connecting" />
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
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
