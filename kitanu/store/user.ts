import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { isLocal } from '@/common/util';
import { makeUserFromAuthUser } from '@/common/helper';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { userRef } from '@/plugins/firebase';
import { logError } from '@/common/error';
import {
  ActionRes,
  TypeLoginUser,
  TypeUser,
} from '@/components/types/apptypes';

const initialUser: TypeLoginUser = {
  uid: '',
  email: '',
  emailVerified: false,
  displayName: '',
  photoURL: '',
  isAdmin: false,
  isAnonymous: false,
  searchOK: false,
  kycOK: false,
  agreeTermsOK: false,
};
// 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4'

@Module({ name: 'user', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _logined: TypeLoginUser = initialUser;
  _users: TypeUser[] = [];

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
  @Action({ rawError: true })
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

  @Action({ rawError: true })
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

  @Action({ rawError: true })
  LoginByGoogle(): Promise<ActionRes> {
    return Promise.resolve({ errorMsg: 'no-develop' });
  }

  @Action({ rawError: true })
  LoginByDev() {}

  @Action({ rawError: true })
  async CreateUserWithEmailAndPassword(p: {
    email: string;
    password: string;
    name: string;
  }): Promise<ActionRes> {
    // ユーザ名を作成しログイン状態になる
    const res: any = await firebase
      .auth()
      .createUserWithEmailAndPassword(p.email, p.password)
      .then((res) => {
        // Signed in
        return res;
      })
      .catch((error) => {
        logError(error, 'createUserWithEmailAndPassword');
        return { errorCode: error.code, errorMsg: error.message };
      });

    if (res.errorCode) {
      return Promise.reject(res);
    }

    // ログインユーザ名を更新
    const res2: any = await this.UpdateLoginUser({
      displayName: p.name,
    });
    if (res2.errorCode) {
      return Promise.reject(res);
    }

    // firestoreのusersにも追加する
    const createdUser: TypeUser = makeUserFromAuthUser({
      ...res.user,
      displayName: p.name,
    });

    return userRef
      .doc(createdUser.id)
      .set(createdUser)
      .then(() => {
        console.log('ユーザ作成せり', createdUser);
        return {};
      })
      .catch((error) => {
        logError(error, 'makeUserFromAuthUser');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
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
        logError(error, 'Logout');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  Register(data: { password: string; email: string }): Promise<ActionRes> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((_user) => {
        // Signed in
        return {};
      })
      .catch((error) => {
        logError(error, 'Register');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
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
        logError(error, 'UnRegister');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * ログインユーザの更新
   */
  @Action({ rawError: true })
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
        logError(error, 'UpdateLoginUser');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * パスワード更新
   */
  @Action({ rawError: true })
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
        logError(error, 'UpdatePassword');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * パスワードリセットメール送信
   */
  @Action({ rawError: true })
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
        logError(error, 'SendPasswordResetEmail');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * ログインユーザのメールの更新
   */
  @Action({ rawError: true })
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
        logError(error, 'UpdateLoginUserEmail');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * 確認メール送信
   */
  @Action({ rawError: true })
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
        logError(error, 'SendEmailVerification');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  /**
   * ダミーユーザ作成
   */
  @Action({ rawError: true })
  MakeDummyUser(p: {
    email: string;
    password: string;
    name?: string;
  }): Promise<ActionRes> {
    if (!p.email) return Promise.reject(new Error('no email provided'));
    return this.CreateUserWithEmailAndPassword({
      email: p.email,
      password: p.password,
      name: p.name || '',
    });
  }

  @Action({ rawError: true })
  FetchUsers(ids: string[]): Promise<ActionRes> {
    return userRef
      .where('id', 'in', ids)
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('FetchUsers', doc.id, ' => ', doc.data());
          // const d: any = doc.data();
          // const item: TypeAlbum = {
          //   id: d.id,
          //   date: d.date,
          //   dateDisp: d.dateDisp,
          //   title: d.title,
          //   text: d.text,
          //   members: d.members,
          //   createdAt: d.createdAt,
          // };
          // this.ADD_ALBUM(item);
        });
        return {};
      })
      .catch((error) => {
        logError(error, 'FetchUsers');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  // ----------------------
  // get
  // ----------------------
  get loginedUserWithDetail(): TypeLoginUser {
    return this._logined;
  }

  get loginedUser(): TypeUser {
    return {
      id: this._logined.uid,
      username: this._logined.displayName,
      iconurl: this._logined.photoURL,
      subtext: '',
      friendList: [],
    };
  }

  get users(): TypeUser[] {
    return this._users;
  }
}
