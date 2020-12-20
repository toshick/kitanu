/**
 * TODO これはまだつかっていない。あとで消すかも
 */
export default ({ store, redirect }) => {
  console.log('FBプラグイン');

  /**
   * FB初期化
   */
  window.fbAsyncInit = function () {
    const { FB } = window;
    FB.init({
      appId: '1277576589281289',
      cookie: true,
      xfbml: true,
      version: 'v9.0',
    });

    FB.AppEvents.logPageView();

    // ステータスをチェック
    FB.getLoginStatus((response: { status: string; authResponse: any }) => {
      const { status } = response;
      if (status === 'connected') {
        console.log('コネクテッド済です');
      } else {
        // redirect('/login');
      }
    });
  };

  (function (d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js: HTMLScriptElement = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};
