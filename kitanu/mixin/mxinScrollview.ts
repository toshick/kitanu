// import querystring from 'querystring';
import Vue from 'vue';

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
        }, 200 * n);
      });
    },
    scrollBottomExe() {
      const $el = this.$el.querySelector('.app-body') as Element;
      const bottom = $el.scrollHeight - $el.clientHeight;
      $el.scrollTo(0, bottom);
    },
  },
});
