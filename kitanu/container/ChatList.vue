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
import { TypeUser, TypeChatRoom } from '@/components/types/apptypes';
import ViewChatList from '@/components/ViewChatList.vue';
import SelectMember from '@/container/SelectMember.vue';
import { appStore, chatStore } from '@/store';
import { chatrooms } from '@/mock/mockdata';

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
      return chatrooms;
      // return chatStore.chatrooms;
    },
  },
  mounted() {},
  methods: {
    onSelected(id: string) {
      this.$router.push(`/chatlist/${id}`);
    },
    async onSaveSelectMember(members: TypeUser[]) {
      console.log('onSaveSelectMember', members.length);

      await chatStore.CreateChatRoom({
        loginuser: appStore.logined,
        users: members,
      });

      this.visibleSelectMember = false;
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
