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
  ADD_CHATPOST(postitem: TypeChatPost) {
    this._chatPosts = asort([...this._chatPosts, postitem], 'createdAt');
  }

  @Mutation
  REMOVE_CHATPOST(id: string) {
    this._chatPosts = this._chatPosts.filter((i: TypeChatPost) => i.id !== id);
  }

  @Mutation
  UPDATE_CHATPOST(postitem: TypeChatPost) {}

  // ----------------------
  // Action
  // ----------------------

  @Action
  ToggleGood(chatID: string): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action
  CreateChatPost(p: { chatID: string; text: string }): Promise<ActionRes> {
    const post: TypeChatPost = makeChatPost({
      text: p.text,
      createdByID: userStore.loginedUser.id,
    });

    // 作成
    return chatroomRef
      .add(post)
      .then(() => {
        log('chatroom作成せり', post);
        this.ADD_CHATPOST(post);
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
              this.REMOVE_CHATPOST(item);
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
}
