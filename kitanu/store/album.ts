import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { albumRef } from '@/plugins/firebase';
import { logError } from '@/common/error';
// import { userStore } from '@/store/user';
import {
  ActionRes,
  TypeAlbum,
  TypeUser,
  TypeUserID,
} from '@/components/types/apptypes';

const user: TypeUser = {
  id: '0000001',
  username: 'ニャオスカマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
};

export const albumItems: TypeAlbum[] = [
  {
    id: uuidv4(),
    date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    dateDisp: dayjs().subtract(1, 'day').format('YYYY.MM.DD'),
    title: 'たいとる',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user],
    imgurl:
      'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
    createdAt: `${dayjs().valueOf()}`,
  },
  {
    id: uuidv4(),
    date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    dateDisp: dayjs().subtract(2, 'day').format('YYYY.MM.DD'),
    title: 'ふたつめたいとる',
    text: 'ふたつめ',
    members: [user, user, user, user, user],
    createdAt: `${dayjs().valueOf() + 1}`,
  },
  // {
  //   id: '0000003',
  //   date: '2018-08-08',
  //   dateDisp: '2018.08.08',
  //   text: 'みんなで東北へいってきたよ。',
  //   members: [user, user],
  // },
  // {
  //   id: '0000004',
  //   date: '2018-08-08',
  //   dateDisp: '2018.08.08',
  //   text:
  //     'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
  //   members: [user],
  // },
];

@Module({ name: 'album', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _albumItems: TypeAlbum[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_ALBUM() {
    this._albumItems = [];
  }

  @Mutation
  ADD_ALBUM(item: TypeAlbum) {
    const find = this._albumItems.find((d: TypeAlbum) => d.id === item.id);
    if (find) return;
    const ary = [...this._albumItems, item];
    this._albumItems = asort(ary, 'createdAt').reverse();
  }

  @Mutation
  REMOVE_ALBUM(id: string) {
    this._albumItems = this._albumItems.filter((i: TypeAlbum) => i.id !== id);
  }

  @Mutation
  UPDATE_ALBUM(postitem: TypeAlbum) {
    console.log('UPDATE_ALBUM', postitem);

    // this.chatitems = this.chatitems.map((i: TypeAlbum) => {
    //   if (i.id === postitem.id) {
    //     i = postitem;
    //   }
    //   return i;
    // });
  }

  // ----------------------
  // Action
  // ----------------------

  @Action
  FetchAlbum(p: { userID: string }): Promise<ActionRes> {
    // if (page > 0) {
    //   const d = dayjs().subtract(10, 'day');
    //   const item: TypeAlbum = {
    //     id: uuidv4(),
    //     date: d.format('YYYY-MM-DD'),
    //     dateDisp: d.format('YYYY.MM.DD'),
    //     createdAt: `${d.valueOf()}`,
    //     text: 'もあ',
    //     members: [],
    //   };
    //   this.ADD_ALBUM(item);
    // } else {
    //   // albumItems.forEach((item: TypeAlbum) => {
    //   //   this.ADD_ALBUM(item);
    //   // });
    // }

    return albumRef
      .limit(20)
      .where('members', 'array-contains', p.userID)
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('アルバム', doc.id, ' => ', doc.data());
          const d: any = doc.data();
          const item: TypeAlbum = {
            id: d.id,
            date: d.date,
            dateDisp: d.dateDisp,
            title: d.title,
            text: d.text,
            members: d.members,
            createdAt: d.createdAt,
          };
          this.ADD_ALBUM(item);
        });
        return {};
      })
      .catch((error) => {
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action
  RemoveAlbum(id: string): Promise<ActionRes> {
    this.REMOVE_ALBUM(id);
    return Promise.resolve({});
  }

  @Action
  CreateAlbum(p: { title: string; members: TypeUserID[] }): Promise<ActionRes> {
    const d = dayjs();

    const item: TypeAlbum = {
      id: uuidv4(),
      date: d.format('YYYY-MM-DD'),
      dateDisp: d.format('YYYY.MM.DD'),
      createdAt: `${d.valueOf()}`,
      title: p.title,
      text: '',
      members: p.members,
    };

    return albumRef
      .add(item)
      .then(() => {
        // Signed in
        return {};
      })
      .catch((error) => {
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  // ----------------------
  // get
  // ----------------------
  get albumItems(): TypeAlbum[] {
    return this._albumItems;
  }
}
