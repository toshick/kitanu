import Vue from 'vue'; // import error おこる

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    goTop: any;
    goAlbum: any;
    goFriendList: any;
    openView: any;
    openModal: any;
    openDialog: any;
    openActivityList: any;
    showConfirm: any;
    showLoading: any;
    drillDown: any;
    $router: any;
    $sanitize: any;
    isLocal: boolean;
    connecting: boolean;
    // mixin
    scrollBottom: any;
    scrollBottomSmooth: any;
    scrollTop: any;
    scrollTopSmooth: any;
  }
}
