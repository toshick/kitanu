// import Vue, { PropType } from 'vue';
import { mount } from '@vue/test-utils';
import ViewChatList from '@/components/ViewChatList.vue';
import { members } from '@/mock/mockdata';

describe('ViewChatList', () => {
  let wrapper: any = null;
  beforeEach(() => {
    wrapper = mount(ViewChatList, {
      propsData: {
        members,
      },
      stubs: ['ion-icon'],
    });
  });
  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper.vm).toBeTruthy();
      expect(wrapper.findAll('.chat-list > li').length).toBe(4);

      expect(
        wrapper
          .find('.chat-list > li:nth-child(1)')
          .html()
          .includes('にゃんごろう'),
      ).toBe(true);
      expect(
        wrapper
          .find('.chat-list > li:nth-child(1)')
          .html()
          .includes('ニャオスカンゲキ'),
      ).toBe(true);
      expect(
        wrapper
          .find('.chat-list > li:nth-child(2)')
          .html()
          .includes('カマキチ'),
      ).toBe(true);
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
