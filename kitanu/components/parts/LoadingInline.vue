<template>
  <div class="line-scale-pulse-out">
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'LoadingInline',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.line-scale-pulse-out {
  text-align: center;

  & > div {
    background-color: #ccc;

    width: 4px;
    height: 20px;
    border-radius: 2px;
    margin: 2px;

    display: inline-block;
    animation-name: animeLoading;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.85, 0.25, 0.37, 0.85);

    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
    &:nth-child(4) {
      animation-delay: 0.6s;
    }
    &:nth-child(5) {
      animation-delay: 0.8s;
    }
  }
}

@function delay($interval, $count, $index) {
  @return ($index * $interval) - ($interval * $count);
}

@keyframes animeLoading {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
