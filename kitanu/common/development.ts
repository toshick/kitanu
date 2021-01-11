import { userStore } from '@/store';

type DummyUser = { email: string; password: string; name?: string };

export const makeDummyUsers = () => {
  const users: DummyUser[] = [];
  users.push({
    email: process.env.DEV_USER_EMAIL || '',
    password: process.env.DEV_USER_PASS || '',
    name: process.env.DEV_USER_NAME || '',
  });
  users.push({
    email: process.env.DEV_USER2_EMAIL || '',
    password: process.env.DEV_USER2_PASS || '',
    name: process.env.DEV_USER2_NAME || '',
  });
  users.push({
    email: process.env.DEV_USER3_EMAIL || '',
    password: process.env.DEV_USER3_PASS || '',
    name: process.env.DEV_USER3_NAME || '',
  });

  const ps = users.reduce((ps: any, user: DummyUser) => {
    return ps.then(() => {
      return userStore.MakeDummyUser({
        email: user.email,
        password: user.password,
        name: user.name || '',
      });
    });
  }, Promise.resolve());

  return ps
    .then(() => {
      console.log('ダミーユーザ作成完了');
      userStore.Logout();
    })
    .catch((error) => {
      console.log('ダミーユーザ作成失敗', error);
    });
};
