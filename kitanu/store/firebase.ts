import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
// import { isLocal } from '@/common/util';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { logError } from '@/common/error';
import { postImgRef } from '@/plugins/firebase';
import { ActionRes } from '@/components/types/apptypes';
@Module({ name: 'firebase', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  count: number = 0;
  // ----------------------
  // Mutation
  // ----------------------
  @Mutation
  // SET_REF_POSTIMG(ref: firebase.firestore.CollectionReference) {
  //   // this.postImgRef = { ...ref };
  //   this.count += 1;
  // }

  // ----------------------
  // Action
  // ----------------------
  @Action({ rawError: true })
  AddPostImg(params: any): Promise<ActionRes> {
    const p = { ...params };

    console.log('AddPostImg', params);

    return postImgRef
      .add(p)
      .then((docRef: firebase.firestore.DocumentReference) => {
        console.log('Document written with ID: ', docRef.id);
        return {};
      })
      .catch((error: any) => {
        console.error('Error adding document: ', error);
        logError(error, 'AddPostImg');
        return { errorCode: error.code, errorMsg: error.message };
      });
  }

  // @Action({ rawError: true })
  // AddTry(params: any): Promise<ActionRes> {
  //   const p = { ...params };

  //   return camakichiRef
  //     .set(p)
  //     .then((d: any) => {
  //       console.log('Document written with ID: ', d);
  //       return {};
  //     })
  //     .catch((error: any) => {
  //       console.error('Error adding document: ', error);
  //       logError(error);
  //       return { errorCode: error.code, errorMsg: error.message };
  //     });
  // }

  // ----------------------
  // get
  // ----------------------
  get mycount(): number {
    return this.count;
  }
}
