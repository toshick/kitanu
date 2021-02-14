<template>
  <div>
    <ViewChatRoom
      :title="chatRoom.title"
      :chat-posts="chatPosts"
      :info-items="infoItems"
      :isconnecting="connecting"
      :sending="sending"
      :login-user-id="loginUserID"
      @edit="visibleEditChatRoom = true"
      @good="onGood"
      @submit="onSubmit"
      @submit-comment="onSubmitComment"
      @update-comment="onSubmitCommentEdit"
      @remove-post="onRemovePost"
    />
    <!-- EditChatRoom -->
    <transition name="modal">
      <EditChatRoom
        v-if="visibleEditChatRoom"
        :chatroomid="chatroomid"
        @close="visibleEditChatRoom = false"
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
import EditChatRoom from '@/container/EditChatRoom.vue';
import {
  TypeChatRoomDisp,
  TypeChatPost,
  TypeChatInfoItem,
  TypeUserID,
  TypeUser,
  ChatPostCreateRequest,
  ChatPostUpdateRequest,
} from '@/components/types/apptypes';
import {
  chatListStore,
  chatPostStore,
  chatinfoStore,
  userStore,
} from '@/store';
import { makeChatPost } from '@/common/helper';

type State = {
  sending: boolean;
  visibleEditChatRoom: boolean;
};

export default Vue.extend({
  name: 'ChatRoom',
  components: { ViewChatRoom, EditChatRoom },
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
      visibleEditChatRoom: false,
    };
  },
  computed: {
    chatRoom(): TypeChatRoomDisp {
      return chatListStore.getChatroomDisp(this.chatroomid);
    },
    chatPosts(): TypeChatPost[] {
      return chatPostStore.chatPosts;
    },
    infoItems(): TypeChatInfoItem[] {
      return chatinfoStore.infoItems;
    },
    members(): TypeUser[] {
      return chatPostStore.members;
    },
    loginUserID(): TypeUserID {
      return userStore.loginedUser.id;
    },
    debugData(): { totalPosts: number; commentPosts: number } {
      const ret = { totalPosts: 0, commentPosts: 0 };
      ret.totalPosts = this.chatPosts.length;
      this.chatPosts.forEach((p: TypeChatPost) => {
        ret.commentPosts += p.comments.length;
      });
      return ret;
    },
  },
  watch: {
    chatPosts(newdata: TypeChatPost[], olddata: TypeChatPost[]) {
      if (newdata.length !== olddata.length) {
        // setTimeout(() => {
        //   this.scrollTopSmooth();
        // }, 500);
        this.fetchUsers();
      }
    },
  },
  mounted() {
    chatPostStore.Reset();
    chatPostStore.Listen(this.chatroomid);
  },
  beforeDestroy() {
    chatPostStore.Listen();
  },
  methods: {
    fetchUsers() {
      const ids: TypeUserID[] = chatPostStore.getUserIDsByChatPosts(
        this.chatPosts,
      );
      userStore.FetchUsers({ ids, omitIfExist: true });
    },
    async onSubmit(p: ChatPostCreateRequest) {
      await this.scrollTopSmooth();
      this.showLoading(true);
      const res = await chatPostStore.CreateChatPost({
        ...p,
        chatroomID: this.chatroomid,
      });
      this.showLoading(false);
      if (res.errorMsg) {
        toast('とーこうしっぱいヌ');
        return;
      }
      toast('とーこうしタヌ');
      setTimeout(() => {
        this.scrollTopSmooth();
      }, 500);
    },
    updatePost(p: ChatPostUpdateRequest) {
      return chatPostStore.UpdateChatPost({
        postid: p.postid,
        text: p.text,
        fukitype: p.fukitype,
        createdAt: p.createdAt,
      });
    },
    // showInlineLoading(flg: boolean): void {
    //   this.sending = flg;
    // },
    async onGood(chatpostid: string) {
      const res = await chatPostStore.ToggleGood({
        chatpostID: chatpostid,
      });
      if (res.errorMsg) {
        toast('グッドしっぱいヌ');
      }
    },
    async onRemovePost(chatpostid: string) {
      const res = await chatPostStore.RemoveChatPost(chatpostid);
      if (res.errorMsg) {
        toast(`投稿削除しっぱいヌ ${res.errorMsg}`);
        return;
      }
      toast('投稿削除したヌ');
    },
    async onSubmitComment(chatpostid: string, str: string) {
      // this.showInlineLoading(true);
      const commentPost = makeChatPost({
        text: str,
        createdByID: this.loginUserID,
      });
      const res = await chatPostStore.AddChatPostComment({
        postid: chatpostid,
        commentPost,
      });
      // this.showInlineLoading(false);
      if (res.errorMsg) {
        toast('コメントしっぱいヌ');
      }
      toast('コメントしタヌ');
    },
    async onSubmitCommentEdit(chatpostid: string, str: string) {
      console.log('onSubmitCommentEdit', chatpostid, str);
      // this.showInlineLoading(true);
      const res = await chatPostStore.UpdateChatPost({
        postid: chatpostid,
        text: str,
      });
      // this.showInlineLoading(false);
      if (res.errorMsg) {
        toast('コメント編集しっぱいヌ');
      }
      toast('コメント編集しタヌ');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
