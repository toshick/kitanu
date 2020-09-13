import Vue from 'vue'; // import error おこる

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    openView: any;
    showConfirm: any;
    drillDown: any;
  }
}
