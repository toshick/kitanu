<template>
  <div>
    <ViewChatRoom
      :chat-posts="chatPosts"
      :info-items="infoItems"
      :isconnecting="connecting"
      :sending="sending"
      :login-user-id="loginUserID"
      @submit="onSubmit"
      @select-member="visibleSelectMember = true"
      @good="onGood"
    />
    <!-- SelectMember -->
    <transition name="modal">
      <SelectMember
        v-if="visibleSelectMember"
        :members="members"
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
import mixinScrollview from '@/mixin/mxinScrollview';
import { toast } from '@/common/util';
import ViewChatRoom from '@/components/ViewChatRoom.vue';
import SelectMember from '@/container/SelectMember.vue';
import {
  TypeChatPost,
  TypeChatInfoItem,
  TypeUserID,
  TypeFile,
  TypeUser,
} from '@/components/types/apptypes';
import { chatRoomStore, chatinfoStore, userStore } from '@/store';
import { postItems } from '@/mock/mockdata';

type State = {
  sending: boolean;
  visibleSelectMember: boolean;
};

export default Vue.extend({
  name: 'ChatRoom',
  components: { ViewChatRoom, SelectMember },
  mixins: [mixinScrollview],
  props: {
    chatroomid: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {
      sending: false,
      visibleSelectMember: false,
    };
  },
  computed: {
    chatPosts(): TypeChatPost[] {
      return chatRoomStore.chatPosts;
    },
    infoItems(): TypeChatInfoItem[] {
      return chatinfoStore.infoItems;
    },
    members(): TypeUser[] {
      return chatRoomStore.members;
    },
    loginUserID(): TypeUserID {
      return userStore.loginedUser.id;
    },
  },
  watch: {
    chatPosts(newdata: TypeChatPost[], olddata: TypeChatPost[]) {
      if (newdata.length !== olddata.length) {
        setTimeout(() => {
          this.scrollTopSmooth();
        }, 500);
        this.fetchUsers();
      }
    },
  },
  mounted() {
    chatRoomStore.Reset();
    chatRoomStore.Listen(this.chatroomid);
  },
  beforeDestroy() {
    chatRoomStore.Listen();
  },
  methods: {
    fetchUsers() {
      const ids: TypeUserID[] = chatRoomStore.getUserIDsByChatPosts(
        this.chatPosts,
      );
      userStore.FetchUsers({ ids, omitIfExist: true });
    },
    async onSubmit(p: {
      fileItem?: TypeFile;
      text: string;
      good?: number;
      fukitype: string;
    }) {
      await this.showInlineLoading(true);
      const res = await chatRoomStore.CreateChatPost({
        chatroomID: this.chatroomid,
        text: p.text,
      });
      this.showInlineLoading(false);
      if (res.errorMsg) {
        toast('とーこうしっぱいヌ');
        return;
      }

      toast('とーこうしタヌ');
    },
    showInlineLoading(flg: boolean): Promise<void> {
      this.sending = flg;
      if (!flg) return Promise.resolve();
      return this.scrollTopSmooth();
    },
    onSaveSelectMember(selectedMap: any) {
      this.visibleSelectMember = false;
    },
    async onGood(chatpostid: string) {
      const res = await chatRoomStore.ToggleGood({
        chatpostID: chatpostid,
      });
      if (res.errorMsg) {
        toast('グッドしっぱいヌ');
      }
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
