<template>
  <div class="about ca-modal-scroll-wrapper" @click.stop.prevent="$emit('close')">
    <CaModalScroll>
      <CaModalViewBody>
        <div class="about-body">
          <img src="/img/top/tanu/tanu.png" class="about-tanu" alt="kitanu" />
          <h1>アルバムをつくるヌ</h1>
          <p>
            一人でも、アミーゴとでも
            <br />いっしょにスイートメモリー
            <br />
            つくれるヌ
          </p>
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
<style scoped lang="scss"></style>
