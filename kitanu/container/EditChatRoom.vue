<template>
  <ViewEditChatRoom
    :title="title"
    :members="members"
    :chatroom="chatroom"
    :login-user="loginUser"
    @close="$emit('close')"
    @save="onSave"
    @add="addMember"
    @remove-member="removeMember"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewEditChatRoom from '@/components/ViewEditChatRoom.vue';
// import SelectMember from '@/container/SelectMember.vue';
import AddFriend from '@/container/AddFriend.vue';
import {
  TypeChatRoom,
  TypeChatRoomDisp,
  TypeUserDisp,
  TypeUser,
  TypeUserID,
} from '@/components/types/apptypes';
import { chatListStore, userStore } from '@/store';
import { toast, ArrayUtil } from '@/common/util';

type State = {};

export default Vue.extend({
  components: { ViewEditChatRoom },
  props: {
    title: {
      default: 'ルーム編集ヌ',
      type: String,
    },
    chatroomid: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    members(): TypeUserDisp[] {
      return this.chatroom.members || [];
    },
    chatroom(): TypeChatRoomDisp {
      return chatListStore.getChatroomDisp(this.chatroomid);
    },
    loginUser(): TypeUserDisp {
      return userStore.loginedUserDisp;
    },
  },
  created() {
    const ids = chatListStore.getUserIDsByChatRoom([this.chatroom]);
    userStore.FetchUsers({ ids, omitIfExist: true });
  },
  methods: {
    async onSave(p: { title: string; members: TypeUserDisp[] }) {
      this.showLoading(true);
      const params: Partial<TypeChatRoom> = {
        id: this.chatroomid,
      };
      if (p.title) params.title = p.title;
      if (p.members) {
        params.memberIDs = ArrayUtil.Unique(
          p.members.map((u: TypeUserDisp) => u.id),
        );
      }

      await chatListStore.UpdateChatRoom(params);
      toast('更新しタヌ');
      this.$emit('close');
      this.showLoading(false);
    },
    addMember() {
      const res = this.openView({
        component: AddFriend,
        klass: ['view-selectmember'],
        compoParams: {
          title: 'ルームメンバついか',
          existsMember: this.members,
        },
        on: {
          save: async (list: TypeUser[]) => {
            console.log('ほぞんんだ', list);
            this.showLoading(true);
            const res = await chatListStore.UpdateChatRoom({
              id: this.chatroomid,
              memberIDs: this.chatroom.memberIDs.concat(
                list.map((u: TypeUser) => u.id),
              ),
            });
            this.showLoading(false);
            if (res.errorMsg) {
              toast(`ルームメンバ追加しっぱいヌ`);
              return;
            }
            toast('ルームメンバ追加したヌ');
            close();
          },
        },
      });
      function close() {
        res.close();
      }
    },
    async removeMember(userID: string) {
      const memberIDs = this.chatroom.memberIDs.filter((id: TypeUserID) => {
        return id !== userID;
      });
      if (memberIDs.length === 0) return;
      this.showLoading(true);
      console.log('removeMember222', memberIDs);
      const res = await chatListStore.UpdateChatRoom({
        id: this.chatroomid,
        memberIDs,
      });
      this.showLoading(false);
      if (res.errorMsg) {
        toast(`ルームメンバ削除しっぱいヌ`);
        return;
      }
      toast('ルームメンバ削除したヌ');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
