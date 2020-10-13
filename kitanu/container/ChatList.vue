<template>
  <ViewChatList :members="members" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
// import dayjs from 'dayjs';
// import { v4 as uuidv4 } from 'uuid';
// import { toast } from '@/common/util';
import { UserType } from '@/components/types/app';
import ViewChatList from '@/components/ViewChatList.vue';
// import { postStore } from '@/store';

type State = {
  members: UserType[];
};

const members: UserType[] = [];
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
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
