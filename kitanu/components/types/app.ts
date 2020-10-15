export type ActionRes = {
  error?: boolean;
  ok?: boolean;
};

export type TypeUser = {
  id: string;
  username: string;
  iconurl: string;
  subtext?: string;
};

export type TypeAlbumItem = {
  id: string;
  date: string;
  dateDisp: string;
  text: string;
  members: TypeUser[];
};

export type TypePostSubmitItem = {
  fileItem?: TypeFileItem | null;
  text?: string;
  good?: number | null;
  fukitype?: string;
  npc: boolean;
};

export type TypeFileItem = {
  file?: File;
  base64str: string;
};

export type TypePostItem = {
  id: string;
  date: string;
  text: string;
  fileItem?: TypeFileItem | null;
  sortindex?: string;
};

export type TypeChatComment = {
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

export type TypeChatInfoItem = {
  id: string;
  text: string;
  username: string;
  postdate: number;
};
