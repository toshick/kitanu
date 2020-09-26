<template>
  <AppChat :chatitems="chatitems" :infoitems="infoitems" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import AppChat from '@/components/AppChat.vue';
import { ChatCommentType, ChatInfoItemType } from '@/components/types/app';
import { chatStore, chatinfoStore } from '@/store';

type State = {};

export default Vue.extend({
  name: 'PageAppChat',
  components: { AppChat },
  computed: {
    chatitems(): ChatCommentType[] {
      return chatStore.chatitems;
    },
    infoitems(): ChatInfoItemType[] {
      return chatinfoStore.infoitems;
    },
  },
  async mounted() {
    this.showLoading(true);
    await chatStore.FetchPost();
    this.showLoading(false);
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
