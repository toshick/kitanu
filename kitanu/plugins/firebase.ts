// import querystring from 'querystring';
import Cookies from 'js-cookie';
import { isLocal } from '@/common/util';
import { makeDummyUsers } from '@/common/development';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { userStore, COOKIE_AUTH } from '@/store';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MGS_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
} as const;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = 'jp';

const firestore: firebase.firestore.Firestore = firebase.firestore();
if (isLocal) {
  firestore.useEmulator('localhost', 8080);
  firebase.auth().useEmulator('http://localhost:9099/');
}

// 登録解除メソッド
const unsubscribeFuncs: Function[] = [];

/**
 * default
 */
export default ({
  app,
  store,
  redirect,
  route,
}: {
  app: any;
  store: any;
  redirect: Function;
  route: any;
}) => {
  if (process.server) return;
  const { path } = route;
  /**
   * onAuthStateChanged
   */
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user) {
      // User is signed in.
      console.log('ログイン済', user.uid);
      Cookies.set(COOKIE_AUTH, 1);
      userStore.SET_LOGIN_USER({
        uid: user.uid,
        displayName: user.displayName || '',
        email: user.email || '',
        emailVerified: user.emailVerified,
        photoURL: user.photoURL || '',
        isAdmin: false,
        isAnonymous: user.isAnonymous,
        searchOK: false,
        kycOK: false,
        agreeTermsOK: false,
      });

      // if (
      //   isLocal &&
      //   !userStore.loginedUserWithDetail.displayName &&
      //   userStore.loginedUserWithDetail.email === process.env.DEV_USER_EMAIL
      // ) {
      //   console.log('カマレオセット');
      //   userStore.UpdateLoginUser({
      //     displayName: process.env.DEV_USER_NAME || '',
      //   });
      // }
    } else {
      // No user is signed in.
      console.log('未ログイン');
      Cookies.remove(COOKIE_AUTH);
      userStore.SET_LOGIN_USER(null);
      // 登録解除
      unsubscribeFuncs.forEach((func: Function) => {
        func();
      });

      // リダイレクトを無視するpath
      if (['kiyaku', 'policy'].some((p) => path.includes(p))) return;
      if (path !== '/login') {
        return redirect(302, '/login');
      }
    }
  });

  /**
   * 開発用ユーザを作成
   */
  if (isLocal) {
    makeDummyUsers();
  }
};

/**
 * ref
 */
export const postImgRef: firebase.firestore.CollectionReference = firestore.collection(
  'postimg',
);

unsubscribeFuncs.push(
  postImgRef.onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
    querySnapshot
      .docChanges()
      .forEach((change: firebase.firestore.DocumentChange) => {
        const { doc } = change;
        const d = doc.data();
        // console.log('change.type', d);
        if (change.type === 'added') {
          // imgpostStore.ADD_TAG(getTagItem(d));
        } else if (change.type === 'modified') {
          // imgpostStore.UPDATE_TAG(getTagItem(d));
        } else if (change.type === 'removed') {
          // imgpostStore.REMOVE_TAG(d.id);
        }
      });
  }),
);

/**
 * albumRef
 */
export const albumRef: firebase.firestore.CollectionReference = firestore.collection(
  'album',
);

/**
 * userRef
 */
export const userRef: firebase.firestore.CollectionReference = firestore.collection(
  'user',
);
