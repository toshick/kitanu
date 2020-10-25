<template>
  <ViewSignup ref="view" :registered="registered" @submit="onRegister" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { toast } from '@/common/util';
import ViewSignup from '@/components/ViewSignup.vue';
import { appStore } from '@/store';

type State = {
  registered: boolean;
};

export default Vue.extend({
  components: { ViewSignup },
  data(): State {
    return {
      registered: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onRegister(data: { name: string; mail: string }) {
      this.showConfirm(
        {
          title: 'キタキータヌに登録ヌ',
          text: `「${data.name}」<br>「${data.mail}」<br>よろしいヌ？`,
        },
        async () => {
          this.showLoading(true);
          const res = await appStore.Register(data);
          this.showLoading(false);
          if (res.error) {
            this.showConfirm({
              title: 'しっぱいヌ',
              text: `${res.msg}`,
              isDanger: true,
              withCancel: false,
              btnLabel: 'なるほど',
            });
            return;
          }
          toast('成功ヌ');
          this.registered = true;
        },
      );
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
