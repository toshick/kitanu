// import Vue, { PropType } from 'vue';
import { mount } from '@vue/test-utils';
import ViewChatList from '@/components/ViewChatList.vue';
import { chatrooms } from '@/mock/mockdata';

describe('ViewChatList', () => {
  let wrapper: any = null;
  beforeEach(() => {
    wrapper = mount(ViewChatList, {
      propsData: {
        chatrooms,
      },
      stubs: ['ion-icon'],
    });
  });
  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper.vm).toBeTruthy();
      expect(wrapper.findAll('.chat-list > li').length).toBe(3);
      // item1
      expect(
        wrapper
          .find('.chat-list > li:nth-child(1)')
          .html()
          .includes('チャットルームタイトル1'),
      ).toBe(true);
      expect(wrapper.findAll('.chat-list > li:nth-child(1) li').length).toBe(1);
      // item2
      expect(
        wrapper
          .find('.chat-list > li:nth-child(2)')
          .html()
          .includes('チャットルームタイトル2'),
      ).toBe(true);
      expect(wrapper.findAll('.chat-list > li:nth-child(2) li').length).toBe(4);
      // item3
      expect(
        wrapper
          .find('.chat-list > li:nth-child(3)')
          .html()
          .includes('チャットルームタイトル3'),
      ).toBe(true);
      expect(wrapper.findAll('.chat-list > li:nth-child(3) li').length).toBe(2);
    });
    it('should render nodata', () => {
      const mywrapper = mount(ViewChatList, {
        propsData: {
          chatrooms: [],
        },
        stubs: ['ion-icon'],
      });
      expect(mywrapper.findAll('.nodata').length).toBe(1);
    });
  });

  describe('event', () => {
    test('click list item', () => {
      const button = wrapper.find('.chat-list > li:nth-child(1) .chat-item');
      button.trigger('click');
      expect(wrapper.emitted('selected')[0][0]).toBe('0000000000000001');
    });
  });
});
