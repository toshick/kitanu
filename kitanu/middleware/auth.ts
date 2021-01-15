import Cookies from 'js-cookie';
import { userStore, COOKIE_AUTH } from '@/store';

export default function ({ redirect, route }: any) {
  const { path } = route;
  const hasAuth = Cookies.get(COOKIE_AUTH);
  if (hasAuth && path === '/login') {
    return redirect(302, '/');
  }
  if (!hasAuth && path !== '/login') {
    return redirect(302, '/login');
  }
}
