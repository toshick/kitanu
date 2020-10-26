<template>
  <div>
    <ViewFriendList :members="members" @add-friend="addFriend" />
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { TypeUser } from '@/components/types/app';
import ViewFriendList from '@/components/ViewFriendList.vue';
import { appStore, friendStore } from '@/store';

type State = {};

export default Vue.extend({
  components: { ViewFriendList },
  data(): State {
    return {};
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
      friendStore.FetchFriends(appStore.logined.id);
    },
    async addFriend() {
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
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
