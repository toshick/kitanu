<template>
  <ViewAddFriend
    :title="title"
    :members="members"
    :friends="friends"
    :search-result="searchResult"
    :searched="searched"
    @close="close"
    @save="onSave"
    @search="onSearch"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewAddFriend from '@/components/ViewAddFriend.vue';
import {
  TypeUser,
  TypeUserID,
  TypeUserDisp,
} from '@/components/types/apptypes';
import { userStore } from '@/store';
import { makeUser } from '~/common/helper';

type State = {
  searchResult: TypeUser[];
  searched: boolean;
};

export default Vue.extend({
  components: { ViewAddFriend },
  props: {
    title: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {
      searchResult: [],
      searched: false,
    };
  },
  computed: {
    members(): TypeUserDisp[] {
      return userStore.loginedUserFriends;
    },
    friends(): TypeUserID[] {
      return userStore.loginedUserFriends
        .map((u: TypeUserDisp) => u.id)
        .concat([userStore.loginedUser.id]);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      const ids = userStore.loginedUser.friendIdList;
      userStore.FetchUsers({ ids, omitIfExist: true });
    },
    async onSearch(str: string) {
      this.searched = false;
      if (!str) {
        this.searchResult = [];
        return;
      }

      const res: any = await userStore.SearchUser(str);
      this.searched = true;
      this.searchResult = res.list.map((u: any) => makeUser(u));
    },
    async onSave(list: TypeUser[]) {
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
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
