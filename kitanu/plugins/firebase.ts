// import querystring from 'querystring';
// import Cookies from 'js-cookie';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { userStore } from '@/store';

/**
 * default
 */
export default ({
  app,
  store,
  redirect,
}: {
  app: any;
  store: any;
  redirect: Function;
  route: any;
}) => {
  if (process.server) return;

  const firebaseConfig = {
    apiKey: app.$config.FIREBASE_API_KEY,
    authDomain: app.$config.FIREBASE_AUTH_DOMAIN,
    databaseURL: app.$config.FIREBASE_DB_URL,
    projectId: app.$config.FIREBASE_PROJECT_ID,
    storageBucket: app.$config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: app.$config.FIREBASE_MGS_SENDER_ID,
    appId: app.$config.FIREBASE_APP_ID,
  } as const;

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth().languageCode = 'jp';
  // const firestore = firebase.firestore();
  // const storage = firebase.storage();

  /**
   * onAuthStateChanged
   */
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    const { pathname } = window.location;
    if (user) {
      // User is signed in.
      console.log('ログイン済', user.displayName);
      userStore.SET_LOGIN_USER({
        displayName: user.displayName || '',
        email: user.email || '',
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || '',
        isAdmin: false,
        isAnonymous: user.isAnonymous,
      });
    } else {
      // No user is signed in.
      console.log('未ログイン');
      userStore.SET_LOGIN_USER(null);

      // リダイレクトを無視するpath
      if (['kiyaku', 'policy', 'login'].some((path) => pathname.includes(path)))
        return;
      return redirect(302, '/login');
    }
  });
};
