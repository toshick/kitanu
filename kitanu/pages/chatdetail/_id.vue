<template>
  <Chat />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import Chat from '@/container/Chat.vue';

type State = {};

export default Vue.extend({
  name: 'ChatDetail',
  components: { Chat },
  data(): State {
    return {};
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
