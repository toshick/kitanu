import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { log, ArrayUtil } from '@/common/util';
import { makeChatRoom, makeUserDisp } from '@/common/helper';
import { chatlistRef } from '@/plugins/firebase';
import { activityStore, userStore } from '@/store';
import { logError } from '@/common/error';

import {
  ActionRes,
  TypeUser,
  TypeUserID,
  TypeUserDisp,
  TypeChatRoom,
  TypeChatRoomDisp,
} from '@/components/types/apptypes';
import { members } from '@/mock/mockdata';

@Module({ name: 'chatlist', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _members: TypeUser[] = members;
  _chatlist: TypeChatRoom[] = [];
  _unsubscribe: Function | null = null;

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  SET_UNSUBSCRIBE(unsubscribe: Function | null) {
    this._unsubscribe = unsubscribe;
  }

  @Mutation
  ADD_CHATROOM(chatroom: TypeChatRoom) {
    const find = this._chatlist.find((d: TypeChatRoom) => d.id === chatroom.id);
    if (find) return;
    this._chatlist = ArrayUtil.Asort(
      [...this._chatlist, chatroom],
      'createdAt',
    ).reverse();
  }

  @Mutation
  REMOVE_CHATROOM(room: TypeChatRoom) {
    this._chatlist = this._chatlist.filter(
      (d: TypeChatRoom) => d.id !== room.id,
    );
  }

  @Mutation
  UPDATE_CHATROOM(room: TypeChatRoom) {
    const ary = this._chatlist.map((r: TypeChatRoom) => {
      if (r.id === room.id) {
        return { ...r, ...room };
      }
      return r;
    });
    this._chatlist = ArrayUtil.Asort(ary, 'createdAt').reverse();
  }

  // ----------------------
  // Action
  // ----------------------

  @Action({ rawError: true })
  CreateChatRoom(p: {
    userID: TypeUserID;
    users: TypeUserDisp[];
  }): Promise<ActionRes> {
    const room: TypeChatRoom = makeChatRoom({
      memberIDs: p.users.map((u: TypeUserDisp) => u.id).concat([p.userID]),
      createdByID: p.userID,
      title: '新規チャット',
    });

    // 作成
    return chatlistRef
      .doc(room.id)
      .set(room)
      .then(() => {
        log('チャットルーム作成せり', room);
        // Activity;
        activityStore.AddActivity({
          text: `チャットルームを作成したーヌ`,
          tags: ['チャット'],
        });
        this.ADD_CHATROOM(room);
        return {};
      })
      .catch((error) => {
        logError(error, 'CreateChatRoom');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  UpdateChatRoom(room: Partial<TypeChatRoom>): Promise<ActionRes> {
    const chatroomID = room.id;
    if (!chatroomID) {
      return Promise.resolve({ errorMsg: 'no-id UpdateChatRoom' });
    }
    const myroom = { ...room };
    delete myroom.members;
    delete myroom.createdBy;
    // 作成
    return chatlistRef
      .doc(chatroomID)
      .update(myroom)
      .then(() => {
        return {};
      })
      .catch((error) => {
        logError(error, 'UpdateChatRoom');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  Listen(flg: boolean): void {
    if (!flg) {
      if (this._unsubscribe) {
        this._unsubscribe();
        this.SET_UNSUBSCRIBE(null);
      }
      return;
    }
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    const unsubscribe = chatlistRef
      .where('memberIDs', 'array-contains', userStore.loginedUser.id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            const { doc, type } = change;
            const item: TypeChatRoom = makeChatRoom(doc.data());
            console.log('Listen', type, item);
            if (type === 'added') {
              this.ADD_CHATROOM(item);
            } else if (type === 'modified') {
              this.UPDATE_CHATROOM(item);
            } else if (type === 'removed') {
              this.REMOVE_CHATROOM(item);
            }
          });
      });
    this.SET_UNSUBSCRIBE(unsubscribe);
  }

  // ----------------------
  // get
  // ----------------------

  get chatlist(): TypeChatRoom[] {
    return this._chatlist.map((room: TypeChatRoom) => {
      const r = makeChatRoom(room);
      r.members = r.memberIDs.map((userID: TypeUserID) => {
        return (
          userStore.getUserDispByID(userID) ||
          makeUserDisp({ id: r.createdByID })
        );
      });

      const createdBy = userStore.getUserDispByID(r.createdByID);
      r.createdBy = createdBy || makeUserDisp({ id: r.createdByID });

      return r;
    });
  }

  get getChatroomDisp() {
    return (chatroomid: string): TypeChatRoomDisp => {
      const find = this._chatlist.find(
        (r: TypeChatRoom) => r.id === chatroomid,
      );
      if (!find) return makeChatRoom({ id: chatroomid });
      const ret: TypeChatRoomDisp = { ...find };
      ret.members = ret.memberIDs
        .map((userID: string) => {
          console.log('userIDちぇっっく', userID);
          return userStore.getUserDispByID(userID);
        })
        .filter((u: TypeUserDisp | null) => u);
      ret.createdBy = userStore.getUserDispByID(ret.createdByID);
      return ret;
    };
  }

  get getUserIDsByChatRoom() {
    return (rooms: TypeChatRoom[]): TypeUserID[] => {
      const ids: TypeUserID[] = [];
      rooms.forEach((room: TypeChatRoom) => {
        room.memberIDs.forEach((u: TypeUserID) => {
          ids.push(u);
        });
      });
      return ArrayUtil.Unique(ids);
    };
  }
}
