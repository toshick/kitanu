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
        :exists-member="members"
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
import {
  TypeUser,
  TypeUserID,
  TypeUserDisp,
} from '@/components/types/apptypes';
import ViewFriendList from '@/components/ViewFriendList.vue';
import AddFriend from '@/container/AddFriend.vue';
import { userStore, friendStore } from '@/store';

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
    async onSaveAddFriend(list: TypeUser[]) {
      this.showLoading(true);
      const res = await userStore.AddFriend(list);
      if (res.errorMsg) {
        this.showConfirm({
          title: 'トモダチついかしっぱいヌ',
          text: res.errorMsg || `なんか失敗したヌ`,
          isDanger: true,
          withCancel: false,
          btnLabel: 'どうしよう',
        });
        return;
      }
      this.showLoading(false);
      this.visibleAddFriend = false;
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
