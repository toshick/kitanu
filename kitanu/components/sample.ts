import { UserType, AlbumItemType } from './types/app';

export const user: UserType = {
  id: '0000001',
  username: 'ニャオスカマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
};
export const albumItems: AlbumItemType[] = [
  {
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user],
  },
  {
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user, user, user],
  },
  {
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text: 'みんなで東北へいってきたよ。',
    members: [user, user],
  },
  {
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user],
  },
];
