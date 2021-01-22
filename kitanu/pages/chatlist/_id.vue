<template>
  <ChatRoom :chatroomid="id" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ChatRoom from '@/container/ChatRoom.vue';

type State = {};

export default Vue.extend({
  name: 'ChatDetail',
  components: { ChatRoom },
  data(): State {
    return {};
  },
  computed: {
    id(): string {
      return this.$route.params.id;
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
