// import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort, setClipBoard } from '@/common/util';
import { ActionRes, TypeUser } from '@/components/types/app';

const FRIEND_LINK_BASE = 'https://kitakitanu.netlify.app';
const friends: TypeUser[] = [];
friends.push({
  id: uuidv4(),
  username: 'ニャオスカマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: '今宵はよい月である',
});
friends.push({
  id: uuidv4(),
  username: 'えだじまへいはちさん',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: '男塾塾長である',
});

@Module({ name: 'friend', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  friends: TypeUser[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_FRIEND() {
    this.friends = [];
  }

  @Mutation
  ADD_FRIEND(postitem: TypeUser) {
    const ary = [...this.friends];
    ary.unshift(postitem);
    this.friends = asort(ary, 'createdAt').reverse();
  }

  @Mutation
  REMOVE_FRIEND(id: string) {
    this.friends = this.friends.filter((i: TypeUser) => i.id !== id);
  }

  // ----------------------
  // Action
  // ----------------------

  @Action
  FetchFriends(loginUserID: string): Promise<ActionRes> {
    console.log('loginUserIDのフレンドを取得', loginUserID);
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
        const link = `キタキータヌにごしょーたいヌ\n${FRIEND_LINK_BASE}/?invite=${uuidv4()}`;
        // if (navigator.clipboard) {
        //   navigator.clipboard.writeText(link);
        // }
        setClipBoard(link);

        resolve();
      }, 0);
    });
  }
}
