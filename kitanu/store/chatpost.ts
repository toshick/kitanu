import dayjs from 'dayjs';
import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { log, ArrayUtil } from '@/common/util';
import { makeUserDisp, makeChatPost } from '@/common/helper';
import { chatpostRef } from '@/plugins/firebase';
import { activityStore, userStore } from '@/store';
import { logError } from '@/common/error';
import { upload } from '@/common/file-uploader';

import {
  ActionRes,
  TypeChatPost,
  TypeUser,
  TypeUserID,
  TypeFile,
  ChatPostCreateRequest,
  ChatPostUpdateRequest,
  TypeFileDirPath,
} from '@/components/types/apptypes';
// import kitanuTalks from '@/assets/kitanuTalks';
import { members } from '@/mock/mockdata';

@Module({ name: 'chatpost', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _chatPosts: TypeChatPost[] = [];
  _members: TypeUser[] = members;
  _unsubscribe: Function | null = null;
  _unsubscribeComment: Function[] = [];

  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  SET_UNSUBSCRIBE(unsubscribe: Function | null) {
    this._unsubscribe = unsubscribe;
  }

  @Mutation
  SET_UNSUBSCRIBE_COMMENT(unsubscribe: Function) {
    this._unsubscribeComment.push(unsubscribe);
  }

  @Mutation
  RESET_UNSUBSCRIBE_COMMENT() {
    this._unsubscribeComment = [];
  }

  @Mutation
  RESET_CHATPOST() {
    this._chatPosts = [];
  }

  @Mutation
  ADD_CHATPOST(chatpost: TypeChatPost) {
    this._chatPosts = ArrayUtil.Asort(
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
    this._chatPosts = ArrayUtil.Asort(ary, 'createdAt').reverse();
  }

  // ----------------------
  // Action
  // ----------------------

  @Action({ rawError: true })
  ToggleGood(p: { chatpostID: string }): Promise<ActionRes> {
    const { chatpostID } = p;
    const loginUserID = userStore.loginedUser.id;

    const chatpost = this._chatPosts.find(
      (c: TypeChatPost) => c.id === chatpostID,
    );
    if (!chatpost) {
      return Promise.resolve({ errorMsg: 'no chatpost' });
    }
    let ids = [...chatpost.goodMemberIDs];
    if (ids.includes(loginUserID)) {
      ids = ids.filter((id: string) => id !== loginUserID);
    } else {
      ids.push(loginUserID);
    }

    return chatpostRef
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

  @Action({ rawError: true })
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action({ rawError: true })
  Reset(): void {
    this.RESET_CHATPOST();
  }

  @Action({ rawError: true })
  UpdateChatPost(p: ChatPostUpdateRequest): Promise<ActionRes> {
    const chatpostID = p.postid;
    if (!chatpostID) {
      return Promise.resolve({ errorMsg: 'no postid' });
    }
    const param: ChatPostUpdateRequest = {
      postid: chatpostID,
    };
    if (p.text) param.text = p.text;
    if (p.fukitype) param.fukitype = p.fukitype;
    if (p.createdAt) param.createdAt = p.createdAt;
    if (p.commentPostIDs) param.commentPostIDs = p.commentPostIDs;
    if (p.removed) param.removed = p.removed;

    return chatpostRef
      .doc(chatpostID)
      .update(param)
      .then(() => {
        return {};
      })
      .catch((error) => {
        logError(error, 'ToggleGood');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  RemoveChatPost(chatpostid: string): Promise<ActionRes> {
    return this.UpdateChatPost({
      postid: chatpostid,
      text: '--- removed ---',
      removed: true,
    });
  }

  @Action({ rawError: true })
  async RemoveChatPostReal(chatpostid: string): Promise<ActionRes> {
    // 投稿のコメント削除用にidを確保;
    const find = this._chatPosts.find((p: TypeChatPost) => p.id === chatpostid);
    if (!find) {
      return Promise.resolve({
        errorMsg: 'could not find chatpost on RemoveChatPost',
      });
    }
    const removeIDs: string[] = [...find.commentPostIDs];
    // まず投稿削除
    const res: ActionRes = await chatpostRef
      .doc(chatpostid)
      .delete()
      .then(() => {
        log('chatpost削除せり', chatpostid);
        return {};
      })
      .catch((error) => {
        logError(error, 'RemoveChatPost');
        return { errorCode: error.code, errorMsg: error.message };
      });
    if (res.errorMsg) {
      return Promise.resolve({
        errorMsg: 'could not remove chatpost',
      });
    }

    // 投稿のコメント削除
    removeIDs.forEach((chatpostID: string) => {
      chatpostRef
        .doc(chatpostID)
        .delete()
        .catch((error) => {
          logError(error, 'RemoveChatComment');
          return { errorCode: error.code, errorMsg: error.message };
        });
    });
    return Promise.resolve({});
  }

  @Action({ rawError: true })
  async CreateChatPost(p: ChatPostCreateRequest): Promise<ActionRes> {
    if (!p.chatroomID) return Promise.resolve({ errorMsg: 'no chatroomID' });

    console.log('くりえいと', p);
    let imgurl = '';
    if (p.fileItem && p.fileItem.file) {
      console.log('ふぁいる', p.fileItem.file);
      const res = await upload(p.fileItem.file, TypeFileDirPath.Postimgs);
      if (res.error) {
        return Promise.resolve({ errorMsg: 'could not upload file' });
      }
      imgurl = res.url || '';
    }

    const loginUserID = userStore.loginedUser.id;
    const post: TypeChatPost = makeChatPost({
      text: p.text,
      createdByID: loginUserID,
      chatroomID: p.chatroomID,
      fukitype: p.fukitype,
      isComment: p.isComment,
      imgurl,
    });

    // 作成
    return chatpostRef
      .doc(post.id)
      .set(post)
      .then(() => {
        log('chatpost作成せり', post);
        return { result: post };
      })
      .catch((error) => {
        logError(error, 'CreateChatRoom');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  async AddChatPostComment(p: {
    postid: string;
    commentPost: TypeChatPost;
  }): Promise<ActionRes> {
    const chatpostID = p.postid;
    if (!chatpostID) {
      return Promise.resolve({ errorMsg: 'no postid' });
    }
    console.log('AddChatPostComment', chatpostID);

    const chatpost = this._chatPosts.find(
      (c: TypeChatPost) => c.id === chatpostID,
    );
    if (!chatpost) {
      return Promise.resolve({ errorMsg: 'could not find chatpost' });
    }
    const { text } = p.commentPost;

    // chat post for comment
    const res = await this.CreateChatPost({
      chatroomID: chatpost.chatroomID,
      text,
      fukitype: '',
      isComment: true,
    });
    if (res.errorMsg) {
      return Promise.resolve({
        errorMsg: 'could create chatpost before comment post',
      });
    }
    const createdPost = res.result;
    const commentPostIDs = [...chatpost.commentPostIDs];
    commentPostIDs.push(createdPost.id);

    return this.UpdateChatPost({
      postid: chatpostID,
      commentPostIDs,
    });
  }

  @Action({ rawError: true })
  UnListen(): void {
    if (this._unsubscribe) {
      this._unsubscribe();
      this.SET_UNSUBSCRIBE(null);
    }
    this._unsubscribeComment.forEach((f: Function) => {
      f();
    });
    this.RESET_UNSUBSCRIBE_COMMENT();
  }

  @Action({ rawError: true })
  Listen(chatroomID?: string): void {
    if (!chatroomID) {
      this.UnListen();
      return;
    }
    this.UnListen();
    const unsubscribe = chatpostRef
      .where('chatroomID', '==', chatroomID)
      .where('isComment', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(30)
      .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
        let commentPostIDs: string[] = [];
        querySnapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            const { doc, type } = change;
            const item: TypeChatPost = makeChatPost(doc.data());
            console.log('Listen', type, doc.id, doc.data().id);
            if (type === 'added') {
              this.ADD_CHATPOST(item);
            } else if (type === 'modified') {
              this.UPDATE_CHATPOST(item);
            } else if (type === 'removed') {
              this.REMOVE_CHATPOST(item.id);
            }
            commentPostIDs = commentPostIDs.concat(item.commentPostIDs);
          });
        this.ListenComment(commentPostIDs);
      });
    this.SET_UNSUBSCRIBE(unsubscribe);
  }

  /**
   * in が受け付ける配列は最大10個である
   */
  @Action({ rawError: true })
  ListenComment(postIds: string[]): void {
    const idsSprit = ArrayUtil.SliceTo(postIds, 10);
    idsSprit.forEach((ids: string[]) => {
      this.ListenCommentExe(ids);
    });
  }

  @Action({ rawError: true })
  ListenCommentExe(postIds: string[]): void {
    if (postIds.length === 0) {
      return;
    }
    const unsubscribe = chatpostRef
      .where('id', 'in', postIds)
      .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            const { doc, type } = change;
            const item: TypeChatPost = makeChatPost(doc.data());
            // console.log('ListenComment', type, doc.id, doc.data().text);
            if (type === 'added') {
              this.ADD_CHATPOST(item);
            } else if (type === 'modified') {
              this.UPDATE_CHATPOST(item);
            } else if (type === 'removed') {
              this.REMOVE_CHATPOST(item.id);
            }
          });
      });
    this.SET_UNSUBSCRIBE_COMMENT(unsubscribe);
  }

  // ----------------------
  // get
  // ----------------------

  get chatPosts(): TypeChatPost[] {
    return this._chatPosts
      .filter((post: TypeChatPost) => {
        return !post.isComment;
      })
      .map((post: TypeChatPost) => {
        const r = makeChatPost(post);
        r.goodMembers = r.goodMemberIDs.map((userID: TypeUserID) => {
          return (
            userStore.getUserbyID(userID) || makeUserDisp({ id: r.createdByID })
          );
        });
        r.comments = r.commentPostIDs
          .map((postid: string) => {
            const commentPost = this._chatPosts.find(
              (p: TypeChatPost) => p.id === postid,
            );
            if (!commentPost) {
              return null;
            }
            const post = { ...commentPost };
            const createdBy = userStore.getUserbyID(post.createdByID);
            post.createdBy =
              createdBy || makeUserDisp({ id: post.createdByID });
            return post;
          })
          .filter((p: TypeChatPost | null) => p !== null) as TypeChatPost[];

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

        ids.concat(post.commentPostIDs);
        // post.comments.forEach((commentPost: TypeChatPost) => {
        //   ids.push(commentPost.id);
        // });
      });
      return ArrayUtil.Unique(ids);
    };
  }

  // get chatItems(): TypeChatPost[] {
  //   return chatItems;
  // }

  get members(): TypeUser[] {
    return [];
  }
}
