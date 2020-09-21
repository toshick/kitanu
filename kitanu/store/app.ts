import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
// import { firebase } from '@/plugins/firebase.ts';

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  logined: boolean = false;
  isAdmin: boolean = false;
  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  SET_ADMIN(flg: boolean) {
    this.isAdmin = flg;
  }

  @Mutation
  SET_LOGIN_USER(logined: boolean) {
    this.logined = logined;
  }

  // ----------------------
  // Action
  // ----------------------
  // @Action
  // Login({ email, password }: { email: string; password: string }) {
  //   return firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch(function (error) {
  //       // Handle Errors here.
  //       // const errorCode = error.code;
  //       // const errorMessage = error.message;
  //       console.log('ログイン失敗', error);
  //     });
  // }

  // @Action
  // async FetchEntries() {
  //   return await client.getEntries({
  //     content_type: process.env.CTF_BLOG_POST_TYPE_ID,
  //     order: '-sys.createdAt',
  //     limit: 20,
  //   });
  // }

  // ----------------------
  // get
  // ----------------------
  // get logined(): boolean {
  //   return checkAuth();
  // }
}
