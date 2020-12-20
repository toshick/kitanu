import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionRes, TypeLoginUser } from '@/components/types/app';
import { logError } from '@/common/error';

@Module({ name: 'firebase', stateFactory: true, namespaced: true })
export default class MyClass extends VuexModule {
  // ----------------------
  // Mutation
  // ----------------------
  // ----------------------
  // Action
  // ----------------------
  // ----------------------
  // get
  // ----------------------
}
