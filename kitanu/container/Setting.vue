<template>
  <ViewSetting
    @close="$emit('close')"
    @logout="logout"
    @update-iconurl="updateIconurl"
    @update-username="updateUsername"
    @reset-password="resetPassword"
    @unregister="unregister"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { toast } from '@/common/util';
import ViewSetting from '@/components/ViewSetting.vue';
import { userStore } from '@/store';

type State = {};

export default Vue.extend({
  components: { ViewSetting },
  data(): State {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    async logout() {
      this.showLoading(true);
      const res = await userStore.Logout();
      this.showLoading(false);
      if (res.errorCode) {
        this.showConfirm({
          title: 'ログアウトにしっぱいヌ',
          text: `元気だせヨ`,
          withCancel: false,
        });
        return;
      }
      this.$emit('close');
    },
    async updateIconurl(url: string) {
      this.showLoading(true);
      const res = await userStore.UpdateLoginUser({
        photoURL: url,
      });
      this.showLoading(false);
      if (res.errorCode) {
        this.showConfirm({
          title: '更新しっぱい',
          text: res.errorMsg || `なんでだろ`,
          withCancel: false,
        });
        return;
      }
      toast('更新したヌ');
    },
    async updateUsername(username: string) {
      this.showLoading(true);
      const res = await userStore.UpdateLoginUser({
        displayName: username,
      });
      this.showLoading(false);
      if (res.errorCode) {
        toast('更新しっぱい');
        this.showConfirm({
          title: '更新しっぱい',
          text: res.errorMsg || `なんでだろ`,
          withCancel: false,
        });
        return;
      }
      toast('更新したヌ');
    },
    async resetPassword() {
      this.showLoading(true);
      const { email } = userStore.loginedUser;
      const res = await userStore.SendPasswordResetEmail(email);
      this.showLoading(false);
      if (res.errorCode) {
        toast('パスワード再設定メール送信にしっぱい');
      } else {
        toast('パスワード再設定メール送信したヌ');
      }
    },
    async unregister() {
      this.showLoading(true);
      const res = await userStore.UnRegister();
      this.showLoading(false);
      if (res.errorCode) {
        toast('退会にしっぱい');
        this.showConfirm({
          title: '退会にしっぱいしたヌ',
          text: `なんでだろ`,
          withCancel: false,
        });
        return;
      }
      toast('退会に成功したヌ');
      this.showConfirm({
        title: '退会に成功したヌ',
        text: `いままでアリガト`,
        withCancel: false,
      });
      this.$emit('close');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
