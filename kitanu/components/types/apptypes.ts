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
  isAdmin: boolean;
  isAnonymous: boolean;
  searchOK: boolean;
  kycOK: boolean;
  agreeTermsOK: boolean;
};

export type ActionRes = {
  errorMsg?: string;
  errorCode?: string;
};

export type TypeUser = {
  id: TypeUserID;
  username: string;
  iconurl: string;
  subtext?: string;
  friendList?: TypeUserID[];
  created?: firebase.firestore.FieldValue;
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
  createdAt: string;
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
  createdBy: TypeUser;
  title?: string;
  createdAt: string;
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
  postdate: string;
  fukitype?: string;
  imgurl?: string;
  good?: number;
};

export type TypeChatInfoItem = {
  id: string;
  text: string;
  username: string;
  postdate: number;
};
