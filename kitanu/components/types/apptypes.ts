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
  result?: any;
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
  removed: boolean;
  createdAt?: number;
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
  memberIDs: TypeUserID[];
  members?: TypeUserDisp[]; // used at runtime
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
  memberIDs: TypeUserID[];
  members?: TypeUserDisp[]; // used at runtime
  createdByID: TypeUserID;
  createdBy?: TypeUserDisp; // used at runtime
  title?: string;
  createdAt?: number;
};

export type TypeChatPost = {
  id: string;
  chatroomID: string;
  isComment: boolean;
  npc: boolean;
  text: string;
  fukitype?: string; // fuki1...fuki3
  imgurl?: string;
  goodMemberIDs: TypeUserID[];
  goodMembers?: TypeUserDisp[]; // used at runtime
  createdByID: TypeUserID;
  createdBy?: TypeUserDisp; // used at runtime
  commentPostIDs: string[];
  comments: TypeChatPost[]; // used at runtime
  createdAt?: number;
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
  user?: TypeUserDisp; // used at runtime
  text: string;
  createdAt: number;
  tags: string[];
};

// ----------------------
// api
// ----------------------

export type ChatPostCreateRequest = {
  fileItem?: TypeFile;
  chatroomID: string;
  text: string;
  fukitype: string;
  isComment?: boolean;
};
export type ChatPostUpdateRequest = {
  postid: string;
  fileItem?: TypeFile;
  text?: string;
  fukitype?: string;
  createdAt?: string;
  commentPostIDs?: string[];
};
