/* eslint import/no-mutable-exports: 0 */

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import AppClass from '~/store/app';
import PostClass from '~/store/post';
import ChatClass from '~/store/chat';
import ChatInfoClass from '~/store/chatinfo';
import AlbumClass from '~/store/album';

let appStore: AppClass;
let postStore: PostClass;
let chatStore: ChatClass;
let chatinfoStore: ChatInfoClass;
let albumStore: AlbumClass;

/**
 * initialiseStores
 */
function initialiseStores(store: Store<any>): void {
  appStore = getModule(AppClass, store);
  postStore = getModule(PostClass, store);
  chatStore = getModule(ChatClass, store);
  chatinfoStore = getModule(ChatInfoClass, store);
  albumStore = getModule(AlbumClass, store);
}

export {
  initialiseStores,
  appStore,
  postStore,
  chatStore,
  chatinfoStore,
  albumStore,
};
