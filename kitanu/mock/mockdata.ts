import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import {
  makeUser,
  makeAlbum,
  makeChatRoom,
  makeChatInfo,
  makeChatPost,
} from '@/common/helper';

import {
  TypeUser,
  TypeChatPost,
  TypeAlbum,
  TypeChatRoom,
  TypeChatInfoItem,
} from '@/components/types/apptypes';

/**
 * postItems
 */
export const postItems: TypeChatPost[] = [
  makeChatPost({
    text: 'テキストです1',
  }),
  makeChatPost({
    text: 'テキストです2',
  }),
  makeChatPost({
    text: 'テキストです3',
  }),
];

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
 * infoItems
 */
export const infoItems: TypeChatInfoItem[] = [
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
 * chatItems
 */
export const chatItems: TypeChatPost[] = [
  makeChatPost({
    createdByID: '5GRnX8QzjcygEG6eRGt5CfRwKhE6',
    text: 'そんなときはジンガで呼吸を整えるんだッ',
    createdAt: 1601114526252,
  }),
  makeChatPost({
    createdByID: 'YjEQX5l3wNC255UftK9StZ0XKPFe',
    text:
      '初弾を手動で排莢していたな。考え方はおかしくない。だが聞きかじっただけの行為を実戦で試すもんじゃない',
    createdAt: 1601114526252,
    // fukitype: `fuki${Math.ceil(Math.random() * 4)}`,
    comments: [
      makeChatPost({
        createdByID: 'YjEQX5l3wNC255UftK9StZ0XKPFe',
        text: 'そんなときはジンガで呼吸を整えるんだッ',
        createdAt: 1601114526252,
      }),
    ],
  }),
  makeChatPost({
    createdByID: 'YjEQX5l3wNC255UftK9StZ0XKPFe',
    text: 'まったく続きが気になるヌ',
    createdAt: 1601114526252,
    npc: true,
  }),
  makeChatPost({
    createdByID: 'YjEQX5l3wNC255UftK9StZ0XKPFe',
    text:
      '追いこまれた狐はジャッカルより凶暴だ！！ https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg',
    createdAt: 1601114526252,
    // fukitype: `fuki${Math.ceil(Math.random() * 4)}`,
    imgurl:
      'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg',
  }),
  makeChatPost({
    createdByID: '5GRnX8QzjcygEG6eRGt5CfRwKhE6',
    text:
      'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
    createdAt: 1601114526252,
    fukitype: `fuki3`,
  }),
  makeChatPost({
    createdByID: '5GRnX8QzjcygEG6eRGt5CfRwKhE6',
    text: 'そいつわ大変だったヌ',
    createdAt: 1601114526252,
    npc: true,
  }),
  makeChatPost({
    createdByID: '5GRnX8QzjcygEG6eRGt5CfRwKhE6',
    text: 'カズヒラミラーのハンバーガーくってみたいカマレオ',
    createdAt: 1601114526252,
    comments: [
      makeChatPost({
        createdByID: 'YjEQX5l3wNC255UftK9StZ0XKPFe',
        text: 'そんなときはジンガで呼吸を整えるんだッ',
        createdAt: 1601114526252,
      }),
      makeChatPost({
        createdByID: 'YjEQX5l3wNC255UftK9StZ0XKPFe',
        text: 'コンソメパンチ丼の大盛りください',
        createdAt: 1601114526252,
      }),
    ],
  }),
  makeChatPost({
    createdByID: '5GRnX8QzjcygEG6eRGt5CfRwKhE6',
    text:
      'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
    createdAt: 1601114526252,
  }),
  makeChatPost({
    createdByID: '5GRnX8QzjcygEG6eRGt5CfRwKhE6',
    text:
      'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
    createdAt: 1601114526252,
    fukitype: `fuki2`,
  }),
  makeChatPost({
    createdByID: '5GRnX8QzjcygEG6eRGt5CfRwKhE6',
    text:
      'スネーク、俺達は政府や誰かの道具じゃない\n戦うことでしか自分を表現できなかったが、いつも自分の意志で戦ってきた。',
    createdAt: 1601114526252,
    fukitype: `fuki3`,
  }),
];

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
    memberIDs: [user.id],
  }),
  makeAlbum({
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    memberIDs: [user.id, user.id, user.id, user.id, user.id],
  }),
  makeAlbum({
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text: 'みんなで東北へいってきたよ。',
    memberIDs: [user.id, user.id],
  }),
  makeAlbum({
    date: '2018-08-08',
    dateDisp: '2018.08.08',
    text:
      'みんなで東北へいってきたよ。みんなで東北へいってきたよ。みんなで東北へいってきたよ。',
    memberIDs: [user.id],
  }),
];

/**
 * chatlist
 */
export const chatlist: TypeChatRoom[] = [
  makeChatRoom({
    memberIDs: [user.id],
    createdByID: user.id,
    title: 'チャットルームタイトル1',
  }),
  makeChatRoom({
    memberIDs: [user.id, user.id, user.id],
    createdByID: user.id,
    title: 'チャットルームタイトル2',
  }),
  makeChatRoom({
    memberIDs: [user.id, user.id],
    createdByID: user.id,
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
