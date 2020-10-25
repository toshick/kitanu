import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionRes, TypeUser } from '@/components/types/app';

// import { firebase } from '@/plugins/firebase.ts';

const loginUser = {
  id: uuidv4(),
  username: 'ログインしているユーザさん',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
};

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  logined: TypeUser = loginUser;
  isAdmin: boolean = false;
  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  SET_ADMIN(flg: boolean) {
    this.isAdmin = flg;
  }

  @Mutation
  SET_LOGIN_USER(user: TypeUser) {
    this.logined = user;
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

  @Action
  Register(data: { name: string; mail: string }): Promise<ActionRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('とうろく', data);
        // resolve(<ActionRes>{
        //   error: true,
        //   msg: 'なんか登録に失敗しました。メンゴでござる',
        // });
        resolve(<ActionRes>{});
      }, 1200);
    });
  }

  // ----------------------
  // get
  // ----------------------
  // get logined(): boolean {
  //   return checkAuth();
  // }
}
