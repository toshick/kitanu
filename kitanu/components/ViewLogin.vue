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
          <router-link to="/signup" tag="span">signup</router-link>
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
          <li>
            <CaButton class="btn-login" width="L" @click="loginByFacebook">
              <ion-icon name="finger-print-outline" size="medium" />
              FaceBookでログインヌ</CaButton
            >
          </li>
          <li>
            <CaButton class="btn-login" width="L" @click="loginByGoogle">
              <ion-icon name="finger-print-outline" size="medium" />
              Googleでログインヌ</CaButton
            >
          </li>
        </ul>
      </section>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
// import { openModal } from '@/common/util';
import ViewKiyaku from '@/components/ViewKiyaku.vue';

type State = {
  kiyaku: boolean;
};

export default Vue.extend({
  name: 'ViewLogin',
  components: {},
  props: {
    registered: {
      required: true,
      type: Boolean,
    },
  },
  data(): State {
    return {
      kiyaku: false,
    };
  },

  mounted() {},
  methods: {
    loginByFacebook() {
      console.log('loginByFacebook');
    },
    loginByGoogle() {
      console.log('loginByGoogle');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.login-body {
  position: relative;
  overflow: hidden;
  background-color: #ddcd61;
}
.sec-intro {
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
  padding: 30px 0 0;
  h1 {
    color: var(--app-base-color2);
    font-size: var(--fontsize-large);
    margin-bottom: 20px;
  }
}
.btn-login {
  ion-icon {
    margin-right: 0.5em;
  }
}
.buttons {
  text-align: center;
  li {
    margin-bottom: 40px;
  }
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
