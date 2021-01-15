import firebase from 'firebase/app';

export type TypeFile = {
  file?: File;
  base64str: string;
};

/**
 * ユーザ
 */
export type TypeUserID = string;

export type TypeLoginUser = {
  uid: TypeUserID;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
};

export type ActionRes = {
  errorMsg?: string;
  errorCode?: string;
};

export type TypeUser = {
  id: TypeUserID;
  username: string;
  iconurl: string;
  subtext: string;
  friendIdList: TypeUserID[];
  isAdmin: boolean;
  isAnonymous: boolean;
  searchOK: boolean;
  kycOK: boolean;
  agreeTermsOK: boolean;
  createdAt: number;
  removed: boolean;
};

export type TypeUserDisp = {
  id: TypeUserID;
  username: string;
  iconurl: string;
  subtext: string;
};

/**
 * アルバム
 */
export type TypeAlbum = {
  id: string;
  date: string;
  dateDisp: string;
  title: string;
  text: string;
  members: TypeUserID[];
  imgurl?: string;
  createdAt?: number;
};

export type TypeAlbumPost = {
  fileItem?: TypeFile | null;
  text?: string;
  good?: number | null;
  fukitype?: string;
  npc: boolean;
};

/**
 * チャット
 */
export type TypeChatRoom = {
  id: string;
  members: TypeUserID[];
  createdBy: TypeUserID;
  title?: string;
  createdAt?: number;
};

export type TypeChatPost = {
  id: string;
  date: string;
  text: string;
  fileItem?: TypeFile | null;
  sortindex?: string;
};

export type TypeChatComment = {
  id: string;
  npc: boolean;
  iconurl: string;
  text: string;
  username: string;
  createdAt: number;
  fukitype?: string;
  imgurl?: string;
  good?: number;
};

export type TypeChatInfoItem = {
  id: string;
  text: string;
  username: string;
  createdAt: number;
};

/**
 * アクティビティ
 */
export type TypeActivity = {
  id: string;
  userID: string;
  text: string;
  createdAt: number;
  tags: string[];
  user: TypeUserDisp;
};
