import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import {
  TypeLoginUser,
  TypeUser,
  TypeUserDisp,
  TypeChatRoom,
  TypeChatComment,
  TypeAlbum,
  TypeChatInfoItem,
  TypeActivity,
} from '@/components/types/apptypes';

/**
 * makeUserFromAuthUser
 */
export function makeUserFromAuthUser(user: TypeLoginUser): TypeUser {
  return {
    id: user.uid || uuidv4(),
    username: user.displayName || user.email || '',
    iconurl: user.photoURL || '',
    subtext: '',
    isAdmin: false,
    isAnonymous: false,
    searchOK: true,
    kycOK: false,
    agreeTermsOK: false,
    friendIdList: [],
    createdAt: dayjs().valueOf(),
    removed: false,
  };
}

/**
 * makeUser
 */
export function makeUser(params: Partial<TypeUser>): TypeUser {
  return {
    id: params.id || uuidv4(),
    username: params.username || '',
    iconurl: params.iconurl || '',
    subtext: params.subtext || '',
    isAdmin: params.isAdmin || false,
    isAnonymous: params.isAnonymous || false,
    searchOK: params.searchOK || true,
    kycOK: params.kycOK || false,
    agreeTermsOK: params.agreeTermsOK || false,
    friendIdList: params.friendIdList || [],
    createdAt: params.createdAt
      ? dayjs(params.createdAt).valueOf()
      : dayjs().valueOf(),
    removed: params.removed || false,
  };
}

/**
 * makeLoginUser
 */
export function makeLoginUser(params: any): TypeLoginUser {
  return {
    uid: params.uid || '',
    email: params.email || '',
    emailVerified: params.emailVerified || false,
    displayName: params.displayName || '',
    photoURL: params.photoURL || '',
  };
}

/**
 * makeUserDisp
 */
export function makeUserDisp(params: Partial<TypeUserDisp>): TypeUserDisp {
  return {
    id: params.id || uuidv4(),
    username: params.username || '',
    iconurl: params.iconurl || '',
    subtext: params.subtext || '',
  };
}

/**
 * makeChatComment
 */
export function makeChatComment(
  params: Partial<TypeChatComment>,
): TypeChatComment {
  return {
    id: params.id || uuidv4(),
    npc: false,
    iconurl: params.iconurl || '',
    text: params.text || '',
    username: params.username || '',
    createdAt: params.createdAt
      ? dayjs(params.createdAt).valueOf()
      : dayjs().valueOf(),
    imgurl: params.imgurl || '',
  };
}

/**
 * makeAlbum
 */
export function makeAlbum(params: Partial<TypeAlbum>): TypeAlbum {
  return {
    id: params.id || uuidv4(),
    date: params.date || '',
    dateDisp: params.dateDisp || '',
    title: params.title || '',
    text: params.text || '',
    members: params.members || [],
    imgurl: params.imgurl || '',
    createdAt: params.createdAt
      ? dayjs(params.createdAt).valueOf()
      : dayjs().valueOf(),
  };
}

/**
 * makeChatRoom
 */
export function makeChatRoom(params: Partial<TypeChatRoom>): TypeChatRoom {
  return {
    id: params.id || uuidv4(),
    members: params.members || [],
    createdBy: params.createdBy || '',
    title: params.title || '',
    createdAt: params.createdAt
      ? dayjs(params.createdAt).valueOf()
      : dayjs().valueOf(),
  };
}

/**
 * makeChatInfo
 */
export function makeChatInfo(
  params: Partial<TypeChatInfoItem>,
): TypeChatInfoItem {
  return {
    id: params.id || uuidv4(),
    text: params.text || '',
    username: params.username || '',
    createdAt: params.createdAt
      ? dayjs(params.createdAt).valueOf()
      : dayjs().valueOf(),
  };
}

/**
 * makeChatInfo
 */
export function makeActivity(params: Partial<TypeActivity>): TypeActivity {
  return {
    id: params.id || uuidv4(),
    userID: params.userID || '',
    text: params.text || '',
    createdAt: params.createdAt
      ? dayjs(params.createdAt).valueOf()
      : dayjs().valueOf(),
    tags: params.tags || [],
    user: makeUserDisp({
      id: params.userID,
      username: '',
      iconurl: '',
    }),
  };
}
