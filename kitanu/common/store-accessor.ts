/* eslint import/no-mutable-exports: 0 */

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import AppClass from '~/store/app';
import PostClass from '~/store/post';

let appStore: AppClass;
let postStore: PostClass;

/**
 * initialiseStores
 */
function initialiseStores(store: Store<any>): void {
  appStore = getModule(AppClass, store);
  postStore = getModule(PostClass, store);
}

export { initialiseStores, appStore, postStore };
