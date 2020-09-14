<template>
  <div class="about ca-modal-scroll-wrapper" @click.stop.prevent="$emit('close')">
    <CaModalScroll>
      <CaModalViewBody>
        <img src="/img/top/tanu.png" class="about-tanu" alt="kitanu" />
        <h1>アルバムをつくるヌ</h1>
        <p>
          一人でも、アミーゴとでも
          <br />いっしょにスイートメモリー
          <br />
          つくれるヌ
        </p>
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
  name: 'Kiyaku',
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
        delay: 500,
        opacity: 1,
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.about {
  color: #fff;
  font-size: var(--fontsize-small);

  .ca-modalview-body {
    padding: 20px;
  }
  h1 {
    font-size: var(--fontsize-large);
    margin-bottom: 10px;
  }
  h2 {
    font-size: var(--fontsize-medium);
    margin: 10px 0;
  }
  p {
    font-size: var(--fontsize-medium);
  }
}

.about-tanu {
  position: absolute;
  bottom: -140px;
  left: 40px;
  width: 280px;
  pointer-events: none;
  opacity: 0;
}
</style>
