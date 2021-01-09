import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ActionRes, TypeUser } from '@/components/types/apptypes';

// import { firebase } from '@/plugins/firebase.ts';

@Module({ name: 'app', stateFactory: true, namespaced: true })
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
