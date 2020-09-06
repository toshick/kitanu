<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" href=""><ion-icon name="chevron-back" size="medium" /></a>
      <h1>Member</h1>
      <!-- right -->
      <template v-slot:right>
        <a href=""><ion-icon name="restaurant-outline" size="medium" /></a>
      </template>
    </AppHeader>
    <AppBody>
      <h2><input class="ca-input-editablelabel" value="アジをたんと釣りにいこうの会" /></h2>
      <div class="member-add">
        <CaButton size="S" class="btn-add-member" @click="addMember"> メンバー追加 </CaButton>
      </div>

      <ul class="member-list">
        <li v-for="(u, index) in members" :key="`member-${index}-${u.username}`">
          <UserIcon :url="u.iconurl" />
          <div class="member-label">
            <h3>{{ u.username }}</h3>
            <p v-if="u.subtext">{{ u.subtext }}</p>
          </div>
        </li>
      </ul>
    </AppBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import CaModalPG from 'camaleao-design/components/CaModalPG';
import { openDialog } from '@/common/util';
import AppHeader from './AppHeader.vue';
import UserIcon from './parts/UserIcon.vue';
import { User } from './types/app';

type State = {
  members: User[];
};

const members: User[] = [];
members.push({ username: 'にゃんごろう', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'いつだってオレンジ' });
members.push({ username: 'カマキチ', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'そろそろキャンプしたいぞ' });
members.push({ username: 'エドブラウン', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: '' });
members.push({ username: 'サルバトーレトスカニーニ', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'スパゲティつくってみた' });

export default Vue.extend({
  name: 'AppMember',
  components: {
    AppHeader,
    UserIcon,
  },
  props: {},
  data(): State {
    return {
      members,
    };
  },
  mounted() {},
  methods: {
    addMember() {
      const $t = this.$el.closest('.mobileview') || null;

      openDialog({
        modalTitle: '確認しますヨ',
        confirmText: 'なんだかしらんけどよろしいですか？なんだかしらんけどよろしいですか？',
        onConfirm: () => {
          console.log('いえす');
        },
        target: $t,
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.setting-body {
  padding: 20px;
  color: var(--app-color-dark);
}
h2 {
  padding: 30px;
  font-size: var(--fontsize-medium);
  font-weight: normal;
  color: var(--app-color-dark);
  text-align: center;
}
.member-list {
  padding: 20px;
  li {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
}
.member-label {
  margin-left: 1em;
  color: var(--app-color-dark);
  h3 {
    font-size: var(--fontsize-medium);
  }
  p {
    font-size: var(--fontsize-small);
  }
}
.ca-input-editablelabel {
  width: 100%;
  text-align: center;
  font-size: var(--fontsize-medium);
  color: var(--app-color-dark);
}
.member-add {
  text-align: center;
}
.btn-add-member {
  // display: inline-flex;
  // align-items: center;
}
</style>
