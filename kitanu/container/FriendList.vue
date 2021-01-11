<template>
  <div>
    <ViewFriendList
      :members="members"
      @copy-friend-link="copyFriendLink"
      @select-friend="visibleSelectMember = true"
    />
    <!-- SelectMember -->
    <transition name="modal">
      <SelectMember
        v-if="visibleSelectMember"
        title="トモダチを追加ヌ"
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
import { TypeUser } from '@/components/types/apptypes';
import ViewFriendList from '@/components/ViewFriendList.vue';
import SelectMember from '@/container/SelectMember.vue';
import { appStore, friendStore } from '@/store';

type State = {
  visibleSelectMember: boolean;
};

export default Vue.extend({
  components: { ViewFriendList, SelectMember },
  data(): State {
    return {
      visibleSelectMember: false,
    };
  },
  computed: {
    members(): TypeUser[] {
      return friendStore.friends;
    },
  },
  mounted() {
    friendStore.RESET_FRIEND();
    this.fetch();
  },
  methods: {
    fetch() {
      friendStore.FetchFriends();
    },
    async copyFriendLink() {
      this.showLoading(true);
      await friendStore.CreateFriendLink();
      this.showLoading(false);
      this.showConfirm(
        {
          title: '招待リンクをつくったヌ',
          text: `クリップボードにコピーしたゆえ<br>ごゆーじんに送ればよいヌ`,
          withCancel: false,
        },
        () => {
          console.log('うむ');
        },
      );
    },
    onSaveSelectMember(members: TypeUser[]) {
      console.log('onSaveSelectMember', members.length);

      // await chatStore.CreateChatRoom({
      //   loginuser: appStore.logined,
      //   users: members,
      // });

      this.visibleSelectMember = false;
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
