<template>
  <ChatList />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ChatList from '@/container/ChatList.vue';
// import { TypeUser } from '@/components/types/apptypes';

type State = {};

export default Vue.extend({
  components: { ChatList },
  data(): State {
    return {};
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
