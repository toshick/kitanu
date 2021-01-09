import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { asort } from '@/common/util';
import { ActionRes, TypeChatInfoItem } from '@/components/types/apptypes';

const infoitems: TypeChatInfoItem[] = [];
infoitems.push({
  id: uuidv4(),
  text: '来れる人は1230に第二リフト乗り場下のレストランに集合だぞ',
  username: 'カマタロー',
  postdate: 1601114526252,
});
infoitems.push({
  id: uuidv4(),
  text: '旅行の代金はカマタローが集めます。',
  username: 'カマタロー',
  postdate: 1601114526253,
});
infoitems.push({
  id: uuidv4(),
  text: '宿の夕飯は18時かららしいヨ宿の夕飯は18時かららしいヨ',
  username: 'カマタロー',
  postdate: 1601114526254,
});

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
