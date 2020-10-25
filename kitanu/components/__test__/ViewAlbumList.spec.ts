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
      ).toBe(1);
      expect(
        wrapper.findAll('.album-item:nth-child(2) .album-item-member .usericon')
          .length,
      ).toBe(5);
    });
    // it('should render nodata', () => {
    //   const mywrapper = mount(ViewAlbumList, {
    //     propsData: {
    //       albumItems: [],
    //     },
    //     stubs: ['ion-icon'],
    //   });
    //   expect(mywrapper.findAll('.album-item').length).toBe(0);
    // });
  });

  describe('event', () => {
    test('click album', () => {
      const button = wrapper.find('.album-item:first-child .btn-img');
      button.trigger('click');
      expect(wrapper.emitted('selected')[0][0]).toMatchObject({
        id: '0000001',
        date: '2018-08-08',
        dateDisp: '2018.08.08',
        text:
          'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
        members: [
          {
            id: '0000001',
            username: 'ニャオスカマキチ',
            iconurl:
              'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
          },
        ],
        createdAt: '1601114626252',
      });
    });
    test('click more', () => {
      const button = wrapper.find('.btn-more');
      button.trigger('click');
      expect(wrapper.emitted('more')).toBeTruthy();
    });
  });
});
