<template>
  <ViewChatList :members="members" @selected="onSelected" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { TypeUser } from '@/components/types/app';
import ViewChatList from '@/components/ViewChatList.vue';

type State = {
  members: TypeUser[];
};

const members: TypeUser[] = [];
members.push({
  id: '898808392',
  username: 'にゃんごろう',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'いつだってオレンジ',
});
members.push({
  id: '898808393',
  username: 'カマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'そろそろキャンプしたいぞ',
});

export default Vue.extend({
  components: { ViewChatList },
  data(): State {
    return {
      members,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onSelected(id: string) {
      this.$router.push(`/chatdetail/${id}`);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
