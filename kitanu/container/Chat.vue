<template>
  <div>
    <ViewChat
      :chat-items="chatItems"
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
  TypeChatComment,
  TypeChatInfoItem,
  TypePostSubmitItem,
  TypeFile,
  TypeUser,
} from '@/components/types/apptypes';
import { chatStore, chatinfoStore } from '@/store';
import { postItems } from '@/mock/mockdata';

type State = {
  sending: boolean;
  visibleSelectMember: boolean;
};

export default Vue.extend({
  components: { ViewChat, SelectMember },
  mixins: [mixinScrollview],
  data(): State {
    return {
      sending: false,
      visibleSelectMember: false,
    };
  },
  computed: {
    chatItems(): TypeChatComment[] {
      return chatStore.chatItems;
    },
    infoItems(): TypeChatInfoItem[] {
      return chatinfoStore.infoItems;
    },
    members(): TypeUser[] {
      return chatStore.members;
    },
  },
  watch: {
    chatItems(newdata: TypeChatComment[], olddata: TypeChatComment[]) {
      if (newdata.length !== olddata.length) {
        setTimeout(() => {
          this.scrollBottomSmooth();
        }, 500);
        // this.fetch();
      }
    },
  },
  async mounted() {
    this.showLoading(true);
    await chatStore.FetchPost();
    this.showLoading(false);
  },
  methods: {
    async onSubmit(p: {
      fileItem?: TypeFile;
      text: string;
      // reset?: () => void;
      good?: number;
      fukitype: string;
    }) {
      this.showInlineLoading(true);

      const param: TypePostSubmitItem = {
        fileItem: p.fileItem || null,
        text: p.text,
        good: p.good || null,
        fukitype: p.fukitype,
        npc: false,
      };
      await chatStore.PostChat(param);
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
