import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { ActionRes, ChatCommentType, PostSubmitItemType } from '@/components/types/app';

const chatitems: ChatCommentType[] = [];
chatitems.push({
  id: uuidv4(),
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: 1601114526252,
  imgurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
});
chatitems.push({
  id: uuidv4(),
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: 1601114626252,
  fukitype: 'fuki3',
});
chatitems.push({
  id: uuidv4(),
  iconurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
  text: '初弾を手動で排莢していたな。考え方はおかしくない。だが聞きかじっただけの行為を実戦で試すもんじゃない',
  username: 'カマキチのすけ',
  postdate: 1601114726252,
});
chatitems.push({
  id: uuidv4(),
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ\nそんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: 1601114826252,
  fukitype: 'fuki4',
});
chatitems.push({
  id: uuidv4(),
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: '追いこまれた狐はジャッカルより凶暴だ！！ https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
  username: 'スネークのすけ',
  postdate: 1601114926252,
});
chatitems.push({
  id: uuidv4(),
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
  username: 'グレイフォックスのすけ',
  postdate: 1601114926652,
  fukitype: 'fuki2',
});

@Module({ name: 'chat', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  chatitems: ChatCommentType[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_POST() {
    this.chatitems = [];
  }

  @Mutation
  ADD_CHAT(postitem: ChatCommentType) {
    const ary = [...this.chatitems];
    ary.unshift(postitem);
    this.chatitems = asort(ary, 'postdate');
  }

  @Mutation
  REMOVE_POST(id: string) {
    this.chatitems = this.chatitems.filter((i: ChatCommentType) => i.id !== id);
  }

  @Mutation
  UPDATE_POST(postitem: ChatCommentType) {
    console.log('UPDATE_POST', postitem);

    // this.chatitems = this.chatitems.map((i: ChatCommentType) => {
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
    return new Promise((resolve) => {
      setTimeout(() => {
        chatitems.forEach((item: ChatCommentType) => {
          this.ADD_CHAT(item);
        });
        resolve();
      }, 1000);
    });
  }

  @Action
  PostChat(p: PostSubmitItemType): Promise<ActionRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item: ChatCommentType = {
          id: uuidv4(),
          iconurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
          text: p.text,
          username: 'にゃおすけ',
          postdate: dayjs().valueOf(),
          imgurl: p.fileItem ? p.fileItem.base64str : '',
        };
        this.ADD_CHAT(item);

        resolve();
      }, 200);
    });
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }
}
