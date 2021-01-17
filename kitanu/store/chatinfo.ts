import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { ActionRes, TypeChatInfoItem } from '@/components/types/apptypes';
import { infoItems } from '@/mock/mockdata';

@Module({ name: 'chatinfo', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  infoItems: TypeChatInfoItem[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_POST() {
    this.infoItems = [];
  }

  @Mutation
  ADD_CHAT(postitem: TypeChatInfoItem) {
    const ary = [...this.infoItems];
    ary.unshift(postitem);
    this.infoItems = asort(ary, 'postdate').reverse();
  }

  @Mutation
  REMOVE_POST(id: string) {
    this.infoItems = this.infoItems.filter(
      (i: TypeChatInfoItem) => i.id !== id,
    );
  }

  @Mutation
  UPDATE_POST(postitem: TypeChatInfoItem) {
    console.log('UPDATE_POST', postitem);

    // this.chatItems = this.chatItems.map((i: TypeChatInfoItem) => {
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

    infoItems.forEach((item: TypeChatInfoItem) => {
      this.ADD_CHAT(item);
    });

    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }
}
