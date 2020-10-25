<template>
  <div class="loading">
    <CaModalScroll>
      <CaModalViewBody>
        <!-- <div class="loader loader--style1" title="0">
          <svg id="loader-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
            <path
              opacity="1"
              fill="#eee"
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
            />
            <path
              fill="#ddcd61"
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
            >
              <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite" />
            </path>
          </svg>
        </div> -->
        <div class="loading-img">
          <img
            src="/img/top/tanu-white.png"
            class="tanu-white"
            alt="kitanu-header"
          />
        </div>
      </CaModalViewBody>
    </CaModalScroll>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import anime from 'animejs';

type State = {};

export default Vue.extend({
  name: 'Loading',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  computed: {},
  mounted() {
    this.tanuAnime();
  },
  methods: {
    tanuAnime() {
      anime({
        targets: '.about-tanu',
        translateY: 0,
        rotate: '1turn',
        // backgroundColor: '#FFF',
        duration: 800,
        delay: 1000,
        opacity: 1,
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.loader--style1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
}
.tanu-white {
  display: block;
  width: 100%;
  animation: 1s loadinganime infinite;
}

@keyframes loadinganime {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.1);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>

<style lang="scss">
.ca-modal.-loading {
  background-color: rgba(#000, 0.2);
  .ca-modalview {
    background-color: transparent;
  }
}
</style>
