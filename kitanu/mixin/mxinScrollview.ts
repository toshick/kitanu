// import querystring from 'querystring';
import Vue from 'vue';
import anime from 'animejs';

/**
 * scrollMixin
 */
export default Vue.extend({
  computed: {},
  mounted() {},

  beforeDestroy() {},

  methods: {
    scrollBottom() {
      Array.from(Array(2)).forEach((_, n: number) => {
        setTimeout(() => {
          this.scrollBottomExe();
        }, 100 * n);
      });
    },
    scrollBottomExe() {
      const $el = this.$el.querySelector('.app-body') as Element;
      const bottom = $el.scrollHeight;
      $el.scrollTo(0, bottom);
    },
    scrollBottomSmooth() {
      const $el = this.$el.querySelector('.app-body') as Element;
      const bottom = $el.scrollHeight;
      anime({
        targets: $el,
        scrollTop: bottom,
        duration: 400,
        easing: 'easeInOutSine',
      });
    },
  },
});
