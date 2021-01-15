import {
  makeUser,
  makeAlbum,
  makeChatComment,
  makeChatRoom,
  makeChatInfo,
} from '@/common/helper';

import {
  TypeUser,
  TypeChatPost,
  TypeChatComment,
  TypeAlbum,
  TypeChatRoom,
  TypeChatInfoItem,
} from '@/components/types/apptypes';

/**
 * postItems
 */
export const postItems: TypeChatPost[] = [];

/**
 * members
 */
export const members: TypeUser[] = [
  makeUser({
    username: 'にゃんごろう',
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    subtext: 'ニャオスカンゲキ',
  }),
  makeUser({
    username: 'カマキチ',
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    subtext: 'そろそろキャンプしたいぞ',
  }),
  makeUser({
    username: 'エドブラウン',
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    subtext: '',
  }),
  makeUser({
    username: 'サルバトーレトスカニーニ',
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    subtext: 'スパゲティつくってみた',
  }),
];

/**
 * infoitems
 */
export const infoitems: TypeChatInfoItem[] = [
  makeChatInfo({
    text: '旅行の代金はカマタローが集めます。',
    username: 'カマタロー',
  }),
  makeChatInfo({
    text: '来れる人は1230に第二リフト乗り場下のレストランに集合だぞ',
    username: 'カマタロー',
  }),
  makeChatInfo({
    text: '宿の夕飯は18時かららしいヨ宿の夕飯は18時かららしいヨ',
    username: 'カマタロー',
  }),
];

/**
 * chatitems
 */
export const chatitems: TypeChatComment[] = [];
chatitems.push(
  makeChatComment({
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    text: 'そんなときはジンガで呼吸を整えるんだッ',
    username: 'スネークのすけ',
    createdAt: 1601114526252,
    imgurl:
      'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
  }),
);
chatitems.push(
  makeChatComment({
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    text: 'そんなときはジンガで呼吸を整えるんだッ',
    username: 'スネークのすけ',
    createdAt: 1601114626252,
    fukitype: 'fuki3',
  }),
);
chatitems.push(
  makeChatComment({
    iconurl:
      'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
    text:
      '初弾を手動で排莢していたな。考え方はおかしくない。だが聞きかじっただけの行為を実戦で試すもんじゃない',
    username: 'カマキチのすけ',
    createdAt: 1601114726252,
  }),
);
chatitems.push(
  makeChatComment({
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    text:
      'そんなときはジンガで呼吸を整えるんだッ\nそんなときはジンガで呼吸を整えるんだッ',
    username: 'スネークのすけ',
    createdAt: 1601114826252,
    fukitype: 'fuki4',
  }),
);
chatitems.push(
  makeChatComment({
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    text:
      '追いこまれた狐はジャッカルより凶暴だ！！ https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
    username: 'スネークのすけ',
    createdAt: 1601114926252,
  }),
);
chatitems.push(
  makeChatComment({
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    text:
      'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
    username: 'グレイフォックスのすけ',
    createdAt: 1601114926652,
    fukitype: 'fuki2',
  }),
);

const user: TypeUser = makeUser({
  username: 'ニャオスカマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
});

/**
 * albumItems
 */
export const albumItems: TypeAlbum[] = [
  makeAlbum({
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user.id],
  }),
  makeAlbum({
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user.id, user.id, user.id, user.id, user.id],
  }),
  makeAlbum({
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text: 'みんなで東北へいってきたよ。',
    members: [user.id, user.id],
  }),
  makeAlbum({
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    members: [user.id],
  }),
];

/**
 * chatrooms
 */
export const chatrooms: TypeChatRoom[] = [
  makeChatRoom({
    members: [user.id],
    createdBy: user.id,
    title: 'チャットルームタイトル1',
  }),
  makeChatRoom({
    members: [user.id, user.id, user.id],
    createdBy: user.id,
    title: 'チャットルームタイトル2',
  }),
  makeChatRoom({
    members: [user.id, user.id],
    createdBy: user.id,
    title: 'チャットルームタイトル3',
  }),
];

/**
 * friends
 */
export const friends: TypeUser[] = [
  makeUser({
    username: 'ニャオスカマキチ',
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    subtext: '今宵はよい月である',
  }),
  makeUser({
    username: 'えだじまへいはちさん',
    iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
    subtext: '男塾塾長である',
  }),
];
