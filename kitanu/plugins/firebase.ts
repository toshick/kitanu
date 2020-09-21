import querystring from 'querystring';
import Cookies from 'js-cookie';
import * as firebase from 'firebase';
import 'firebase/firestore';
import dayjs from 'dayjs';
import { appStore, imgpostStore } from '@/store';

export type PostImgRequest = {
  tagid?: string;
  total: string;
};
export type User = {
  username: string;
  done: Boolean;
  userpic: string;
  created: string;
  visible: Boolean;
};

export type PostImg = {
  id: string;
  imgurl: string;
  imgurlTh: string;
  imgurlMid: string;
  username: string;
  created: string;
  comment: string;
  sortkey: number;
  tags?: string[];
};

export type Tag = {
  id: string;
  title: string;
};

// 全プロパティ省略可能にする
export type PostImgUpdate = Partial<PostImg>;
export type TagUpdate = Partial<Tag>;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MGS_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storage = firebase.storage();

/**
 * ref
 */
const postImgRef = firestore.collection('postimg');
const tagRef = firestore.collection('tag');
let unsubscribeImg: Function | null = null;
let unsubscribeTag: Function | null = null;

/**
 * default
 */
export default ({ store, redirect }: { store: any; redirect: Function }) => {
  /**
   * onAuthStateChanged
   */
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user) {
      // User is signed in.
      console.log('ログイン済');
      appStore.SET_LOGIN_USER(true);

      // Cookies.set('bingo-sesshon', new Date().toString());
      // if (window.location.pathname.includes('login')) {
      //   redirect('/');
      // }
    } else {
      // No user is signed in.
      console.log('未ログイン');
      appStore.SET_LOGIN_USER(false);
    }
  });

  /**
   * setUp
   */
  const p: PostImgRequest = { total: '30' };
  const u = location.hash;
  if (u) {
    const params = querystring.parse(u.replace('#', ''));
    if (params.tagid && !Array.isArray(params.tagid)) p.tagid = params.tagid;
    if (params.total && !Array.isArray(params.total)) p.total = params.total;
  }
  setUpPostImg(p);

  setUpTag();
};

/**
 * setUpPostImg
 */
export function setUpPostImg(p?: PostImgRequest) {
  /**
   * unsubscribeImg
   */
  if (unsubscribeImg) {
    unsubscribeImg();
    unsubscribeImg = null;
  }

  let ref = null;
  if (p && p.tagid) {
    ref = postImgRef.where('tags', 'array-contains', p.tagid);
  } else {
    ref = postImgRef;
  }
  const total = p ? +p.total : 30;

  unsubscribeImg = ref
    .orderBy('timestamp', 'desc')
    .limit(total)
    .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
      querySnapshot.docChanges().forEach((change: firebase.firestore.DocumentChange) => {
        const { doc } = change;
        const d = doc.data();
        // console.log('d', d);
        if (change.type === 'added') {
          imgpostStore.ADD_POSTIMG(getPostItem(d));
        } else if (change.type === 'modified') {
          imgpostStore.UPDATE_POSTIMG(getPostItem(d));
        } else if (change.type === 'removed') {
          imgpostStore.REMOVE_POSTIMG(d.imgurl);
        }
      });
    });
}

/**
 * setUpTag
 */
export function setUpTag() {
  if (unsubscribeTag) {
    unsubscribeTag();
  }
  unsubscribeTag = tagRef.onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
    querySnapshot.docChanges().forEach((change: firebase.firestore.DocumentChange) => {
      const { doc } = change;
      const d = doc.data();
      if (change.type === 'added') {
        imgpostStore.ADD_TAG(getTagItem(d));
      } else if (change.type === 'modified') {
        imgpostStore.UPDATE_TAG(getTagItem(d));
      } else if (change.type === 'removed') {
        imgpostStore.REMOVE_TAG(d.id);
      }
    });
  });
}

function getPostItem(d: any): PostImg {
  const imgurl = d.imgurl;
  let imgurlTh = imgurl.replace('upload_images', 'upload_images_th');
  let imgurlMid = imgurl.replace('upload_images', 'upload_images_mid');
  if (d.imgurl.includes('.gif')) {
    imgurlTh = imgurl;
    imgurlMid = imgurl;
  }
  if (d.tags) {
    d.tags = d.tags.filter((t: any) => {
      return typeof t === 'string';
    });
  }

  return {
    id: d.imgurl,
    username: d.username,
    imgurl,
    imgurlTh,
    imgurlMid,
    created: dayjs(d.created).format('YYYY.MM.DD HH:mm'),
    sortkey: d.timestamp,
    comment: d.comment || '',
    tags: d.tags || [],
  };
}

function getTagItem(d: any): Tag {
  return d;
}

export { storage, firestore, firebase, postImgRef, tagRef };
