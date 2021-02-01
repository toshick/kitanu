import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { arrayAsort } from '@/common/util';
import { albumRef } from '@/plugins/firebase';
import { logError } from '@/common/error';
import { makeUser, makeAlbum } from '@/common/helper';
import {
  ActionRes,
  TypeAlbum,
  TypeUser,
  TypeUserID,
} from '@/components/types/apptypes';

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
    this._albumItems = arrayAsort(ary, 'createdAt').reverse();
  }

  @Mutation
  REMOVE_ALBUM(id: string) {
    this._albumItems = this._albumItems.filter((i: TypeAlbum) => i.id !== id);
  }

  @Mutation
  UPDATE_ALBUM(postitem: TypeAlbum) {
    console.log('UPDATE_ALBUM', postitem);

    // this.chatItems = this.chatItems.map((i: TypeAlbum) => {
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
    //
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
      .where('memberIDs', 'array-contains', p.userID)
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

    const item: TypeAlbum = makeAlbum({
      date: d.format('YYYY-MM-DD'),
      dateDisp: d.format('YYYY.MM.DD'),
      title: p.title,
      text: '',
      members: p.members,
    });

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
