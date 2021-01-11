import Vue from 'vue';
import { dateDisp } from '@/common/util';

Vue.filter('dateDisp', function (milisecond: number) {
  return dateDisp(milisecond);
});
