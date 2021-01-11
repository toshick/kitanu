/* eslint import/no-mutable-exports: 0 */

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import AppClass from '~/store/app';
import PostClass from '~/store/post';
import ChatClass from '~/store/chat';
import ChatInfoClass from '~/store/chatinfo';
import AlbumClass from '~/store/album';
import FriendClass from '~/store/friend';
import FirebaseClass from '~/store/firebase';
import UserClass from '~/store/user';
import ActivityClass from '~/store/activity';

let appStore: AppClass;
let postStore: PostClass;
let chatStore: ChatClass;
let chatinfoStore: ChatInfoClass;
let albumStore: AlbumClass;
let friendStore: FriendClass;
let firebaseStore: FirebaseClass;
let userStore: UserClass;
let activityStore: ActivityClass;

/**
 * initialiseStores
 */
function initialiseStores(store: Store<any>): void {
  appStore = getModule(AppClass, store);
  postStore = getModule(PostClass, store);
  chatStore = getModule(ChatClass, store);
  chatinfoStore = getModule(ChatInfoClass, store);
  albumStore = getModule(AlbumClass, store);
  friendStore = getModule(FriendClass, store);
  firebaseStore = getModule(FirebaseClass, store);
  userStore = getModule(UserClass, store);
  activityStore = getModule(ActivityClass, store);
}

export {
  initialiseStores,
  appStore,
  postStore,
  chatStore,
  chatinfoStore,
  albumStore,
  friendStore,
  firebaseStore,
  userStore,
  activityStore,
};
