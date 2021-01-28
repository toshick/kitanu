<template>
  <div>
    <ViewFriendList
      :members="members"
      @copy-friend-link="copyFriendLink"
      @select-friend="visibleAddFriend = true"
    />
    <!-- AddFriend -->
    <transition name="modal">
      <AddFriend
        v-if="visibleAddFriend"
        title="トモダチを追加ヌ"
        @close="visibleAddFriend = false"
        @save="onSaveAddFriend"
      />
    </transition>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { TypeUser, TypeUserDisp } from '@/components/types/apptypes';
import ViewFriendList from '@/components/ViewFriendList.vue';
import AddFriend from '@/container/AddFriend.vue';
import { appStore, userStore, friendStore } from '@/store';

type State = {
  visibleAddFriend: boolean;
};

export default Vue.extend({
  components: { ViewFriendList, AddFriend },
  data(): State {
    return {
      visibleAddFriend: false,
    };
  },
  computed: {
    members(): TypeUserDisp[] {
      return userStore.loginedUserFriends;
    },
  },
  watch: {
    members(newval: TypeUserDisp[], oldval: TypeUserDisp[]) {
      if (newval.length > oldval.length) {
        this.fetch();
      }
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      const ids = this.members.map((u: TypeUserDisp) => u.id);
      userStore.FetchUsers({ ids, omitIfExist: true });
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
    onSaveAddFriend(members: TypeUser[]) {
      console.log('onSaveAddFriend', members.length);

      this.visibleAddFriend = false;
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
