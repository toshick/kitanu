// import firebase from 'firebase/app';
import { storageRef } from '@/plugins/firebase';
import { isLocal } from '@/common/util';
import { TypeFileDirPath } from '@/components/types/apptypes';

/**
 * upload
 */
export function upload(
  file: File,
  path: TypeFileDirPath,
): Promise<{ url?: string; error?: Error }> {
  const tmp = file.name.split('.');
  const suffix = tmp.pop();
  if (!suffix) return Promise.resolve({ error: new Error('no suffix') });
  const name = `${tmp.join('.')}-${new Date().getTime()}.${suffix}`;
  const mypath = isLocal ? `${path}-debug` : path;
  const ref = storageRef.child(`${mypath}/${name}`);
  return ref
    .put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((url: string) => {
      return { url };
    })
    .catch((error: Error) => {
      return { error };
    });
}
