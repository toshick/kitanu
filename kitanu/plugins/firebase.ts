// import querystring from 'querystring';
import Cookies from 'js-cookie';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { isLocal } from '@/common/util';
import { makeDummyUsers } from '@/common/development';
import { makeLoginUser } from '@/common/helper';
import { appStore, activityStore, userStore, COOKIE_AUTH } from '@/store';

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
      appStore.afterLogin(makeLoginUser(user));
    } else {
      // No user is signed in.
      appStore.afterLogout();
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

/**
 * activityRef
 */
export const activityRef: firebase.firestore.CollectionReference = firestore.collection(
  'activity',
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
