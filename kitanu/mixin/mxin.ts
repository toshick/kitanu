// import querystring from 'querystring';
// import Vue from 'vue';

/**
 * outClickClose
 */
// export const outClickClose = Vue.extend({
//   mounted() {},

//   beforeDestroy() {
//     this.setWindowClick(false);
//   },

//   methods: {
//     setWindowClick(flg: boolean) {
//       window.removeEventListener('click', this.windowClick);
//       if (flg) {
//         window.addEventListener('click', this.windowClick);
//       }
//     },
//     windowClick(e: MouseEvent) {
//       if (!this.$el.contains(e.target as Element)) {
//         this.onClickOutSide();
//       }
//     },

//     onClickOutSide() {},
//   },
// });

/**
 * viewMixin
 */
// export const viewMixin = Vue.extend({
//   computed: {},
//   mounted() {},

//   beforeDestroy() {},

//   methods: {
//     changeView(name: string) {
//       this.$router.push(name);
//     },
//   },
// });
