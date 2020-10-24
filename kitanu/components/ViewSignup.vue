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
        <div class="title">
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
      </section>
      <section class="sec-signup">
        <ValidationObserver
          v-slot="{ invalid, handleSubmit }"
          tag="form"
          class="form"
        >
          <!-- <h1>Sign up</h1> -->
          <div class="ca-inputline">
            <CaInput
              v-model="form.name"
              name="mail1"
              title="なまえ"
              rules="required|max:20"
              placeholder="オナマエ"
              width="L"
            ></CaInput>
          </div>
          <div class="ca-inputline">
            <CaInput
              v-model="form.name"
              name="mail1"
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
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';

type State = {};

export default Vue.extend({
  name: 'ViewSignup',
  components: {
    ValidationObserver,
  },
  props: {},
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
      console.log('submit');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.signup-body {
}
.sec-intro {
  padding: 10px 20px;
  background-color: #ddcd61;
}
.title {
  img {
    display: inline-block;
  }
}
.tanu {
  display: block;
  width: 60px;
  margin: 0 auto;
}
.tanu-title {
  display: block;
  width: 220px;
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
</style>
