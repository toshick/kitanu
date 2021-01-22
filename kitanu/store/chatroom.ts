import dayjs from 'dayjs';
import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort, log, unique } from '@/common/util';
import { makeUserDisp, makeChatPost } from '@/common/helper';
import { chatroomRef } from '@/plugins/firebase';
import { activityStore, userStore } from '@/store';
import { logError } from '@/common/error';

import {
  ActionRes,
  TypeChatPost,
  TypeUser,
  TypeUserID,
  TypeUserDisp,
} from '@/components/types/apptypes';
import kitanuTalks from '@/assets/kitanuTalks';
import { members, chatItems } from '@/mock/mockdata';

@Module({ name: 'chatroom', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _chatPosts: TypeChatPost[] = [];
  _members: TypeUser[] = members;
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
  ADD_CHATPOST(chatpost: TypeChatPost) {
    this._chatPosts = asort(
      [...this._chatPosts, chatpost],
      'createdAt',
    ).reverse();
  }

  @Mutation
  REMOVE_CHATPOST(id: string) {
    this._chatPosts = this._chatPosts.filter(
      (chatpost: TypeChatPost) => chatpost.id !== id,
    );
  }

  @Mutation
  UPDATE_CHATPOST(chatpost: TypeChatPost) {
    const ary = this._chatPosts.map((c: TypeChatPost) => {
      if (c.id === chatpost.id) {
        return { ...c, ...chatpost };
      }
      return c;
    });
    this._chatPosts = asort(ary, 'createdAt').reverse();
  }

  // ----------------------
  // Action
  // ----------------------

  @Action
  ToggleGood(p: { chatpostID: string }): Promise<ActionRes> {
    const { chatpostID } = p;
    const loginUserID = userStore.loginedUser.id;

    const chatpost = this._chatPosts.find(
      (c: TypeChatPost) => c.id === chatpostID,
    );
    if (!chatpost) {
      return Promise.reject(new Error('no chatpost'));
    }
    let ids = [...chatpost.goodMemberIDs];
    if (ids.includes(loginUserID)) {
      ids = ids.filter((id: string) => id !== loginUserID);
    } else {
      ids.push(loginUserID);
    }
    console.log('ToggleGood', chatpostID, 'ids', ids);

    return chatroomRef
      .doc(chatpostID)
      .update({
        goodMemberIDs: ids,
      })
      .then(() => {
        return {};
      })
      .catch((error) => {
        logError(error, 'ToggleGood');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action
  Reset(): void {
    this.RESET_CHATPOST();
  }

  @Action
  CreateChatPost(p: { chatroomID: string; text: string }): Promise<ActionRes> {
    if (!p.chatroomID) return Promise.reject(new Error('no chatroomID'));
    const loginUserID = userStore.loginedUser.id;
    const post: TypeChatPost = makeChatPost({
      text: p.text,
      createdByID: loginUserID,
      chatroomID: p.chatroomID,
    });

    // 作成
    return chatroomRef
      .doc(post.id)
      .set(post)
      .then(() => {
        log('chatroom作成せり', post);
        return {};
      })
      .catch((error) => {
        logError(error, 'CreateChatRoom');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  Listen(chatroomID?: string): void {
    if (!chatroomID) {
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
      .where('chatroomID', '==', chatroomID)
      .orderBy('createdAt', 'desc')
      .limit(30)
      .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            const { doc, type } = change;
            const item: TypeChatPost = makeChatPost(doc.data());
            console.log('Listen', type, item);
            if (type === 'added') {
              this.ADD_CHATPOST(item);
            } else if (type === 'modified') {
              this.UPDATE_CHATPOST(item);
            } else if (type === 'removed') {
              this.REMOVE_CHATPOST(item.id);
            }
          });
      });
    this.SET_UNSUBSCRIBE(unsubscribe);
  }

  // ----------------------
  // get
  // ----------------------

  get chatPosts(): TypeChatPost[] {
    return this._chatPosts.map((post: TypeChatPost) => {
      const r = makeChatPost(post);
      r.goodMembers = r.goodMemberIDs.map((userID: TypeUserID) => {
        return (
          userStore.getUserbyID(userID) || makeUserDisp({ id: r.createdByID })
        );
      });
      r.comments = r.comments.map((commentPost: TypeChatPost) => {
        const c = makeChatPost(commentPost);
        const createdBy = userStore.getUserbyID(c.createdByID);
        c.createdBy = createdBy || makeUserDisp({ id: c.createdByID });
        return c;
      });

      const createdBy = userStore.getUserbyID(r.createdByID);
      r.createdBy = createdBy || makeUserDisp({ id: r.createdByID });

      return r;
    });
  }

  get getUserIDsByChatPosts() {
    return (posts: TypeChatPost[]): TypeUserID[] => {
      const ids: TypeUserID[] = [];
      posts.forEach((post: TypeChatPost) => {
        ids.push(post.createdByID);
        post.goodMemberIDs.forEach((u: TypeUserID) => {
          ids.push(u);
        });
        post.comments.forEach((commentPost: TypeChatPost) => {
          ids.push(commentPost.id);
        });
      });
      return unique(ids);
    };
  }

  get chatItems(): TypeChatPost[] {
    return chatItems;
  }

  get members(): TypeUser[] {
    return [];
  }
}
