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
  fileItem: FileItemType;
  text: string;
};

export type FileItemType = {
  file: File;
  base64str: string;
};

export type PostItemType = {
  id: string;
  date: string;
  text: string;
  imgurl?: string;
  sortindex: string;
};

export type ChatCommentType = {
  id: string;
  iconurl: string;
  text: string;
  username: string;
  postdate: number;
  fukitype?: string;
  imgurl?: string;
};

export type ChatInfoItemType = {
  id: string;
  text: string;
  username: string;
  postdate: number;
};
