import dayjs from 'dayjs';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { makeUser, makeChatRoom } from '@/common/helper';
import {
  ActionRes,
  TypeChatComment,
  TypeChatPost,
  TypeUser,
  TypeChatRoom,
} from '@/components/types/apptypes';
import kitanuTalks from '@/assets/kitanuTalks';
import { members, chatitems } from '@/mock/mockdata';

@Module({ name: 'chat', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  chatitems: TypeChatComment[] = [];
  members: TypeUser[] = members;
  _chatrooms: TypeChatRoom[] = [];

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
    const ary = [...this._chatrooms];
    ary.push(chatroom);
    this._chatrooms = asort(ary, 'createdAt').reverse();
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
  PostChat(p: TypeChatPost): Promise<ActionRes> {
    // let text = p.text || '';
    // let iconurl =
    //   'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg';
    // if (p.npc) {
    //   iconurl = '/img/tanu/tanu-120.png';
    //   text = kitanuTalks[Math.floor(Math.random() * kitanuTalks.length)];
    // }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const item: TypeChatPost = {
    //       iconurl,
    //       text,
    //       username: 'にゃおすけ',
    //       postdate: `${dayjs().valueOf()}`,
    //       imgurl: p.fileItem ? p.fileItem.base64str : '',
    //       good: p.good || 0,
    //       fukitype: p.fukitype || '',
    //       npc: p.npc,
    //     };
    //     this.ADD_CHAT(item);

    //     resolve({});
    //   }, 1200);
    // });
    return Promise.resolve({});
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
    const room: TypeChatRoom = makeChatRoom({
      members: p.users.map((u: TypeUser) => u.id),
      createdBy: p.loginuser.id,
      title: '新規チャット',
    });
    this.ADD_CHATROOM(room);
    return Promise.resolve({});
  }

  // ----------------------
  // get
  // ----------------------
  get chatrooms(): TypeChatRoom[] {
    return this._chatrooms;
  }
}
