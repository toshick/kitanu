<template>
  <ViewFriendList :members="members" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
// import dayjs from 'dayjs';
// import { v4 as uuidv4 } from 'uuid';
// import { toast } from '@/common/util';
import { TypeUser } from '@/components/types/app';
import ViewFriendList from '@/components/ViewFriendList.vue';
// import { postStore } from '@/store';

type State = {
  members: TypeUser[];
};

const members: TypeUser[] = [];
members.push({
  id: '00000001',
  username: 'にゃんごろう',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'いつだってオレンジ',
});
members.push({
  id: '00000002',
  username: 'カマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'そろそろキャンプしたいぞ',
});
members.push({
  id: '00000003',
  username: 'エドブラウン',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: '',
});
members.push({
  id: '00000004',
  username: 'サルバトーレトスカニーニ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'スパゲティつくってみた',
});

export default Vue.extend({
  components: { ViewFriendList },
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
