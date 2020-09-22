import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { ActionRes, PostItem } from '@/components/types/app';
// import { setUpPostImg, firebase, postImgRef, tagRef, Tag, PostImg, PostImgUpdate, TagUpdate, PostImgRequest } from '@/plugins/firebase.ts';

@Module({ name: 'post', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  postitems: PostItem[] = [];
  postitemsBK: PostItem[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_POST() {
    this.postitems = [];
  }

  @Mutation
  BACKUP_POST() {
    this.postitemsBK = [...this.postitems];
  }

  @Mutation
  REVERT_POST() {
    this.postitems = this.postitemsBK;
    this.postitemsBK = [];
  }

  @Mutation
  ADD_POST(postitem: PostItem) {
    const ary = [...this.postitems];
    ary.unshift(postitem);
    this.postitems = asort(ary, 'sortindex').reverse();
  }

  @Mutation
  CHANGE_ORDER_POST(p: { postitem: PostItem; direction: string }) {
    const { postitem, direction } = p;
    let index = this.postitems.findIndex((p: PostItem) => p.id === postitem.id);

    if (index !== undefined) {
      if (direction === 'down') {
        index += 1;
      }
      if (index === 0 || index === this.postitems.length) {
        return;
      }
      this.postitems.splice(index - 1, 2, this.postitems[index], this.postitems[index - 1]);
    }
  }

  @Mutation
  REMOVE_POST(id: string) {
    this.postitems = this.postitems.filter((i: PostItem) => i.id !== id);
  }

  @Mutation
  UPDATE_POST(postitem: PostItem) {
    console.log('UPDATE_POST', postitem);

    // this.postitems = this.postitems.map((i: PostItem) => {
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

    const ary: PostItem[] = [];
    ary.push({
      id: uuidv4(),
      date,
      text: 'テキストです1',
      sortindex: '0000001',
    });
    ary.push({ id: uuidv4(), text: 'みんなで東北へいってきたよ。\n変な公園があったんだ。（グレイフォックスのすけ）', imgurl: '', date, sortindex: '0000002' });
    ary.push({
      id: uuidv4(),
      date,
      text: 'テキストです2',
      sortindex: '0000003',
    });
    ary.push({
      id: uuidv4(),
      date,
      text: 'キャットはじっと何かをみつめているよ。（グレイフォックスのすけ）',
      imgurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.42-1595582635687.jpeg',
      sortindex: '0000004',
    });
    ary.push({
      id: uuidv4(),
      date,
      text: 'なんか綿菓子うっている。',
      imgurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-08-01_13.04.25-1596254669373.jpeg',
      sortindex: '0000005',
    });
    ary.push({
      id: uuidv4(),
      date,
      text: 'せかいのとしっくです。こちらは謎の池を発見せり',
      imgurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.38.38-1595583527442.jpeg',
      sortindex: '0000006',
    });

    ary.forEach((item: PostItem) => {
      this.ADD_POST(item);
    });

    return Promise.resolve({});
  }

  @Action
  ChangeOrder(p: { postitem: PostItem; direction: string }): Promise<ActionRes> {
    this.CHANGE_ORDER_POST(p);

    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }
}
