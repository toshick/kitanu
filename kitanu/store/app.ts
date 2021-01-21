import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {
  activityStore,
  userStore,
  chatRoomStore,
  chatListStore,
  COOKIE_AUTH,
} from '@/store';
import { TypeLoginUser } from '@/components/types/apptypes';
@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  // ----------------------
  // Mutation
  // ----------------------
  // ----------------------
  // Action
  // ----------------------
  @Action({ rawError: true })
  afterLogin(user: TypeLoginUser): void {
    console.log('afterLogin');
    userStore.SET_LOGIN_USER({
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      emailVerified: user.emailVerified,
      photoURL: user.photoURL || '',
    });
    userStore.FetchUsers({ ids: [user.uid] });
    activityStore.Listen(true);
    chatListStore.Listen(true);

    Cookies.set(COOKIE_AUTH, 'yes');
  }

  @Action({ rawError: true })
  afterLogout(): void {
    console.log('afterLogout');
    Cookies.remove(COOKIE_AUTH);
    userStore.SET_LOGIN_USER(null);
    activityStore.Listen(false);
    chatListStore.Listen(false);
  }
  // ----------------------
  // get
  // ----------------------
}
