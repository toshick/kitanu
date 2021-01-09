<template>
  <section class="app view">
    <ViewHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
      />
      <h1>ログインヌ</h1>
      <template v-slot:right>
        <p class="btn-header">
          <router-link to="/signup" tag="span">
            <ion-icon name="swap-horizontal-outline" size="small" />
            signup</router-link
          >
        </p>
      </template>
    </ViewHeader>
    <ViewBody class="login-body">
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
              <p>同志、ログインせよ</p>
              <p class="des-word">
                戦争は平和である<br />自由は屈従である<br />無知は力である
              </p>
              <p>ー B・B</p>
            </div>
          </div>
        </div>
      </section>
      <section class="sec-login">
        <ul class="buttons">
          <li v-show="!visibleLoginForm">
            <CaButton class="btn-login" width="L" @click="loginByFacebook">
              <ion-icon name="finger-print-outline" size="medium" />
              FaceBookでログインヌ</CaButton
            >
          </li>
          <li v-show="!visibleLoginForm">
            <CaButton class="btn-login" width="L" @click="loginByGoogle">
              <ion-icon name="finger-print-outline" size="medium" />
              Googleでログインヌ</CaButton
            >
          </li>
          <li v-show="!visibleLoginForm">
            <CaButton
              class="btn-login"
              width="L"
              @click="visibleLoginForm = true"
            >
              <ion-icon name="finger-print-outline" size="medium" />
              パスワードでログインヌ</CaButton
            >
          </li>
        </ul>
        <div v-if="visibleLoginForm">
          <ValidationObserver
            v-slot="{ invalid, handleSubmit }"
            tag="form"
            class="form"
          >
            <div class="ca-inputline">
              <CaInput
                v-model="form.email"
                class="-white"
                name="email"
                title="メールアドレス"
                rules="required|email"
                placeholder="メールアドレス"
                width="L"
              ></CaInput>
            </div>
            <div class="ca-inputline">
              <CaInput
                v-model="form.password"
                class="-white"
                name="password"
                title="パスワード"
                type="password"
                rules="required"
                placeholder="パスワード"
                width="L"
              ></CaInput>
            </div>
            <div class="ca-inputline">
              <CaButton
                class="btn-login -bypass"
                width="L"
                :disabled="invalid"
                @click="handleSubmit(loginByPass)"
              >
                <ion-icon name="finger-print-outline" size="medium" />
                パスワードでログインヌ</CaButton
              >
            </div>
            <div class="ca-inputline">
              <a class="btn-text" @click.stop.prevent="visibleLoginForm = false"
                >やめる</a
              >
            </div>
          </ValidationObserver>
        </div>
        <p class="reset">
          <a class="btn-text" @click="resetPassword">リセットパスワード</a>
        </p>
      </section>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';
import { Input } from 'camaleao-design/components/type';

type State = {
  form: {
    email: string;
    password: string;
  };
  visibleLoginForm: boolean;
};

export default Vue.extend({
  name: 'ViewLogin',
  components: { ValidationObserver },
  props: {},
  data(): State {
    return {
      form: {
        email: '',
        password: '',
      },
      visibleLoginForm: false,
    };
  },

  mounted() {
    if (this.isLocal) {
      this.form = {
        email: process.env.DEV_USER_EMAIL || '',
        password: process.env.DEV_USER_PASS || '',
      };
    }
  },
  methods: {
    loginByFacebook() {
      this.$emit('login-facebook');
    },
    loginByGoogle() {
      this.$emit('login-google');
    },
    showLoginByPassForm() {
      this.visibleLoginForm = true;
    },
    loginByPass() {
      this.$emit('login-dev', this.form);
    },
    resetPassword() {
      const inputs: Input[] = [];
      inputs.push({
        name: 'email',
        value: '',
        placeholder: 'メールアドレス',
        width: 'L',
        rules: 'required|email',
      });
      this.openDialog({
        modalTitle: 'パスワードのリセットするヌ？',
        compoParams: {
          inputs,
          confirmText: 'リセットメールがとぶよ',
          btnLabel: 'ヌ',
          onConfirm: ({ email }: { email: string }) => {
            this.$emit('reset-password', email.trim());
          },
        },
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss">
.login-body {
  position: relative;
  background-color: #ddcd61;
  .ca-input-errors {
    p {
      color: #fff;
    }
  }
  .formmark-required,
  .formmark-passed {
    color: #fff;
    border-color: #fff;
  }
}
</style>
<style scoped lang="scss">
.sec-intro {
  padding: 20px 20px;
  overflow: hidden;
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
  margin-top: 30px;
  & > p {
    text-align: center;
    font-size: var(--fontsize-normal);
    color: #fff;
    line-height: 1.6;
  }
  .des-word {
    margin: 20px 0;
    line-height: 2;
  }
}
.sec-login {
  padding: 20px 0 0;
  h1 {
    color: var(--app-base-color2);
    font-size: var(--fontsize-large);
    margin-bottom: 20px;
  }
}
.ca-inputline {
  justify-content: center;
}
.btn-login {
  ion-icon {
    margin-right: 0.5em;
  }
  &.-bypass {
    margin-top: 10px;
  }
}
.buttons {
  text-align: center;
  li {
    margin-bottom: 20px;
  }
}
.reset {
  text-align: center;
  padding: 20px 0;
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
  top: 60px;
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
</style>

