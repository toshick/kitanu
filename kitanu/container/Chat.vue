<template>
  <div>
    <ViewChat
      :chatitems="chatitems"
      :infoitems="infoitems"
      :connecting="connecting"
      :sending="sending"
      :submit="onSubmit"
      :close="$emit('close')"
      @selectMember="visibleSelectMember = true"
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
import { toast } from '@/common/util';
import ViewChat from '@/components/ViewChat.vue';
import SelectMember from '@/container/SelectMember.vue';
import {
  TypeChatComment,
  TypeChatInfoItem,
  TypePostSubmitItem,
  TypeFileItem,
  TypeUser,
} from '@/components/types/app';
import { chatStore, chatinfoStore } from '@/store';

type State = {
  connecting: boolean;
  sending: boolean;
  visibleSelectMember: boolean;
};

export default Vue.extend({
  components: { ViewChat, SelectMember },
  data(): State {
    return {
      connecting: false,
      sending: false,
      visibleSelectMember: false,
    };
  },
  computed: {
    chatitems(): TypeChatComment[] {
      return chatStore.chatitems;
    },
    infoitems(): TypeChatInfoItem[] {
      return chatinfoStore.infoitems;
    },
    members(): TypeUser[] {
      return chatStore.members;
    },
  },
  async mounted() {
    this.connecting = true;
    await chatStore.FetchPost();
    this.connecting = false;
  },
  methods: {
    async onSubmit(p: {
      fileItem?: TypeFileItem;
      text: string;
      reset?: () => void;
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
      toast('とーこうしたヌ');
      this.showInlineLoading(false);
      if (p.reset) p.reset();

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
