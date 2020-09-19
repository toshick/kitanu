<template>
  <div :class="myClass">
    <ul class="particle-holder">
      <li v-for="c in 40" :key="c" class="c" />
    </ul>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'Particle',
  components: {},
  props: {
    size: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { particle: true };
      return klass;
    },
  },
  mounted() {
    const animated = this.$el.querySelector('li:last-child');
    if (animated) {
      animated.addEventListener('animationend', this.onAnimationEnd);
    }
  },
  methods: {
    onAnimationEnd(e: Event) {
      const li = e.target as EventTarget;
      li.removeEventListener('animationend', this.onAnimationEnd);
      this.$emit('finish');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
$time: 2s;
$total: 200; // total particles
$orb-size: 10px;
$particle-size: 2px;
// $base-hue: 10;

.particle {
  position: fixed;
  top: 50%;
  left: 50%;
  pointer-events: none;
  z-index: 200;
}
.particle-holder {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: rotate $time infinite linear;
  pointer-events: none;
}
@keyframes rotate {
  100% {
    transform: rotateY(360deg) rotateX(360deg);
  }
}

.c {
  position: absolute;
  width: $particle-size;
  height: $particle-size;
  // border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  background-color: #fff;
}

@for $i from 1 through $total {
  $z: (random(360) * 1deg); // random angle to rotateZ
  $y: (random(360) * 1deg); // random to rotateX
  // $hue: ((40 / $total * $i) + $base-hue); // set hue

  .c:nth-child(#{$i}) {
    animation: orbit#{$i} $time backwards;
    animation-delay: ($i * 0.001s);
    // background-color: hsla($hue, 100%, 50%, 1);
  }

  @keyframes orbit#{$i} {
    10% {
      opacity: 1; // fade in
    }
    20% {
      transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // form orb
      opacity: 1;
    }
    // 80% {
    //   transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // hold orb state 30-80
    //   opacity: 1; // hold opacity 20-80
    // }

    100% {
      transform: rotateZ(-$z) rotateY($y) translateX(($orb-size * 3)) rotateZ($z);
      opacity: 0;
    }
  }
}
</style>
