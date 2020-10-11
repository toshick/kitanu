<template>
  <div
    class="about ca-modal-scroll-wrapper"
    @click.stop.prevent="$emit('close')"
  >
    <CaModalScroll>
      <CaModalViewBody klass="body">
        <div class="about-body">
          <img src="/img/tanu/tanu.png" class="about-tanu" alt="kitanu" />
          <h1>キタキータヌによーきたヌ</h1>
          <p>ここではなにをするのかヌ？</p>
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
// import { particleEffect } from '@/common/util';

type State = {
  visibleParticle: boolean;
};

export default Vue.extend({
  name: 'Kiyaku',
  components: {},
  props: {},
  data(): State {
    return {
      visibleParticle: false,
    };
  },
  computed: {},
  mounted() {
    this.tanuAnime();
    this.visibleParticle = true;
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
