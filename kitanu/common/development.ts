import { userStore } from '@/store';

type DummyUser = {
  email: string;
  password: string;
  name: string;
  subtext: string;
  photoURL: string;
};

export const makeDummyUsers = () => {
  const users: DummyUser[] = [];
  users.push({
    email: process.env.DEV_USER_EMAIL || '',
    password: process.env.DEV_USER_PASS || '',
    name: process.env.DEV_USER_NAME || '',
    subtext: 'ニャオスカンゲキ',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/kitanu-5531b.appspot.com/o/chunamu_400x400.png?alt=media&token=a8495712-95c3-4ffa-8149-fa7d65b983df',
  });
  users.push({
    email: process.env.DEV_USER2_EMAIL || '',
    password: process.env.DEV_USER2_PASS || '',
    name: process.env.DEV_USER2_NAME || '',
    subtext: 'ニャオスカンゲキ',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/kitanu-5531b.appspot.com/o/cancrow.png?alt=media&token=ad3e5e8c-71b9-4d7e-aa7a-7a912844e49e',
  });
  users.push({
    email: process.env.DEV_USER3_EMAIL || '',
    password: process.env.DEV_USER3_PASS || '',
    name: process.env.DEV_USER3_NAME || '',
    subtext: 'ニャオスカンゲキ',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/kitanu-5531b.appspot.com/o/solid-snake-metal-gear-solid-4-guns-of-the-patriots-konami-wallpaper-preview.jpg?alt=media&token=8a33c89e-7be7-4864-a52d-d49a161d846b',
  });

  const ps = users.reduce((ps: any, user: DummyUser) => {
    return ps.then(() => {
      return userStore.MakeDummyUser({
        email: user.email,
        password: user.password,
        name: user.name || '',
        subtext: user.subtext || '',
        photoURL: user.photoURL || '',
      });
    });
  }, Promise.resolve());

  return ps
    .then(() => {
      console.log('ダミーユーザ作成完了');
      userStore.Logout();
    })
    .catch((error: Error) => {
      console.log('ダミーユーザ作成失敗', error);
    });
};
