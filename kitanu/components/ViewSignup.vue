<template>
  <section class="app view">
    <ViewHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
      />
      <h1>サインアップヌ</h1>
      <template v-slot:right>
        <p class="btn-header">
          <router-link to="/login" tag="span">
            <ion-icon name="swap-horizontal-outline" size="small" />
            login</router-link
          >
        </p>
      </template>
    </ViewHeader>
    <ViewBody class="signup-body">
      <section class="sec-intro">
        <div class="intro-body">
          <img class="cloud1" src="/img/top/cloud1.png" alt="" />
          <img class="cloud2" src="/img/top/cloud2.png" alt="" />
          <div class="title">
            <div class="title-cont">
              <img
                data-src="/img/tanu/tanu.png"
                :src="placeholderImg"
                class="tanu lazy"
                alt="kitanu"
              />
              <img
                data-src="/img/top/tanu-title.png"
                :src="placeholderImg"
                class="tanu-title lazy"
                alt="kitanu-title"
              />
            </div>
            <div class="des">
              <p>
                よーこそキタキータヌへ<br />
                キタキータヌではアルバムを共同で作成したりおしゃべりできるヌ。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section v-if="!registered" class="sec-signup">
        <ValidationObserver
          v-slot="{ invalid, handleSubmit }"
          tag="form"
          class="form"
        >
          <!-- <h1>Sign up</h1> -->
          <div class="ca-inputline">
            <CaInput
              v-model="form.name"
              class="-white"
              name="name"
              title="なまえ"
              rules="required|max:20"
              placeholder="オナマエ"
              width="L"
            ></CaInput>
          </div>
          <div class="ca-inputline">
            <CaInput
              v-model="form.email"
              class="-white"
              name="email"
              title="メール"
              rules="required|email"
              placeholder="メール"
              width="L"
            ></CaInput>
          </div>
          <div class="ca-inputline">
            <CaSwitch
              v-model="kiyaku"
              rules="required"
              label="規約に同意するヌ"
              required
            />
          </div>
          <div class="ca-inputline">
            <CaButton
              class="btn-signup"
              :disabled="invalid"
              width="L"
              @click="handleSubmit(submit)"
              >登録ヌ</CaButton
            >
          </div>
        </ValidationObserver>
      </section>
      <section v-else class="sec-registered">
        <h1 class="heading -center">
          登録成功じゃんヌ
          <ion-icon name="checkmark" size="large" />
        </h1>
        <p class="text">
          よーこそ {{ loginedUser.displayName }}！
          <br />
          メールを送ったので
          <br />
          パスワード再設定をするがよいヌ
          <br />
          でないとログインできなくなるヨ
        </p>
        <p class="text">
          <br />
          いろんなアルバムまっているヌ！
          <br />
          レッツエンジョイキタキータヌ！
        </p>

        <div class="ca-inputline">
          <CaButton class="btn-start" width="L" @click="goTop"
            >トップへ</CaButton
          >
        </div>
      </section>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewKiyaku from '@/components/ViewKiyaku.vue';
import { ValidationObserver } from 'vee-validate';
import { TypeLoginUser } from '@/components/types/app';
import { userStore } from '@/store';

type State = {
  form: {
    name: string;
    email: string;
  };
  kiyaku: boolean;
};

export default Vue.extend({
  name: 'ViewSignup',
  components: {
    ValidationObserver,
  },
  props: {
    registered: {
      required: true,
      type: Boolean,
    },
  },
  data(): State {
    return {
      form: {
        name: '',
        email: '',
      },
      kiyaku: false,
    };
  },
  computed: {
    loginedUser(): TypeLoginUser {
      return userStore.loginedUser;
    },
  },
  watch: {
    kiyaku(newdata: boolean) {
      if (newdata) {
        this.showModalKiyauku();
      }
    },
  },
  mounted() {},
  methods: {
    submit() {
      const data = {
        name: this.form.name.trim(),
        email: this.form.email.trim(),
      };
      this.$emit('submit', data);
    },
    showModalKiyauku() {
      this.openModal({
        modalTitle: '利用規約ヌ',
        component: ViewKiyaku,
        klass: ['view-orange'],
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.signup-body {
  position: relative;
  overflow: hidden;
}
.sec-intro {
  background-color: #ddcd61;
  padding: 20px 20px;
}
.intro-body {
  position: relative;
  margin: 0 auto;
  width: 320px;
}
.title {
  position: relative;
}
.title-cont {
  img {
    display: inline-block;
  }
}
.tanu {
  display: block;
  width: 60px;
  height: 71px;
  margin: 0 auto;
}
.tanu-title {
  display: block;
  width: 220px;
  height: 60px;
  margin-left: 10px;
}
.des {
  & > p {
    font-size: var(--fontsize-normal);
    color: #fff;
  }
}
.sec-signup {
  padding: 30px 0 0;
  h1 {
    color: var(--app-base-color2);
    font-size: var(--fontsize-large);
    margin-bottom: 20px;
  }
}
.btn-signup {
  margin: 60px auto 0;
}
.ca-inputline {
  width: 300px;
  margin: 0 auto;
}

$cloud-duration: 6s;
.cloud1 {
  position: absolute;
  top: 0px;
  left: -10px;
  width: 100px;
  animation-name: moveCloud1;
  animation-duration: $cloud-duration;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}
.cloud2 {
  position: absolute;
  top: 40px;
  left: 280px;
  width: 100px;
  animation-name: moveCloud2;
  animation-duration: $cloud-duration;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}

@keyframes moveCloud1 {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(20px);
  }
}
@keyframes moveCloud2 {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-20px);
  }
}

.sec-registered {
  padding: 20px 20px 0;
  text-align: center;
  h1 {
    padding: 10px 0 0;
  }
  .text {
    line-height: 1.8;
  }
}
.btn-start {
  margin: 60px auto 0;
}
</style>
