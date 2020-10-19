import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { ActionRes, TypeAlbumItem, TypeUser } from '@/components/types/app';

const user: TypeUser = {
  id: '0000001',
  username: 'ニャオスカマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
};

export const albumItems: TypeAlbumItem[] = [
  {
    id: '0000001',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user],
  },
  {
    id: '0000002',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user, user, user],
  },
  {
    id: '0000003',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text: 'みんなで東北へいってきたよ。',
    members: [user, user],
  },
  {
    id: '0000004',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user],
  },
];

@Module({ name: 'album', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  albumItems: TypeAlbumItem[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_POST() {
    this.albumItems = [];
  }

  @Mutation
  ADD_CHAT(postitem: TypeAlbumItem) {
    const ary = [...this.albumItems];
    ary.unshift(postitem);
    this.albumItems = asort(ary, 'postdate').reverse();
  }

  @Mutation
  REMOVE_POST(id: string) {
    this.albumItems = this.albumItems.filter((i: TypeAlbumItem) => i.id !== id);
  }

  @Mutation
  UPDATE_POST(postitem: TypeAlbumItem) {
    console.log('UPDATE_POST', postitem);

    // this.chatitems = this.chatitems.map((i: TypeAlbumItem) => {
    //   if (i.id === postitem.id) {
    //     i = postitem;
    //   }
    //   return i;
    // });
  }

  // ----------------------
  // Action
  // ----------------------

  @Action
  FetchPost(): Promise<ActionRes> {
    this.RESET_POST();
    // const date = dayjs().format('YYYY.MM.DD HH:mm:ss');

    albumItems.forEach((item: TypeAlbumItem) => {
      this.ADD_CHAT(item);
    });

    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }
}
