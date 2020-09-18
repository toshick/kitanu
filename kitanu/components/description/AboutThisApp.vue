<template>
  <div class="about ca-modal-scroll-wrapper" @click.stop.prevent="$emit('close')">
    <CaModalScroll>
      <CaModalViewBody klass="body">
        <div class="about-body">
          <img src="/img/top/tanu.png" class="about-tanu" alt="kitanu" />
          <h1>キタキタヌによーきたヌ</h1>
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
import { particleEffect } from '@/common/util';

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
    particleEffect();
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
<style lang="scss">
.view-about {
  .about {
    color: #fff;
    font-size: var(--fontsize-small);

    .about-body {
      padding: 20px;
    }

    .ca-modalview-body {
      padding: 0px;
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
