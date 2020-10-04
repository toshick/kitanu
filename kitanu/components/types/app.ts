export type ActionRes = {
  error?: boolean;
  ok?: boolean;
};

export type UserType = {
  username: string;
  iconurl: string;
  subtext?: string;
};

export type AlbumItemType = {
  date: string;
  dateDisp: string;
  text: string;
  members: UserType[];
};

export type PostSubmitItemType = {
  fileItem?: FileItemType | null;
  text?: string;
  good?: number | null;
  fukitype?: string;
  npc: boolean;
};

export type FileItemType = {
  file?: File;
  base64str: string;
};

export type PostItemType = {
  id: string;
  date: string;
  text: string;
  fileItem?: FileItemType | null;
  sortindex?: string;
};

export type ChatCommentType = {
  id: string;
  npc: boolean;
  iconurl: string;
  text: string;
  username: string;
  postdate: number;
  fukitype?: string;
  imgurl?: string;
  good?: number;
};

export type ChatInfoItemType = {
  id: string;
  text: string;
  username: string;
  postdate: number;
};
