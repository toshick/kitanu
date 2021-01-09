import firebase from 'firebase/app';
import { TypeLoginUser, TypeUser } from '@/components/types/apptypes';

/**
 * makeUserFromAuthUser
 */
export function makeUserFromAuthUser(user: TypeLoginUser): TypeUser {
  return {
    id: user.uid,
    username: user.displayName || user.email || '',
    iconurl: user.photoURL || '',
    subtext: '',
    friendList: [],
    created: firebase.firestore.FieldValue.serverTimestamp(),
  };
}
