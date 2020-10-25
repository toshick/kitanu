<template>
  <section class="app view">
    <ViewHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
      />
      <h1>サインアップヌ</h1>
    </ViewHeader>
    <ViewBody class="signup-body">
      <section class="sec-intro">
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
          <div class="chara">
            <p>
              よーこそキタキータヌへ<br />
              キタキータヌではアルバムを共同で作成したりおしゃべりできるヌ。
            </p>
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
              v-model="form.mail"
              class="-white"
              name="mail"
              title="メール"
              rules="required|email"
              placeholder="メール"
              width="L"
            ></CaInput>
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
import { ValidationObserver } from 'vee-validate';

type State = {
  form: {
    name: string;
    mail: string;
  };
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
        mail: '',
      },
    };
  },
  mounted() {},
  methods: {
    submit() {
      const data = {
        name: this.form.name.trim(),
        mail: this.form.mail.trim(),
      };
      this.$emit('submit', data);
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
  padding: 10px 20px;
  background-color: #ddcd61;
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
.chara {
  & > p {
    font-size: var(--fontsize-medium);
    color: #fff;
    margin: 20px auto;
    width: 260px;
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
  .ca-input {
    margin: 0 auto;
  }
}

$cloud-duration: 6s;
.cloud1 {
  position: absolute;
  top: 20px;
  left: 10px;
  width: 100px;
  animation-name: moveCloud1;
  animation-duration: $cloud-duration;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}
.cloud2 {
  position: absolute;
  top: 80px;
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
}
.btn-start {
  margin: 60px auto 0;
}
</style>
