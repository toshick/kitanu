<template>
  <ViewSetting
    @close="$emit('close')"
    @logout="logout"
    @update-iconurl="updateIconurl"
    @update-username="updateUsername"
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
      const res = await userStore.Logout();

      if (res) {
        this.$emit('close');
      } else {
        this.showConfirm({
          title: 'ログアウトにしっぱいヌ',
          text: `元気だせヨ`,
          withCancel: false,
        });
      }
    },
    async updateIconurl(url: string) {
      const res = await userStore.UpdateLoginUser({
        photoURL: url,
      });
      if (res) {
        toast('更新したヌ');
      }
    },
    async updateUsername(username: string) {
      const res = await userStore.UpdateLoginUser({
        displayName: username,
      });
      if (res) {
        toast('更新したヌ');
      }
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
