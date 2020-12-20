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
type State = {
  connecting: boolean;
};

export default Vue.extend({
  components: { ViewLogin },
  data(): State {
    return {
      connecting: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async loginByFacebook() {
      if (this.connecting) return;
      this.connecting = true;
      const res = await userStore.LoginByFacebook();
      this.connecting = false;
      if (res) {
        this.$router.push('/');
      } else {
        this.showConfirm({
          title: 'FBログイン失敗',
          text: `元気だせヨ`,
          withCancel: false,
          isDanger: true,
        });
      }
    },
    async loginByGoogle() {
      if (this.connecting) return;
      this.connecting = true;
      const res = await userStore.LoginByGoogle();
      this.connecting = false;
      if (res) {
        this.$router.push('/');
      } else {
        this.showConfirm({
          title: 'Googleログイン失敗',
          text: `元気だせヨ`,
          withCancel: false,
          isDanger: true,
        });
      }
    },
    async loginByDev() {
      if (this.connecting) return;
      this.connecting = true;
      const res = await userStore.LoginWithPassword({
        email: this.$config.DEV_USER_EMAIL,
        password: this.$config.DEV_USER_PASS,
      });
      this.connecting = false;
      if (res) {
        this.$router.push('/');
      } else {
        this.showConfirm({
          title: 'ログイン失敗',
          text: `元気だせヨ`,
          withCancel: false,
          isDanger: true,
        });
      }
    },
    resetPassword() {
      if (this.connecting) return;
      const { email } = userStore.loginedUser;
      this.showConfirm(
        {
          title: 'パスワードのリセットするヌ？',
          text: `リセットメールがとぶよ`,
        },
        async () => {
          this.connecting = true;
          const res = await userStore.SendPasswordResetEmail(email);
          this.connecting = false;
          if (res) {
            this.showConfirm({
              title: 'パスワードのリセット成功ヌ',
              text: `パスワードのリセットメールがとんだヌ`,
              withCancel: false,
            });
          }
        },
      );
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
