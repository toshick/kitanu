import { TypeUser, TypeAlbumItem } from './types/app';

export const user: TypeUser = {
  id: '0000001',
  username: 'ニャオスカマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
};
export const albumItems: TypeAlbumItem[] = [
  {
    id: '0000001',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user],
  },
  {
    id: '0000002',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user, user, user],
  },
  {
    id: '0000003',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text: 'みんなで東北へいってきたよ。',
    members: [user, user],
  },
  {
    id: '0000004',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user],
  },
];
