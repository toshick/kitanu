<template>
  <div>
    <ViewChatList
      :chatlist="chatlist"
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
import { userStore, chatListStore } from '@/store';

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
    chatlist(): TypeChatRoom[] {
      return chatListStore.chatlist;
    },
  },
  watch: {
    chatlist(newval: TypeChatRoom[], oldval: TypeChatRoom[]) {
      if (newval.length > oldval.length) {
        this.fetchUsers();
      }
    },
  },
  mounted() {},
  methods: {
    fetchUsers() {
      const ids: TypeUserID[] = chatListStore.getUserIDsByChatRoom(
        this.chatlist,
      );
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
      await chatListStore.CreateChatRoom({
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
