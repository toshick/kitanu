<template>
  <ViewAddFriend
    :title="title"
    :exists-member="existsMember"
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
import Vue, { PropType } from 'vue';
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
    existsMember: {
      default: [],
      type: Array as PropType<TypeUser[]>,
    },
  },
  data(): State {
    return {
      searchResult: [],
      searched: false,
    };
  },
  computed: {},
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
    onSave(list: TypeUser[]) {
      this.$emit('save', list);
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
