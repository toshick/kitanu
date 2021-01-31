<template>
  <div>
    <!-- <p>total: {{ debugData.totalPosts }} {{ debugData.commentPosts }}</p> -->
    <ViewChatRoom
      :chat-posts="chatPosts"
      :info-items="infoItems"
      :isconnecting="connecting"
      :sending="sending"
      :login-user-id="loginUserID"
      @select-member="visibleSelectMember = true"
      @good="onGood"
      @edit="onEdit"
      @submit="onSubmit"
      @submit-comment="onSubmitComment"
      @submit-comment-edit="onSubmitCommentEdit"
      @remove-post="onRemovePost"
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
  ChatPostCreateRequest,
  ChatPostUpdateRequest,
} from '@/components/types/apptypes';
import { chatPostStore, chatinfoStore, userStore } from '@/store';
import { makeChatPost } from '@/common/helper';
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
    async onSubmit(p: ChatPostCreateRequest | ChatPostUpdateRequest) {
      await this.scrollTopSmooth();
      this.showInlineLoading(true);
      const { createdAt } = p;
      if (createdAt) {
        const res = await this.updatePost(p);
        if (res.errorMsg) {
          toast('こーしんしっぱいヌ');
        }
      } else {
        const res = await this.createPost(p);
        if (res.errorMsg) {
          toast('とーこうしっぱいヌ');
        }
      }
      this.showInlineLoading(false);
      toast('とーこうしタヌ');
      setTimeout(() => {
        this.scrollTopSmooth();
      }, 500);
    },
    createPost(p: ChatPostCreateRequest) {
      return chatPostStore.CreateChatPost({
        chatroomID: this.chatroomid,
        text: p.text,
        fukitype: p.fukitype,
      });
    },
    updatePost(p: ChatPostUpdateRequest) {
      return chatPostStore.UpdateChatPost({
        postid: p.postid,
        text: p.text,
        fukitype: p.fukitype,
        createdAt: p.createdAt,
      });
    },
    showInlineLoading(flg: boolean): void {
      this.sending = flg;
    },
    onSaveSelectMember(selectedMap: any) {
      this.visibleSelectMember = false;
    },
    async onGood(chatpostid: string) {
      const res = await chatPostStore.ToggleGood({
        chatpostID: chatpostid,
      });
      if (res.errorMsg) {
        toast('グッドしっぱいヌ');
      }
    },
    async onEdit(chatpostid: string) {
      // const res = await chatPostStore.ToggleGood({
      //   chatpostID: chatpostid,
      // });
      // if (res.errorMsg) {
      //   toast('グッドしっぱいヌ');
      // }
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
      this.showInlineLoading(true);
      const commentPost = makeChatPost({
        text: str,
        createdByID: this.loginUserID,
      });
      const res = await chatPostStore.AddChatPostComment({
        postid: chatpostid,
        commentPost,
      });
      this.showInlineLoading(false);
      if (res.errorMsg) {
        toast('コメントしっぱいヌ');
      }
      toast('コメントしタヌ');
    },
    async onSubmitCommentEdit(chatpostid: string, str: string) {
      console.log('onSubmitCommentEdit', chatpostid, str);
      this.showInlineLoading(true);
      const res = await chatPostStore.UpdateChatPost({
        postid: chatpostid,
        text: str,
      });
      this.showInlineLoading(false);
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
