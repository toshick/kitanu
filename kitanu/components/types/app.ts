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
