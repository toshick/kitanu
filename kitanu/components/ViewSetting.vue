<template>
  <section class="app view">
    <ViewHeader>
      <a class="btn-back" @click.stop.prevent="$emit('close')"
        ><ion-icon name="chevron-back" size="medium"
      /></a>
      <h1>せってい</h1>
      <template v-slot:right>
        <a @click.stop.prevent="showModalPolicy"
          ><ion-icon name="finger-print-outline" size="medium"
        /></a>
      </template>
    </ViewHeader>
    <ViewBody>
      <div class="setting-user">
        <UserIcon
          url="https://avatars3.githubusercontent.com/u/6635142?s=460&v=4"
        />
        <p>せかいのとしっく</p>
      </div>

      <ul class="setting-menu">
        <li>
          <a @click.stop.prevent="showModalPolicy">本人確認</a>
        </li>
        <li>
          <a @click.stop.prevent="showModalPolicy">ともだちリスト</a>
        </li>
        <li>
          <a @click.stop.prevent="showModalPolicy">プライバシーポリシー</a>
        </li>
        <li>
          <a @click.stop.prevent="showModalKiyauku">利用規約</a>
        </li>

        <li>
          <a @click.stop.prevent="logout">ログアウト</a>
        </li>
      </ul>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { openModal, openDialog } from '@/common/util';
import ViewPrivacyPolicy from '@/components/ViewPrivacyPolicy.vue';
import ViewKiyaku from '@/components/ViewKiyaku.vue';

type State = {};

export default Vue.extend({
  name: 'ViewSetting',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    showModalPolicy() {
      const $t = this.$el.closest('.mobileview') || null;
      openModal({
        modalTitle: 'プライバシーポリシーヌ',
        target: $t,
        component: ViewPrivacyPolicy,
        klass: ['view-orange'],
      });
    },
    showModalKiyauku() {
      const $t = this.$el.closest('.mobileview') || null;
      openModal({
        modalTitle: '利用規約ヌ',
        target: $t,
        component: ViewKiyaku,
        klass: ['view-orange'],
      });
    },
    logout() {
      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: 'ログアウト',
        target: $t,
        compoParams: {
          btnLabel: 'ヌ',
          onConfirm: async () => {
            this.$emit('logout');
          },
          confirmText: 'よろしいヌ？',
        },
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.view {
  .app-body {
    color: var(--app-color-dark);
    padding: 20px;
  }
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
