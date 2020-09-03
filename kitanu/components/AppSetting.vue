<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" href=""><ion-icon name="chevron-back" size="medium" /></a>
      <h1>設定</h1>
      <a @click="showModalPolicy"><ion-icon name="build-outline" size="medium" /></a>
    </AppHeader>
    <div class="setting-body">
      <div class="setting-user">
        <UserIcon url="https://avatars3.githubusercontent.com/u/6635142?s=460&v=4" />
        <p>せかいのとしっく</p>
      </div>

      <ul class="setting-menu">
        <li>
          <a @click="showModalPolicy">本人確認</a>
        </li>
        <li>
          <a @click="showModalPolicy">ともだちリスト</a>
        </li>
        <li>
          <a @click="showModalPolicy">プライバシーポリシー</a>
        </li>
        <li>
          <a @click="showModalKiyauku">利用規約</a>
        </li>

        <li>
          <a @click="logout">ログアウト</a>
        </li>
      </ul>
    </div>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { openView, openDialog } from '@/common/util';
import AppHeader from './AppHeader.vue';
import UserIcon from './parts/UserIcon.vue';
import PrivacyPolicy from './parts/PrivacyPolicy.vue';
import Kiyaku from './parts/Kiyaku.vue';

type State = {};

export default Vue.extend({
  name: 'AppSetting',
  components: {
    AppHeader,
    UserIcon,
  },
  props: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    showModalPolicy() {
      const $t = this.$el.closest('.mobileview') || null;
      openView({
        modalTitle: 'プライバシーポリシーヌ',
        target: $t,
        component: PrivacyPolicy,
      });
    },
    showModalKiyauku() {
      const $t = this.$el.closest('.mobileview') || null;
      openView({
        modalTitle: '利用規約ヌ',
        target: $t,
        component: Kiyaku,
      });
    },
    logout() {
      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: 'ログアウト',
        confirmText: 'よろしいヌ？',
        btnLabel: 'ログアウトヌ',
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
.setting-user {
  display: flex;
  align-items: center;
  p {
    margin-left: 1em;
  }
}
.setting-menu {
  margin-top: 20px;

  li {
    margin: 20px 0;
  }
  a {
    text-decoration: none;
    font-size: var(--fontsize-normal);
    color: var(--app-color-dark);
  }
}
</style>
