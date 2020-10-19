// import Vue, { PropType } from 'vue';
import { mount } from '@vue/test-utils';
import ViewAlbumList from '@/components/ViewAlbumList.vue';
import { albumItems } from '@/mock/mockdata';

describe('ViewAlbumList', () => {
  let wrapper: any = null;
  beforeEach(() => {
    wrapper = mount(ViewAlbumList, {
      propsData: {
        albumItems,
      },
      stubs: ['ion-icon'],
    });
  });
  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper.vm).toBeTruthy();
      expect(wrapper.findAll('.album-item').length).toBe(4);

      expect(
        wrapper.findAll('.album-item:nth-child(1) .album-item-member .usericon')
          .length,
      ).toBe(3);
      expect(
        wrapper.findAll('.album-item:nth-child(2) .album-item-member .usericon')
          .length,
      ).toBe(5);
    });
  });

  describe('event', () => {
    test('click album', () => {
      const button = wrapper.find('.album-item:first-child .btn-img');
      button.trigger('click');
      expect(wrapper.emitted('selected')[0][0]).toBe('0000001');
    });
    test('click more', () => {
      const button = wrapper.find('.btn-more');
      button.trigger('click');
      expect(wrapper.emitted('more')).toBeTruthy();
    });
  });

  // describe('action', () => {
  //   test('説明', () => {
  //     const button = wrapper.find('.btn-des');
  //     button.trigger('click');
  //     expect(wrapper.emitted('selected')[0][0]).toBe('0000001');
  //   });
  // });
});
