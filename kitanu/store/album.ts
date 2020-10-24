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
    id: uuidv4(),
    date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    dateDisp: dayjs().subtract(1, 'day').format('YYYY.MM.DD'),
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user],
    imgurl:
      'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
    createdAt: `${dayjs().valueOf()}`,
  },
  {
    id: uuidv4(),
    date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    dateDisp: dayjs().subtract(2, 'day').format('YYYY.MM.DD'),
    text: 'ふたつめ',
    members: [user, user, user, user, user],
    createdAt: `${dayjs().valueOf() + 1}`,
  },
  // {
  //   id: '0000003',
  //   date: '2018-08-08',
  //   dateDisp: '2018.08.08',
  //   text: 'みんなで東北へいってきたよ。',
  //   members: [user, user],
  // },
  // {
  //   id: '0000004',
  //   date: '2018-08-08',
  //   dateDisp: '2018.08.08',
  //   text:
  //     'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
  //   members: [user],
  // },
];

@Module({ name: 'album', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  albumItems: TypeAlbumItem[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_ALBUM() {
    this.albumItems = [];
  }

  @Mutation
  ADD_ALBUM(postitem: TypeAlbumItem) {
    const ary = [...this.albumItems, postitem];
    // ary.unshift(postitem);
    this.albumItems = asort(ary, 'createdAt').reverse();
  }

  @Mutation
  REMOVE_ALBUM(id: string) {
    this.albumItems = this.albumItems.filter((i: TypeAlbumItem) => i.id !== id);
  }

  @Mutation
  UPDATE_ALBUM(postitem: TypeAlbumItem) {
    console.log('UPDATE_ALBUM', postitem);

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
  FetchAlbum(page: number = 0): Promise<ActionRes> {
    if (page > 0) {
      const d = dayjs().subtract(10, 'day');
      const item: TypeAlbumItem = {
        id: uuidv4(),
        date: d.format('YYYY-MM-DD'),
        dateDisp: d.format('YYYY.MM.DD'),
        createdAt: `${d.valueOf()}`,
        text: 'もあ',
        members: [],
      };
      this.ADD_ALBUM(item);
    } else {
      albumItems.forEach((item: TypeAlbumItem) => {
        this.ADD_ALBUM(item);
      });
    }

    return Promise.resolve({});
  }

  @Action
  RemoveAlbum(id: string): Promise<ActionRes> {
    this.REMOVE_ALBUM(id);
    return Promise.resolve({});
  }

  @Action
  CreateAlbum(name: string): Promise<ActionRes> {
    // const date = dayjs().format('YYYY.MM.DD HH:mm:ss');

    return new Promise((resolve) => {
      setTimeout(() => {
        const d = dayjs();
        const item: TypeAlbumItem = {
          id: uuidv4(),
          date: d.format('YYYY-MM-DD'),
          dateDisp: d.format('YYYY.MM.DD'),
          createdAt: `${d.valueOf()}`,
          text: name,
          members: [],
        };
        this.ADD_ALBUM(item);
        resolve();
      }, 1000);
    });
  }
}
