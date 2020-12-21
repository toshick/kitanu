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
  }): Promise<ActionRes> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user: any) => {
        console.log('パスワードログイン成功', user);
        return {};
      })
      .catch((error) => {
        console.log('パスワードログイン失敗');
        logError(error, 'LoginWithPassword');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({})
  LoginByFacebook(): Promise<ActionRes> {
    const provider = new firebase.auth.FacebookAuthProvider();
    // provider.setCustomParameters({
    //   display: 'popup',
    // });

    return firebase
      .auth()
      .signInWithRedirect(provider)
      .then((result: any) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('LoginByFacebook', user);
        return {};
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...

        logError(error, 'LoginByFacebook');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({})
  LoginByGoogle(): Promise<ActionRes> {
    return Promise.resolve({ errorMsg: 'no-develop' });
  }

  @Action({})
  LoginByDev() {}

  @Action({})
  CreateUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<ActionRes> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('ユーザ作成せり', user);
        return {};
      })
      .catch((error) => {
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({})
  Logout(): Promise<ActionRes> {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        return {};
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({})
  Register(data: { password: string; email: string }): Promise<ActionRes> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((_user) => {
        // Signed in
        return {};
      })
      .catch((error) => {
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({})
  UnRegister(): Promise<ActionRes> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve({ errorMsg: 'no-auth' });

    return user
      .delete()
      .then(() => {
        // User deleted.
        this.Logout();
        return {};
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * ログインユーザの更新
   */
  @Action({})
  UpdateLoginUser(data: {
    displayName?: string;
    photoURL?: string;
  }): Promise<ActionRes> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve({ errorMsg: 'no-auth' });
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
        return {};
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * パスワード更新
   */
  @Action({})
  UpdatePassword(password: string): Promise<ActionRes> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve({ errorMsg: 'no-auth' });
    return user
      .updatePassword(password)
      .then(() => {
        // Email sent.
        return {};
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * パスワードリセットメール送信
   */
  @Action({})
  SendPasswordResetEmail(email: string): Promise<ActionRes> {
    if (!email) return Promise.resolve({ errorMsg: 'no-email' });
    const auth = firebase.auth();
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
        return {};
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * ログインユーザのメールの更新
   */
  @Action({})
  UpdateLoginUserEmail(email: string): Promise<ActionRes> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve({ errorMsg: 'no-auth' });
    return user
      .updateEmail(email)
      .then(() => {
        // Email sent.
        return {};
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * 確認メール送信
   */
  @Action({})
  SendEmailVerification(): Promise<ActionRes> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve({ errorMsg: 'no-auth' });
    return user
      .sendEmailVerification()
      .then(() => {
        // Email sent.
        return {};
      })
      .catch((error) => {
        // An error happened.
        logError(error);
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  // ----------------------
  // get
  // ----------------------
  get loginedUser(): TypeLoginUser {
    return this._logined;
  }
}
