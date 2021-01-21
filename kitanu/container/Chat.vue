<template>
  <div>
    <ViewChat
      :chat-posts="chatPosts"
      :info-items="infoItems"
      :isconnecting="connecting"
      :sending="sending"
      @submit="onSubmit"
      @select-member="visibleSelectMember = true"
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
import ViewChat from '@/components/ViewChat.vue';
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
  name: 'Chat',
  components: { ViewChat, SelectMember },
  mixins: [mixinScrollview],
  props: {
    id: {
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
  },
  watch: {
    chatPosts(newdata: TypeChatPost[], olddata: TypeChatPost[]) {
      if (newdata.length !== olddata.length) {
        setTimeout(() => {
          this.scrollBottomSmooth();
        }, 500);
        this.fetchUsers();
      }
    },
  },
  mounted() {
    const { id } = this.$route.params;
    if (!id) {
      this.$router.push('/chatlist');
      return;
    }
    chatRoomStore.Listen(id);
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
      // reset?: () => void;
      good?: number;
      fukitype: string;
    }) {
      this.showInlineLoading(true);

      const param: TypeChatPost = {
        fileItem: p.fileItem || null,
        text: p.text,
        good: p.good || null,
        fukitype: p.fukitype,
        npc: false,
      };
      await chatRoomStore.PostChat(param);
      toast('とーこうしタヌ');
      this.showInlineLoading(false);
      // if (p.reset) p.reset();

      if (!p.good) {
        setTimeout(() => {
          // this.kitanuTalk();
        }, 1000);
      }
    },
    showInlineLoading(flg: boolean) {
      this.sending = flg;
      this.scrollBottom();
    },
    onSaveSelectMember(selectedMap: any) {
      this.visibleSelectMember = false;
      console.log('selectedMap', selectedMap);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
