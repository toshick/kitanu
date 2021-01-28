/* eslint import/no-mutable-exports: 0 */

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import AppClass from '~/store/app';
import PostClass from '~/store/post';
import ChatListClass from '~/store/chatlist';
import ChatPostClass from '~/store/chatpost';
import ChatInfoClass from '~/store/chatinfo';
import AlbumClass from '~/store/album';
import FriendClass from '~/store/friend';
import FirebaseClass from '~/store/firebase';
import UserClass from '~/store/user';
import ActivityClass from '~/store/activity';

let appStore: AppClass;
let postStore: PostClass;
let chatListStore: ChatListClass;
let chatPostStore: ChatPostClass;
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
  chatListStore = getModule(ChatListClass, store);
  chatPostStore = getModule(ChatPostClass, store);
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
  chatListStore,
  chatPostStore,
  chatinfoStore,
  albumStore,
  friendStore,
  firebaseStore,
  userStore,
  activityStore,
};
