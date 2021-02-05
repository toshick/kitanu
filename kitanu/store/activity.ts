import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionRes, TypeActivity, TypeUser } from '@/components/types/apptypes';
import { makeActivity, makeUserDisp } from '@/common/helper';
import { logError } from '@/common/error';
import { log, ArrayUtil } from '@/common/util';
import { userStore } from '@/store';
import { activityRef } from '@/plugins/firebase.ts';

@Module({ name: 'activity', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _activities: TypeActivity[] = [];
  _unsubscribe: Function | null = null;
  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  ADD_ACTIVITY(activity: TypeActivity) {
    const find = this._activities.find(
      (d: TypeActivity) => d.id === activity.id,
    );
    if (find) return;
    this._activities = ArrayUtil.Asort(
      [activity, ...this._activities],
      'createdAt',
    ).reverse();
  }

  @Mutation
  SET_UNSUBSCRIBE_ACTIVITY(unsubscribe: Function | null) {
    this._unsubscribe = unsubscribe;
  }

  // ----------------------
  // Action
  // ----------------------
  @Action({ rawError: true })
  AddActivity(p: { text: string; tags?: string[] }): Promise<ActionRes> {
    const userID = userStore.loginedUser.id;
    const activity = makeActivity({
      userID,
      text: p.text || '',
      tags: p.tags || [],
    });
    log('Activity', activity.text);

    return activityRef
      .add(activity)
      .then(() => {
        log('activity作成せり', activity);
        return {};
      })
      .catch((error) => {
        logError(error, 'makeUserFromAuthUser');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  FetchActivity(): Promise<ActionRes> {
    const { id } = userStore.loginedUser;
    return activityRef
      .where('userID', '==', id)
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          const d = doc.data();
          const item: TypeActivity = makeActivity(d);
          this.ADD_ACTIVITY(item);
        });
        return {};
      })
      .catch((error) => {
        logError(error, 'FetchActivity');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  @Action({ rawError: true })
  Listen(flg: boolean): void {
    if (!flg) {
      if (this._unsubscribe) {
        this._unsubscribe();
        this.SET_UNSUBSCRIBE_ACTIVITY(null);
      }
      return;
    }
    if (this._unsubscribe) return;
    const { id } = userStore.loginedUser;
    const unsubscribe = activityRef
      .where('userID', '==', id)
      .limit(50)
      .onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            const { doc, type } = change;
            const d = makeActivity(doc.data());
            if (type === 'added') {
              this.ADD_ACTIVITY(d);
            } else if (type === 'modified') {
              // imgpostStore.UPDATE_TAG(getTagItem(d));
            } else if (type === 'removed') {
              // imgpostStore.REMOVE_TAG(d.id);
            }
          });
      });
    this.SET_UNSUBSCRIBE_ACTIVITY(unsubscribe);
  }

  // ----------------------
  // get
  // ----------------------
  get activities(): TypeActivity[] {
    return this._activities.map((a: TypeActivity) => {
      const activity: TypeActivity = { ...a };
      const find = userStore.users.find((d: TypeUser) => d.id === a.userID);
      if (find) {
        activity.user = makeUserDisp(find);
      }
      return activity;
    });
  }
}
