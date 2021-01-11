import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort, zeropad } from '@/common/util';
import { ActionRes, TypeChatPost } from '@/components/types/apptypes';
// import { setUpPostImg, firebase, postImgRef, tagRef, Tag, PostImg, PostImgUpdate, TagUpdate, PostImgRequest } from '@/plugins/firebase.ts';

@Module({ name: 'post', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  _postitems: TypeChatPost[] = [];
  _postitemsBK: TypeChatPost[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_POST() {
    this._postitems = [];
  }

  @Mutation
  BACKUP_POST() {
    this._postitemsBK = [...this._postitems];
  }

  @Mutation
  REVERT_POST() {
    this._postitems = this._postitemsBK;
    this._postitemsBK = [];
  }

  @Mutation
  ADD_POST(postitem: TypeChatPost) {
    const ary = [...this._postitems];
    ary.unshift(postitem);
    this._postitems = asort(ary, 'sortindex');
  }

  @Mutation
  CHANGE_ORDER_POST(p: { postitem: TypeChatPost; direction: string }) {
    const { postitem, direction } = p;
    let index = this._postitems.findIndex(
      (p: TypeChatPost) => p.id === postitem.id,
    );

    if (index !== undefined) {
      if (direction === 'down') {
        index += 1;
      }
      if (index === 0 || index === this._postitems.length) {
        return;
      }
      this._postitems.splice(
        index - 1,
        2,
        this._postitems[index],
        this._postitems[index - 1],
      );
    }
  }

  @Mutation
  REMOVE_POST(id: string) {
    this._postitems = this._postitems.filter((i: TypeChatPost) => i.id !== id);
  }

  @Mutation
  UPDATE_POST(postitem: TypeChatPost) {
    console.log('UPDATE_POST', postitem);

    // this._postitems = this._postitems.map((i: TypeChatPost) => {
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
    const date = dayjs().format('YYYY.MM.DD HH:mm:ss');

    const ary: TypeChatPost[] = [];

    // ddddd
    ary.push({
      id: uuidv4(),
      date,
      text: 'テキストです1',
      sortindex: '0000001',
      fileItem: {
        base64str: '',
      },
    });
    ary.push({
      id: uuidv4(),
      text:
        'みんなで東北へいってきたよ。\n変な公園があったんだ。（グレイフォックスのすけ）',
      fileItem: {
        base64str: '',
      },
      date,
      sortindex: '0000002',
    });
    ary.push({
      id: uuidv4(),
      date,
      text: 'テキストです2',
      sortindex: '0000003',
      fileItem: {
        base64str: '',
      },
    });
    ary.push({
      id: uuidv4(),
      date,
      text: 'キャットはじっと何かをみつめているよ。（グレイフォックスのすけ）',
      fileItem: {
        base64str:
          'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.42-1595582635687.jpeg',
      },
      sortindex: '0000004',
    });
    ary.push({
      id: uuidv4(),
      date,
      text: 'なんか綿菓子うっている。',
      fileItem: {
        base64str:
          'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-08-01_13.04.25-1596254669373.jpeg',
      },
      sortindex: '0000005',
    });
    ary.push({
      id: uuidv4(),
      date,
      text: 'せかいのとしっくです。こちらは謎の池を発見せり',
      fileItem: {
        base64str:
          'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.38.38-1595583527442.jpeg',
      },
      sortindex: '0000006',
    });

    ary.forEach((item: TypeChatPost) => {
      this.ADD_POST(item);
    });

    return Promise.resolve({});
  }

  @Action
  ChangeOrder(p: {
    postitem: TypeChatPost;
    direction: string;
  }): Promise<ActionRes> {
    this.CHANGE_ORDER_POST(p);

    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action
  PostItem(p: TypeChatPost): Promise<ActionRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // const item: TypeChatPost = {
        //   id: uuidv4(),
        //   date: dayjs().format('YYYY.MM.DD HH:mm:ss'),
        //   text: 'せかいのとしっくです。こちらは謎の池を発見せり',
        //   imgurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.38.38-1595583527442.jpeg',
        //   sortindex: '0000006',
        // };
        this.ADD_POST({
          ...p,
          sortindex: zeropad(this._postitems.length + 1, 7),
        });

        resolve();
      }, 1200);
    });
  }

  // ----------------------
  // get
  // ----------------------
  get postitems(): TypeChatPost[] {
    return this._postitems;
  }
}
