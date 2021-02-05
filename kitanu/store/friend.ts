// import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ArrayUtil, setClipBoard } from '@/common/util';
import { ActionRes, TypeUser } from '@/components/types/apptypes';
import { friends } from '@/mock/mockdata';

@Module({ name: 'friend', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _friends: TypeUser[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_FRIEND() {
    this._friends = [];
  }

  @Mutation
  ADD_FRIEND(friend: TypeUser) {
    const find = this._friends.find((d: TypeUser) => d.id === friend.id);
    if (find) return;
    const ary = [...this._friends, friend];
    this._friends = ArrayUtil.Asort(ary, 'createdAt').reverse();
  }

  @Mutation
  UPDATE_USER(friend: TypeUser) {
    const ary = this._friends.map((u: TypeUser) => {
      if (u.id === friend.id) {
        return { ...u, ...friend };
      }
      return u;
    });
    this._friends = ArrayUtil.Asort(ary, 'createdAt').reverse();
  }

  @Mutation
  REMOVE_FRIEND(friend: TypeUser) {
    this._friends = this._friends.filter((d: TypeUser) => d.id !== friend.id);
  }

  // ----------------------
  // Action
  // ----------------------

  @Action
  FetchFriends(): Promise<ActionRes> {
    friends.forEach((item: TypeUser) => {
      this.ADD_FRIEND(item);
    });

    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action
  CreateFriendLink(): Promise<ActionRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const link = `キタキータヌにごしょーたいヌ\n${
          process.env.FRIEND_LINK_BASE
        }/?invite=${uuidv4()}`;
        // if (navigator.clipboard) {
        //   navigator.clipboard.writeText(link);
        // }
        setClipBoard(link);

        resolve({});
      }, 0);
    });
  }

  // ----------------------
  // get
  // ----------------------
  get friends(): TypeUser[] {
    return this._friends;
  }
}
