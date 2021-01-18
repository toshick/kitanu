import dayjs from 'dayjs';
import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort, log, unique } from '@/common/util';
import { makeChatRoom, makeUserDisp, makeChatPost } from '@/common/helper';
import { chatroomRef } from '@/plugins/firebase';
import { activityStore, userStore } from '@/store';
import { logError } from '@/common/error';

import {
  ActionRes,
  TypeChatPost,
  TypeUser,
  TypeUserID,
  TypeUserDisp,
  TypeChatRoom,
} from '@/components/types/apptypes';
import kitanuTalks from '@/assets/kitanuTalks';
import { members, chatItems } from '@/mock/mockdata';

@Module({ name: 'chat', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _chatPosts: TypeChatPost[] = [];
  _members: TypeUser[] = members;
  _chatrooms: TypeChatRoom[] = [];
  _unsubscribe: Function | null = null;

  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  SET_UNSUBSCRIBE(unsubscribe: Function | null) {
    this._unsubscribe = unsubscribe;
  }

  @Mutation
  RESET_CHATPOST() {
    this._chatPosts = [];
  }

  @Mutation
  ADD_CHATPOST(postitem: TypeChatPost) {
    this._chatPosts = asort([...this._chatPosts, postitem], 'createdAt');
  }

  @Mutation
  REMOVE_CHATPOST(id: string) {
    this._chatPosts = this._chatPosts.filter((i: TypeChatPost) => i.id !== id);
  }

  @Mutation
  UPDATE_CHATPOST(postitem: TypeChatPost) {}

  @Mutation
  ADD_CHATROOM(chatroom: TypeChatRoom) {
    const find = this._chatrooms.find(
      (d: TypeChatRoom) => d.id === chatroom.id,
    );
    if (find) return;
    this._chatrooms = asort(
      [...this._chatrooms, chatroom],
      'createdAt',
    ).reverse();
  }

  @Mutation
  REMOVE_CHATROOM(room: TypeChatRoom) {
    this._chatrooms = this._chatrooms.filter(
      (d: TypeChatRoom) => d.id !== room.id,
    );
  }

  @Mutation
  UPDATE_CHATROOM(room: TypeChatRoom) {
    const ary = this._chatrooms.map((r: TypeChatRoom) => {
      if (r.id === room.id) {
        return { ...r, ...room };
      }
      return r;
    });
    this._chatrooms = asort(ary, 'createdAt').reverse();
  }

  // ----------------------
  // Action
  // ----------------------

  @Action
  FetchPostForChat(chatID: string): Promise<ActionRes> {
    this.RESET_CHATPOST();
    // const date = dayjs().format('YYYY.MM.DD HH:mm:ss');
    return new Promise((resolve) => {
      setTimeout(() => {
        chatItems.forEach((item: TypeChatPost) => {
          this.ADD_CHATPOST(item);
        });
        resolve({});
      }, 1000);
    });
  }

  @Action
  PostChat(p: TypeChatPost): Promise<ActionRes> {
    // let text = p.text || '';
    // let iconurl =
    //   'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg';
    // if (p.npc) {
    //   iconurl = '/img/tanu/tanu-120.png';
    //   text = kitanuTalks[Math.floor(Math.random() * kitanuTalks.length)];
    // }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const item: TypeChatPost = {
    //       iconurl,
    //       text,
    //       username: 'にゃおすけ',
    //       postdate: `${dayjs().valueOf()}`,
    //       imgurl: p.fileItem ? p.fileItem.base64str : '',
    //       good: p.good || 0,
    //       fukitype: p.fukitype || '',
    //       npc: p.npc,
    //     };
    //     this.ADD_CHAT(item);

    //     resolve({});
    //   }, 1200);
    // });
    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action
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
    return chatroomRef
      .add(room)
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
    const unsubscribe = chatroomRef
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
  get chatrooms(): TypeChatRoom[] {
    return this._chatrooms.map((room: TypeChatRoom) => {
      const r = makeChatRoom(room);
      r.members = r.memberIDs.map((userID: TypeUserID) => {
        return (
          userStore.getUserbyID(userID) || makeUserDisp({ id: r.createdByID })
        );
      });

      const createdBy = userStore.getUserbyID(r.createdByID);
      r.createdBy = createdBy || makeUserDisp({ id: r.createdByID });

      return r;
    });
  }

  get chatPosts(): TypeChatPost[] {
    return this._chatPosts.map((post: TypeChatPost) => {
      const r = makeChatPost(post);
      r.goodMembers = r.goodMemberIDs.map((userID: TypeUserID) => {
        return (
          userStore.getUserbyID(userID) || makeUserDisp({ id: r.createdByID })
        );
      });

      const createdBy = userStore.getUserbyID(r.createdByID);
      r.createdBy = createdBy || makeUserDisp({ id: r.createdByID });

      return r;
    });
  }

  get getUserIDsByChatRoom() {
    return (rooms: TypeChatRoom[]): TypeUserID[] => {
      const ids: TypeUserID[] = [];
      rooms.forEach((room: TypeChatRoom) => {
        room.memberIDs.forEach((u: TypeUserID) => {
          ids.push(u);
        });
      });
      return unique(ids);
    };
  }

  get getUserIDsByChatPosts() {
    return (posts: TypeChatPost[]): TypeUserID[] => {
      const ids: TypeUserID[] = [];
      posts.forEach((post: TypeChatPost) => {
        ids.push(post.createdByID);
        post.goodMemberIDs.forEach((u: TypeUserID) => {
          ids.push(u);
        });
      });
      return unique(ids);
    };
  }

  get chatItems(): TypeChatPost[] {
    return chatItems;
  }
}
