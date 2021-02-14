<template>
  <ViewSelectMember
    :login-user="loginUser"
    :title="title"
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
import { TypeUser, TypeUserDisp } from '@/components/types/apptypes';
import { appStore, userStore } from '@/store';

type State = {};

export default Vue.extend({
  components: { ViewSelectMember },
  props: {
    title: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    members(): TypeUserDisp[] {
      return userStore.loginedUserFriends;
    },
    loginUser(): TypeUserDisp {
      return userStore.loginedUserDisp;
    },
  },
  mounted() {
    const ids = this.members.map((u: TypeUserDisp) => u.id);
    userStore.FetchUsers({ ids, omitIfExist: true });
  },
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
