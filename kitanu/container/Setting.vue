<template>
  <ViewSetting @close="$emit('close')" @logout="logout" />
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
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
