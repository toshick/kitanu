import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { arrayAsort, log, arraySliceTo } from '@/common/util';
import { makeUserFromAuthUser, makeUser, makeUserDisp } from '@/common/helper';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { userRef } from '@/plugins/firebase';
import { logError } from '@/common/error';
import { activityStore } from '@/store';

import {
  ActionRes,
  TypeLoginUser,
  TypeUser,
  TypeUserDisp,
  TypeUserID,
} from '@/components/types/apptypes';

const initialUser: TypeLoginUser = {
  uid: '',
  email: '',
  emailVerified: false,
  displayName: '',
  photoURL: '',
};
// 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4'

@Module({ name: 'user', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _logined: TypeLoginUser = initialUser;
  _users: TypeUser[] = [];
  _unsubscribe: Function | null = null;

  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  SET_UNSUBSCRIBE(unsubscribe: Function | null) {
    this._unsubscribe = unsubscribe;
  }

  @Mutation
  SET_LOGIN_USER(user: TypeLoginUser | null) {
    this._logined = user || initialUser;
  }

  @Mutation
  UPDATE_USER(user: TypeUser) {
    const ary = this._users.map((u: TypeUser) => {
      if (u.id === user.id) {
        return { ...u, ...user };
      }
      return u;
    });
    this._users = arrayAsort(ary, 'createdAt').reverse();
  }

  @Mutation
  ADD_USER(user: TypeUser) {
    const find = this._users.find((d: TypeUser) => d.id === user.id);
    if (find) return;
    const ary = [...this._users, user];
    this._users = arrayAsort(ary, 'createdAt').reverse();
  }

  @Mutation
  REMOVE_USER(user: TypeUser) {
    this._users = this._users.filter((d: TypeUser) => d.id !== user.id);
  }

  // ----------------------
  // Action
  // ----------------------
  @Action({ rawError: true })
  async LoginWithPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ActionRes> {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        return res;
      })
      .catch((error) => {
        log('パスワードログイン失敗');
        logError(error, 'LoginWithPassword');
        return { errorCode: error.code, errorMsg: error.message };
      });

    if (res.errorCode) {
      return Promise.resolve(res);
    }
    const { user } = res;

    this.SET_LOGIN_USER({
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      emailVerified: user.emailVerified,
      photoURL: user.photoURL || '',
    });

    await this.FetchUsers({ ids: [user.uid] });

    // Activity;
    activityStore.AddActivity({
      text: `「${user.displayName}」がログインしたーヌ`,
      tags: ['ログイン'],
    });
    return {};
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
        log('LoginByFacebook', user);
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
    subtext?: string;
    photoURL?: string;
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
      return Promise.resolve(res);
    }

    // firestoreのusersにも追加する
    const createdUser: TypeUser = makeUserFromAuthUser({
      ...res.user,
      displayName: p.name,
    });
    createdUser.subtext = p.subtext || '';
    createdUser.iconurl = p.photoURL || '';

    // ユーザ作成
    const res2 = await userRef
      .doc(createdUser.id)
      .set(createdUser)
      .then(() => {
        log('ユーザ作成せり', createdUser);
        // Activity;
        activityStore.AddActivity({
          text: `「${createdUser.username}」を作成したーヌ`,
          tags: ['ユーザ作成'],
        });
        return { errorCode: null };
      })
      .catch((error) => {
        logError(error, 'makeUserFromAuthUser');
        return { errorCode: error.code, errorMsg: error.message };
      });
    if (res2.errorCode) {
      return Promise.resolve(res);
    }

    // ログインユーザ名を更新
    const res3: any = await this.UpdateLoginUser({
      displayName: p.name,
      photoURL: p.photoURL || '',
    });
    if (res3.errorCode) {
      return Promise.resolve(res);
    }
    return {};
  }

  @Action({ rawError: true })
  Logout(): Promise<ActionRes> {
    if (!this._logined.uid) {
      return Promise.resolve({ errorMsg: 'already logouted' });
    }
    // Activity;
    activityStore.AddActivity({
      text: `「${this.loginedUser.username}」がログアウトしたーヌ`,
      tags: ['ログアウト'],
    });
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        activityStore.Listen(false);
        this.Listen(false);
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
  async UnRegister(): Promise<ActionRes> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve({ errorMsg: 'no-auth' });

    // firestoreでのユーザをまず削除
    const res = await this.UpdateUser({ id: user.uid, removed: true });
    if (res.errorCode) {
      return Promise.resolve(res);
    }

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
  async UpdateLoginUser(data: {
    displayName?: string;
    photoURL?: string;
  }): Promise<ActionRes> {
    const { displayName, photoURL } = data;
    const user = firebase.auth().currentUser;
    if (!user) return Promise.resolve({ errorMsg: 'no-auth' });

    // firestoreでのユーザを取得
    const res = await this.FetchUsers({ ids: [user.uid] });
    if (res.errorCode) {
      return Promise.resolve(res);
    }

    // firestoreでのユーザを更新
    const res2 = await this.UpdateUser({
      id: user.uid,
      username: displayName,
    });
    if (res2.errorCode) {
      return Promise.resolve(res);
    }

    return user
      .updateProfile(data)
      .then(() => {
        const newdata = { ...this._logined };
        if (displayName) {
          newdata.displayName = displayName;
        }
        if (typeof photoURL === 'string') {
          newdata.photoURL = photoURL;
        }
        this.SET_LOGIN_USER(newdata);
        // Activity;
        activityStore.AddActivity({
          text: `ユーザ名を「${displayName}」に変更ヌ`,
          tags: ['ユーザ名変更'],
        });
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
    if (!user) {
      return Promise.resolve({
        errorMsg: 'no-auth',
      });
    }
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
   * UpdateUser
   */
  @Action({ rawError: true })
  UpdateUser(user: Partial<TypeUser>): Promise<ActionRes> {
    const { id } = user;
    const find = this._users.find((d: TypeUser) => d.id === user.id);
    if (!find) {
      return Promise.resolve({ errorMsg: 'no user finded' });
    }

    return userRef
      .doc(id)
      .update(user)
      .then(() => {
        this.UPDATE_USER({ ...find, ...user });
        return {};
      })
      .catch((error) => {
        logError(error, 'UpdateUser');
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
  async MakeDummyUser(p: {
    email: string;
    password: string;
    name: string;
    subtext: string;
    photoURL: string;
  }): Promise<ActionRes> {
    if (!p.email) {
      return Promise.resolve({
        errorMsg: 'no email provided',
      });
    }
    const res = await this.CreateUserWithEmailAndPassword({
      email: p.email,
      password: p.password,
      name: p.name || '',
      subtext: p.subtext || '',
      photoURL: p.photoURL || '',
    });
    if (res.errorMsg) {
      return Promise.resolve({
        errorMsg: 'CreateUserWithEmailAndPassword failed',
      });
    }
    return {};
  }

  @Action({ rawError: true })
  FetchUsers(p: { ids: string[]; omitIfExist?: boolean }): Promise<ActionRes> {
    const { ids, omitIfExist } = p;
    let myids = ids || [];
    if (omitIfExist) {
      const existIds = this._users.map((u: TypeUser) => u.id);
      if (existIds) {
        myids = ids.filter((id: string) => {
          return !existIds.includes(id);
        });
      }
    }
    if (myids.length === 0) {
      return Promise.resolve({});
    }

    const myidsSprit = arraySliceTo(myids, 10);
    const ps: Promise<ActionRes>[] = [];
    myidsSprit.forEach((ids: string[]) => {
      ps.push(this.FetchUsersExe(ids));
    });
    return Promise.all(ps).then(() => {
      return {};
    });
  }

  @Action({ rawError: true })
  FetchUsersExe(ids: string[]): Promise<ActionRes> {
    log('FetchUsersExe', ids);
    return userRef
      .where('id', 'in', ids)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.ADD_USER(makeUser(doc.data()));
        });
        this.Listen(true);
        return {};
      })
      .catch((error) => {
        logError(error, 'FetchUsers');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  Listen(flg: boolean): void {
    if (!flg) {
      if (this._unsubscribe) {
        this._unsubscribe();
        this.SET_UNSUBSCRIBE(null);
      }
      return;
    }
    const ids = this._users.map((u: TypeUser) => u.id);
    if (ids.length === 0) {
      return;
    }
    if (this._unsubscribe) {
      this._unsubscribe();
    }
    const unsubscribe = userRef
      .where('id', 'in', ids)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            const { doc, type } = change;
            const item: TypeUser = makeUser(doc.data());
            console.log('type', type, item);
            if (type === 'added') {
              this.ADD_USER(item);
            } else if (type === 'modified') {
              this.UPDATE_USER(item);
            } else if (type === 'removed') {
              this.REMOVE_USER(item);
            }
          });
      });
    this.SET_UNSUBSCRIBE(unsubscribe);
  }

  @Action({ rawError: true })
  SearchUser(str: string): Promise<ActionRes | { list: any[] }> {
    let query = userRef as firebase.firestore.Query;
    if (str.length === 28) {
      query = query.where('id', '==', str);
    } else {
      query = query.where('username', '==', str);
    }

    return query
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const list: any[] = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        return { list };
      })
      .catch((error) => {
        logError(error, 'FetchUsers');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  AddFriend(list: TypeUser[]): Promise<ActionRes> {
    const find = this._users.find((d: TypeUser) => d.id === this._logined.uid);
    if (!find) {
      return Promise.resolve({
        errorMsg: 'can not find login user',
      });
    }
    const friendList: {
      id: string;
      username: string;
    }[] = list.map((u: TypeUser) => ({ id: u.id, username: u.username }));
    return userRef
      .doc(find.id)
      .update({
        friendIdList: friendList
          .map((f: { id: string; username: string }) => f.id)
          .concat(find.friendIdList),
      })
      .then(() => {
        log('AddFriend', friendList);
        const friendNames = friendList
          .map((f: { id: string; username: string }) => f.username)
          .join(', ');
        // Activity;
        activityStore.AddActivity({
          text: `「${friendNames}」とトモダチになったーヌ`,
          tags: ['トモダチ'],
        });
        return {};
      })
      .catch((error) => {
        logError(error, 'AddFriend');
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
    let ret: TypeUser = {
      id: this._logined.uid as TypeUserID,
      username: this._logined.displayName,
      iconurl: this._logined.photoURL,
      subtext: '',
      friendIdList: [],
      isAdmin: false,
      isAnonymous: false,
      searchOK: false,
      kycOK: false,
      agreeTermsOK: false,
      removed: false,
      createdAt: 0,
    };
    const find = this._users.find((d: TypeUser) => d.id === this._logined.uid);
    if (find) {
      ret = {
        ...ret,
        ...find,
      };
    }

    return ret;
  }

  get loginedUserFriends(): TypeUserDisp[] {
    return this.loginedUser.friendIdList.map((userID: TypeUserID) => {
      const find = this._users.find((d: TypeUser) => d.id === userID);
      if (find) return makeUserDisp(find);
      return makeUserDisp({ id: userID });
    });
  }

  get logined(): boolean {
    return !!this._logined.uid;
  }

  get users(): TypeUser[] {
    return this._users;
  }

  get getUserbyID() {
    return (userID: TypeUserID): TypeUserDisp | null => {
      const find = this._users.find((d: TypeUser) => d.id === userID);
      if (!find) return null;
      return makeUserDisp(find);
    };
  }
}
