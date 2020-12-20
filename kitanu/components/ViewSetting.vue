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
        <a @click="editIcon">
          <UserIcon
            :url="loginedUser.photoURL"
            :username="loginedUser.displayName"
          />
        </a>
        <p>
          <a @click="editUserName">
            {{ loginedUser.displayName }}
          </a>
        </p>
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
import { userStore } from '@/store';
import { Input } from 'camaleao-design/components/type';
import { TypeLoginUser } from '@/components/types/app';

type State = {};

export default Vue.extend({
  name: 'ViewSetting',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  computed: {
    loginedUser(): TypeLoginUser {
      return userStore.loginedUser;
    },
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
    editIcon() {
      const inputs: Input[] = [];
      inputs.push({
        name: 'iconUrl',
        value: this.loginedUser.photoURL || '',
        placeholder: 'アイコンurl',
        width: 'L',
        // rules: 'required',
      });

      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: 'アイコンのurlをセット',
        target: $t,
        compoParams: {
          inputs,
          confirmText: 'よろしいヌ？',
          btnLabel: 'ヌ',
          onConfirm: ({ iconUrl }: { iconUrl: string }) => {
            this.$emit('update-iconurl', iconUrl);
          },
        },
      });
    },
    editUserName() {
      const inputs: Input[] = [];
      inputs.push({
        name: 'displayName',
        value: this.loginedUser.displayName || '',
        placeholder: 'オナマエ',
        width: 'L',
      });

      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: 'オナマエの変更だ',
        target: $t,
        compoParams: {
          inputs,
          confirmText: 'よろしいヌ？',
          btnLabel: 'ヌ',
          onConfirm: ({ displayName }: { displayName: string }) => {
            this.$emit('update-username', displayName);
          },
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
