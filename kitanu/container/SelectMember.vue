<template>
  <ViewSelectMember
    :members="members"
    @close="$emit('close')"
    @save="(list) => $emit('save', list)"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewSelectMember from '@/components/ViewSelectMember.vue';
import { TypeUser } from '@/components/types/app';
import { appStore, friendStore } from '@/store';

type State = {};

export default Vue.extend({
  components: { ViewSelectMember },
  props: {},
  data(): State {
    return {};
  },
  computed: {
    members(): TypeUser[] {
      return friendStore.friends;
    },
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    fetchFriends() {
      friendStore.RESET_FRIEND();
      friendStore.FetchFriends(appStore.logined?.id);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
