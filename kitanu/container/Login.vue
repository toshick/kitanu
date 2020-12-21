<template>
  <ViewLogin
    ref="view"
    @login-facebook="loginByFacebook"
    @login-google="loginByGoogle"
    @login-dev="loginByDev"
    @reset-password="resetPassword"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewLogin from '@/components/ViewLogin.vue';
import { userStore } from '@/store';
type State = {};

const errorMsgLogin: { [key: string]: string } = {
  'auth/user-not-found': 'しっぱいした。元気だせヨ',
  'auth/wrong-password': 'ダメだった。元気だせヨ',
};

export default Vue.extend({
  components: { ViewLogin },
  data(): State {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    async loginByFacebook() {
      if (this.connecting) return;
      this.showLoading(true);
      const res = await userStore.LoginByFacebook();
      this.showLoading(false);
      if (res.errorCode) {
        this.showConfirm({
          title: 'FBログイン失敗',
          text: `元気だせヨ`,
          withCancel: false,
          isDanger: true,
        });
        return;
      }
      this.$router.push('/');
    },
    async loginByGoogle() {
      if (this.connecting) return;
      this.showLoading(true);
      const res = await userStore.LoginByGoogle();
      this.showLoading(false);
      if (res.errorCode) {
        this.showConfirm({
          title: 'Googleログイン失敗',
          text: `元気だせヨ`,
          withCancel: false,
          isDanger: true,
        });
        return;
      }
      this.$router.push('/');
    },
    async loginByDev(data: { email: string; password: string }) {
      if (this.connecting) return;
      this.showLoading(true);
      const { email, password } = data;
      const res = await userStore.LoginWithPassword({
        email,
        password,
      });
      this.showLoading(false);
      if (res.errorCode) {
        this.showConfirm({
          title: 'ログイン失敗',
          text: errorMsgLogin[res.errorCode] || `元気だせヨ`,
          withCancel: false,
          isDanger: true,
        });
        return;
      }
      this.$router.push('/');
    },
    async resetPassword(email: string) {
      if (this.connecting) return;
      this.showLoading(true);
      const res = await userStore.SendPasswordResetEmail(email);
      this.showLoading(false);
      if (res.errorCode) {
        this.showConfirm({
          title: 'リセット失敗',
          text: `元気だせヨ`,
          withCancel: false,
          isDanger: true,
        });
        return;
      }
      this.showConfirm({
        title: 'パスワードのリセット成功ヌ',
        text: `パスワードのリセットメールがとんだヌ`,
        withCancel: false,
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
