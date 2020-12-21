<template>
  <ViewSignup ref="view" :registered="registered" @submit="onRegister" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/common/util';
import ViewSignup from '@/components/ViewSignup.vue';
import { userStore } from '@/store';

type State = {
  registered: boolean;
};

const errorMsgRegister: { [key: string]: string } = {
  'auth/email-already-in-use': 'そのメールアドレス、すでに使用されているヌ',
};
// gggggggggggggg
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
    onRegister(data: { name: string; email: string }) {
      const password = uuidv4();
      const { name, email } = data;
      this.showConfirm(
        {
          title: 'キタキータヌに登録ヌ',
          text: `「${name}」<br>「${email}」<br>よろしいヌ？`,
        },
        async () => {
          this.showLoading(true);
          const res = await userStore.Register({
            password,
            email,
          });

          // 登録
          this.showLoading(false);
          if (res.errorCode) {
            this.showConfirm({
              title: 'とうろくしっぱいヌ',
              text: errorMsgRegister[res.errorCode] || `なんか失敗したヌ`,
              isDanger: true,
              withCancel: false,
              btnLabel: 'なるほど',
            });
            return;
          }
          // パスワード変更メール送信
          const res2 = await userStore.SendPasswordResetEmail(email);
          if (res2.errorMsg) {
            this.showConfirm({
              title: 'パスワード変更メール送信しっぱいヌ',
              text: res2.errorMsg || `なんか失敗したヌ`,
              isDanger: true,
              withCancel: false,
              btnLabel: 'どうしよう',
            });
            return;
          }
          // ユーザ名更新
          const res3 = await userStore.UpdateLoginUser({
            displayName: name,
          });
          if (res3.errorMsg) {
            this.showConfirm({
              title: '名前の登録しっぱいヌ',
              text: res3.errorMsg || `なんか失敗したヌ`,
              isDanger: true,
              withCancel: false,
              btnLabel: 'どうしよう',
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
