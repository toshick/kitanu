import {
  TypeUser,
  TypePostItem,
  TypeChatComment,
  TypeAlbumItem,
  TypeChatRoom,
} from '@/components/types/app';

/**
 * postItems
 */
export const postItems: TypePostItem[] = [];

/**
 * members
 */
export const members: TypeUser[] = [];
members.push({
  id: '0000000000000001',
  username: 'にゃんごろう',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'ニャオスカンゲキ',
});
members.push({
  id: '0000000000000002',
  username: 'カマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'そろそろキャンプしたいぞ',
});
members.push({
  id: '0000000000000003',
  username: 'エドブラウン',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: '',
});
members.push({
  id: '0000000000000004',
  username: 'サルバトーレトスカニーニ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'スパゲティつくってみた',
});

/**
 * infoitems
 */
export const infoitems: any[] = [];
infoitems.push({
  text: '来れる人は1230に第二リフト乗り場下のレストランに集合だぞ',
  username: 'カマタロー',
  postdate: '2020-03-01',
});
infoitems.push({
  text: '旅行の代金はカマタローが集めます。',
  username: 'カマタロー',
  postdate: '2020-03-01',
});
infoitems.push({
  text: '宿の夕飯は18時かららしいヨ宿の夕飯は18時かららしいヨ',
  username: 'カマタロー',
  postdate: '2020-03-01',
});

/**
 * chatitems
 */
export const chatitems: TypeChatComment[] = [];
chatitems.push({
  id: '0000000000000001',
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text: 'そんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki3',
});
chatitems.push({
  id: '0000000000000002',
  npc: false,
  iconurl:
    'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
  text:
    '初弾を手動で排莢していたな。考え方はおかしくない。だが聞きかじっただけの行為を実戦で試すもんじゃない',
  username: 'カマキチのすけ',
  postdate: '2020-03-01',
});
chatitems.push({
  id: '0000000000000003',
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text:
    'そんなときはジンガで呼吸を整えるんだッ\nそんなときはジンガで呼吸を整えるんだッ',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki4',
});
chatitems.push({
  id: '0000000000000004',
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text:
    '追いこまれた狐はジャッカルより凶暴だ！！ https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
  username: 'スネークのすけ',
  postdate: '2020-03-01',
});
chatitems.push({
  id: '0000000000000005',
  npc: false,
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  text:
    'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
  username: 'グレイフォックスのすけ',
  postdate: '2020-03-01',
  fukitype: 'fuki2',
});

const user: TypeUser = {
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
    members: [user],
    createdAt: '1601114626252',
  },
  {
    id: '0000002',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user, user, user, user, user],
    createdAt: '1601114626252',
  },
  {
    id: '0000003',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text: 'みんなで東北へいってきたよ。',
    members: [user, user],
    createdAt: '1601114626252',
  },
  {
    id: '0000004',
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user],
    createdAt: '1601114626252',
  },
];

export const chatrooms: TypeChatRoom[] = [
  {
    id: '0000000000000001',
    members: [user],
    createdBy: user,
    title: 'チャットルームタイトル1',
    createdAt: '1601114626252',
  },
  {
    id: '0000000000000002',
    members: [
      { ...user, id: '0000001' },
      { ...user, id: '0000002' },
      { ...user, id: '0000003' },
      { ...user, id: '0000004' },
    ],
    createdBy: user,
    title: 'チャットルームタイトル2',
    createdAt: '1601114626252',
  },
  {
    id: '0000000000000003',
    members: [
      { ...user, id: '0000001' },
      { ...user, id: '0000002' },
    ],
    createdBy: user,
    title: 'チャットルームタイトル3',
    createdAt: '1601114626252',
  },
];
