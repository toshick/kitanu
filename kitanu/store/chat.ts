import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import {
  ActionRes,
  TypeChatComment,
  TypePostSubmitItem,
  TypeUser,
  TypeChatRoom,
} from '@/components/types/apptypes';

const members: TypeUser[] = [];
members.push({
  id: '0000001',
  username: 'にゃんごろう',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'いつだってオレンジ',
});
members.push({
  id: '0000002',
  username: 'カマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'そろそろキャンプしたいぞ',
});
members.push({
  id: '0000003',
  username: 'エドブラウン',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: '',
});
members.push({
  id: '0000004',
  username: 'サルバトーレトスカニーニ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'スパゲティつくってみた',
});

const chatitems: TypeChatComment[] = [];
chatitems.push({
  id: uuidv4(),
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '1601114526252',
  imgurl:
    'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
});
chatitems.push({
  id: uuidv4(),
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '1601114626252',
  fukitype: 'fuki3',
});
chatitems.push({
  id: uuidv4(),
  npc: false,
  iconurl:
    'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
  text:
    '初弾を手動で排莢していたな。考え方はおかしくない。だが聞きかじっただけの行為を実戦で試すもんじゃない',
  username: 'カマキチのすけ',
  postdate: '1601114726252',
});
chatitems.push({
  id: uuidv4(),
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text:
    'そんなときはジンガで呼吸を整えるんだッ\nそんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '1601114826252',
  fukitype: 'fuki4',
});
chatitems.push({
  id: uuidv4(),
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text:
    '追いこまれた狐はジャッカルより凶暴だ！！ https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
  username: 'スネークのすけ',
  postdate: '1601114926252',
});
chatitems.push({
  id: uuidv4(),
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text:
    'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
  username: 'グレイフォックスのすけ',
  postdate: '1601114926652',
  fukitype: 'fuki2',
});

const kitanuTalks: string[] = [];
kitanuTalks.push('ソイツハイイヌ！');
kitanuTalks.push('グッドヌ');
kitanuTalks.push('ヤルジャナイ');
kitanuTalks.push('アンタッテヤツハ！');
kitanuTalks.push('オレハユメデモミテイルヌ？');
kitanuTalks.push('イイセンスヌ');
kitanuTalks.push('マジナハナシ？');
kitanuTalks.push('ソーキタカ');
kitanuTalks.push('アンタニマカセルヌ');
kitanuTalks.push('ジゴクノサタモカネシダイヌ');
kitanuTalks.push('コヨイハヨイツキゾ');
kitanuTalks.push('ソーコナクッチャーヌ');
kitanuTalks.push('キョウヤラネエヤツハ...アシタモヤラーヌ');
kitanuTalks.push('ナンダカユウキガワイテキータヌ');
kitanuTalks.push('キサマラハ、クサッタミカンデハナイヌ');
kitanuTalks.push('イイカゲンマナベヨ');
kitanuTalks.push('ソレデコソキサマダーヌ');
kitanuTalks.push('ナラバヨシ');
kitanuTalks.push('マエムキニケントーシヨウ');
kitanuTalks.push('チョットキュウケイシヨウ');
kitanuTalks.push('オレハシバラクチカニモグルヌ');
kitanuTalks.push('マッタククレイジーナジャポネーゼダゼ');
kitanuTalks.push('ソロソロシゴトノハナシヲシナイカネ');
kitanuTalks.push('イマサライノチゴイカ');
kitanuTalks.push('ソレハチャーハンヨリカチガアルノカヌ？');
kitanuTalks.push('マイニチガエブリデイ');
kitanuTalks.push(
  'コノチキュウジョウニ、ジブンタチヨリツヨイチカラガソンザイスルコトヲオシエテヤロウヌ',
);
kitanuTalks.push('グレートダゼ');
kitanuTalks.push('キサマラシクナイゾ');
kitanuTalks.push('ヤルカラニハマジダゼ');
kitanuTalks.push('ソノタメニオレガココニイル');
kitanuTalks.push('カエッタラニホンシュダゾ');
kitanuTalks.push('ソーイウカンガエカタモアルノネ');
kitanuTalks.push('ソンナトキハ、ジンガデコキュウヲトトノエロ');
kitanuTalks.push('イマノハワルクナカッタヌ');
kitanuTalks.push('ジュッチュウハックワナダヌ');
kitanuTalks.push('');

@Module({ name: 'chat', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  chatitems: TypeChatComment[] = [];
  members: TypeUser[] = members;
  chatrooms: TypeChatRoom[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_POST() {
    this.chatitems = [];
  }

  @Mutation
  ADD_CHAT(postitem: TypeChatComment) {
    const ary = [...this.chatitems];
    ary.unshift(postitem);
    this.chatitems = asort(ary, 'postdate');
  }

  @Mutation
  REMOVE_POST(id: string) {
    this.chatitems = this.chatitems.filter((i: TypeChatComment) => i.id !== id);
  }

  @Mutation
  UPDATE_POST(postitem: TypeChatComment) {}

  @Mutation
  ADD_CHATROOM(chatroom: TypeChatRoom) {
    const ary = [...this.chatrooms];
    ary.push(chatroom);
    this.chatrooms = asort(ary, 'createdAt').reverse();
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
        chatitems.forEach((item: TypeChatComment) => {
          this.ADD_CHAT(item);
        });
        resolve({});
      }, 1000);
    });
  }

  @Action
  PostChat(p: TypePostSubmitItem): Promise<ActionRes> {
    let text = p.text || '';
    let iconurl =
      'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg';
    if (p.npc) {
      iconurl = '/img/tanu/tanu-120.png';
      text = kitanuTalks[Math.floor(Math.random() * kitanuTalks.length)];
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        const item: TypeChatComment = {
          id: uuidv4(),
          iconurl,
          text,
          username: 'にゃおすけ',
          postdate: `${dayjs().valueOf()}`,
          imgurl: p.fileItem ? p.fileItem.base64str : '',
          good: p.good || 0,
          fukitype: p.fukitype || '',
          npc: p.npc,
        };
        this.ADD_CHAT(item);

        resolve({});
      }, 1200);
    });
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }

  @Action
  CreateChatRoom(p: {
    loginuser: TypeUser;
    users: TypeUser[];
  }): Promise<ActionRes> {
    const room: TypeChatRoom = {
      id: uuidv4(),
      members: p.users,
      createdBy: p.loginuser,
      title: '新規チャット',
      createdAt: `${dayjs().valueOf()}`,
    };
    this.ADD_CHATROOM(room);
    return Promise.resolve({});
  }
}
