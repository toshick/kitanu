<template>
  <div>
    <ViewChatList
      :chatrooms="chatrooms"
      @selected="onSelected"
      @addchat="visibleSelectMember = true"
    />
    <!-- SelectMember -->
    <transition name="modal">
      <SelectMember
        v-if="visibleSelectMember"
        title="チャットルームをつくろうヌ"
        @close="visibleSelectMember = false"
        @save="onSaveSelectMember"
      />
    </transition>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import {
  TypeUserID,
  TypeUserDisp,
  TypeChatRoom,
} from '@/components/types/apptypes';
import ViewChatList from '@/components/ViewChatList.vue';
import SelectMember from '@/container/SelectMember.vue';
import { userStore, chatStore } from '@/store';

type State = {
  visibleSelectMember: boolean;
};

export default Vue.extend({
  components: { ViewChatList, SelectMember },
  data(): State {
    return {
      visibleSelectMember: false,
    };
  },
  computed: {
    chatrooms(): TypeChatRoom[] {
      return chatStore.chatrooms;
    },
  },
  watch: {
    chatrooms(newval: TypeChatRoom[], oldval: TypeChatRoom[]) {
      if (newval.length > oldval.length) {
        this.fetchUsers();
      }
    },
  },
  mounted() {},
  methods: {
    fetchUsers() {
      const ids: TypeUserID[] = chatStore.getUserIDsByChatroom(this.chatrooms);
      userStore.FetchUsers({ ids, omitIfExist: true });
    },
    onSelected(id: string) {
      this.$router.push(`/chatlist/${id}`);
    },
    /**
     * create new chat room
     */
    async onSaveSelectMember(members: TypeUserDisp[]) {
      this.showLoading(true);
      await chatStore.CreateChatRoom({
        userID: userStore.loginedUser.id,
        users: members,
      });
      this.visibleSelectMember = false;
      this.showLoading(false);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
