<template>
  <div v-if="myitem" :class="myclass">
    <div class="chatitem-body">
      <!-- text -->
      <div class="chatitem-body-npc">
        <transition name="fade">
          <p class="wf-nicomoji">
            {{ myitem.text }}
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
/* eslint vue/no-v-html: 0 */
import dayjs from 'dayjs';
import Vue, { PropType } from 'vue';
import { TypeChatPost } from '@/components/types/apptypes';

type State = {};

export default Vue.extend({
  name: 'ChatPostNPC',
  props: {
    myitem: {
      type: Object as PropType<TypeChatPost>,
      required: true,
    },
    last: {
      type: Boolean,
      default: false,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myclass(): any {
      const ret: any = { chatitem: true, '--good': true };

      return ret;
    },
    text(): string {
      if (!this.myitem) return '';
      return this.myitem.text
        .replace(/http.*[a-zA-Z]?/, '')
        .replace(/[\n]/g, '<br>');
    },
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
// 吹き出し背景カラー #ECDE90

.chatitem {
  position: relative;
  display: flex;
  padding: 10px 20px 10px 20px;
}

.chatitem-body {
  flex: 1;
  font-size: 12px;
  line-height: 1.5;
}

.chatitem-body-npc {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 20px 60px;

  p {
    position: relative;
    padding: 10px 10px;
    margin: 0 0 0px 20px;
    font-size: 14px;
    line-height: 1.4;
    border-radius: 6px;
    // background-color: #fff;
    // box-shadow: 0 0 2px 1px #ddcd69;
    color: #cab218;
    text-shadow: 0 1px 1px #fff;
    &::after {
      display: block;
      content: '';
      background-image: url('/img/tanu/tanu-120.png');
      width: 40px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: 100%;
      position: absolute;
      top: -10px;
      left: -36px;
    }
  }
}
</style>
