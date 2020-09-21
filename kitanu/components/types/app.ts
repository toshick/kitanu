export type ActionRes = {
  error?: boolean;
  ok?: boolean;
};

export type User = {
  username: string;
  iconurl: string;
  subtext?: string;
};

export type AlbumItem = {
  date: string;
  dateDisp: string;
  text: string;
  members: User[];
};

export type FileItem = {
  file: File;
  base64str: string;
};

export type PostItem = {
  id: string;
  date: string;
  text: string;
  imgurl?: string;
  sortindex: string;
};
