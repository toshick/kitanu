import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { ActionRes, TypeChatInfoItem } from '@/components/types/apptypes';
import { infoitems } from '@/mock/mockdata';

@Module({ name: 'chatinfo', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  infoitems: TypeChatInfoItem[] = [];

  // ----------------------
  // Mutation
  // ----------------------

  @Mutation
  RESET_POST() {
    this.infoitems = [];
  }

  @Mutation
  ADD_CHAT(postitem: TypeChatInfoItem) {
    const ary = [...this.infoitems];
    ary.unshift(postitem);
    this.infoitems = asort(ary, 'postdate').reverse();
  }

  @Mutation
  REMOVE_POST(id: string) {
    this.infoitems = this.infoitems.filter(
      (i: TypeChatInfoItem) => i.id !== id,
    );
  }

  @Mutation
  UPDATE_POST(postitem: TypeChatInfoItem) {
    console.log('UPDATE_POST', postitem);

    // this.chatitems = this.chatitems.map((i: TypeChatInfoItem) => {
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

    infoitems.forEach((item: TypeChatInfoItem) => {
      this.ADD_CHAT(item);
    });

    return Promise.resolve({});
  }

  @Action
  RemovePost(): Promise<ActionRes> {
    return Promise.resolve({});
  }
}
