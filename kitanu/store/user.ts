import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionRes, TypeLoginUser } from '@/components/types/app';
import { logError } from '@/common/error';

const initialUser: TypeLoginUser = {
  email: '',
  emailVerified: false,
  displayName: '',
  photoURL: '',
  isAdmin: false,
  isAnonymous: false,
};
// 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4'

@Module({ name: 'user', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _logined: TypeLoginUser = initialUser;

  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  SET_LOGIN_USER(user: TypeLoginUser | null) {
    console.log('SET_LOGIN_USER', user);
    this._logined = user || initialUser;
  }

  // ----------------------
  // Action
  // ----------------------
  @Action({})
  LoginWithPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        console.log('パスワードログイン成功', user);
        return true;
      })
      .catch((error) => {
        console.log('パスワードログイン失敗');
        logError(error, 'LoginWithPassword');
        return false;
      });
  }

  @Action({})
  LoginByFacebook(): Promise<boolean> {
    const provider = new firebase.auth.FacebookAuthProvider();
    // provider.setCustomParameters({
    //   display: 'popup',
    // });

    return firebase
      .auth()
      .signInWithRedirect(provider)
      .then(function (result: any) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('LoginByFacebook', user);
        return true;
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...

        logError(error, 'LoginByFacebook');
        return false;
      });
  }

  @Action({})
  LoginByGoogle(): Promise<boolean> {
    return Promise.resolve(false);
  }

  @Action({})
  LoginByDev() {}

  @Action({})
  CreateUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('ユーザ作成せり', user);
        return true;
      })
      .catch((error) => {
        logError(error);
        return false;
      });
  }

  @Action({})
  Logout(): Promise<boolean> {
    return firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        return true;
      })
      .catch(function (error) {
        // An error happened.
        logError(error);
        return false;
      });
  }

  @Action({})
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

  /**
   * ログインユーザの更新
   */
  @Action({})
  UpdateLoginUser(data: {
    displayName?: string;
    photoURL?: string;
  }): Promise<boolean> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve(false);
    return user
      .updateProfile(data)
      .then(() => {
        const newdata = { ...this._logined };
        if (data.displayName) {
          newdata.displayName = data.displayName;
        }
        if (typeof data.photoURL === 'string') {
          newdata.photoURL = data.photoURL;
        }
        this.SET_LOGIN_USER(newdata);
        return true;
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return false;
      });
  }

  /**
   * パスワード更新
   */
  @Action({})
  UpdatePassword(password: string): Promise<boolean> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve(false);
    return user
      .updatePassword(password)
      .then(function () {
        // Email sent.
        return true;
      })
      .catch(function (error) {
        // An error happened.
        logError(error);
        return false;
      });
  }

  /**
   * パスワードリセットメール送信
   */
  @Action({})
  SendPasswordResetEmail(email: string): Promise<boolean> {
    const auth = firebase.auth();
    return auth
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
        return true;
      })
      .catch(function (error) {
        // An error happened.
        logError(error);
        return false;
      });
  }

  /**
   * ログインユーザのメールの更新
   */
  @Action({})
  UpdateLoginUserEmail(email: string): Promise<boolean> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve(false);
    return user
      .updateEmail(email)
      .then(function () {
        // Email sent.
        return true;
      })
      .catch(function (error) {
        // An error happened.
        logError(error);
        return false;
      });
  }

  /**
   * 確認メール送信
   */
  @Action({})
  SendEmailVerification(): Promise<boolean> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve(false);
    return user
      .sendEmailVerification()
      .then(function () {
        // Email sent.
        return true;
      })
      .catch(function (error) {
        // An error happened.
        logError(error);
        return false;
      });
  }

  // ----------------------
  // get
  // ----------------------
  get loginedUser(): TypeLoginUser {
    return this._logined;
  }
}
