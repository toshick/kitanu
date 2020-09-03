<template>
  <div class="activity">
    <ul class="item-list">
      <li v-for="(i, index) in items" :key="`item-${index}-${i.user.username}`">
        <UserIcon :url="i.user.iconurl" />
        <div class="item-label">
          <!-- <h3>{{ i.user.username }}</h3> -->
          <p>{{ i.text }}</p>
          <p class="item-date">{{ i.date }}</p>
        </div>
      </li>
    </ul>
    <a class="btn-more" href=""><ion-icon name="chevron-down-outline" size="large" /></a>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { User } from '../types/app';
import UserIcon from './UserIcon.vue';

type Item = {
  user: User;
  text: string;
  date: string;
};

type State = {
  items: Item[];
};

let items: Item[] = [];
items.push({ user: { username: 'にゃんごろう', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'いつだってオレンジ' }, text: 'にゃんごろうが新しい投稿をしたーヌにゃんごろうが新しい投稿をしたーヌ', date: '2020.03.11' });
items.push({ user: { username: 'カマキチ', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'そろそろキャンプしたいぞ' }, text: 'にゃんごろうが新しい投稿をしたーヌ', date: '2020.03.11' });
items.push({ user: { username: 'エドブラウン', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: '' }, text: 'にゃんごろうが新しい投稿をしたーヌにゃんごろうが新しい投稿をしたーヌ', date: '2020.03.11' });
items.push({ user: { username: 'サルバトーレトスカニーニ', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'スパゲティつくってみた' }, text: 'にゃんごろうが新しい投稿をしたーヌにゃんごろうが新しい投稿をしたーヌにゃんごろうが新しい投稿をしたーヌ', date: '2020.03.11' });

for (let index = 0; index < 3; index++) {
  items = items.concat(items);
}

export default Vue.extend({
  name: 'ActivityList',
  components: { UserIcon },
  props: {},
  data(): State {
    return {
      items,
    };
  },
  computed: {},
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.activity {
}
.item-list {
  li {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: dashed 1px var(--app-color-dark);
  }
}
.item-label {
  flex: 1 0 0;
  margin-left: 1em;
  color: var(--app-color-dark);
  h3 {
    font-size: var(--fontsize-medium);
  }
  p {
    font-size: var(--fontsize-small);
  }
}
.item-date {
  text-align: right;
}
</style>
<style lang="scss">
.view-activitylist {
  .ca-modal-view {
    background-color: #ddcd61;
    background-image: url('/img/subtle-dark-vertical.png');
  }
}
</style>
