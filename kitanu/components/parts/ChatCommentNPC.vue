<template>
  <div v-if="myitem" :class="myclass">
    <!-- <div class="chatitem-icon">
      <img class="chat-usericon lazy" :src="placeholderImg" :data-src="myitem.iconurl" alt="" />
    </div> -->
    <div class="chatitem-body">
      <!-- text -->
      <!-- good -->
      <div class="chatitem-body-good">
        <transition name="fade">
          <p v-if="visible" class="wf-nicomoji">
            {{ myitem.text }}
          </p>
        </transition>
      </div>
      <!-- bottom -->
      <!-- <div class="chatitem-bottom">
        <div class="chatitem-postinfo">
          （キータヌ
          <span>{{ postdate }}</span>
          ）
        </div>
      </div> -->
    </div>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
/* eslint vue/no-v-html: 0 */
import dayjs from 'dayjs';
import Vue, { PropType } from 'vue';
import { TypeChatComment } from '@/components/types/app';

type State = {
  urls: string[];
  visible: boolean;
};

export default Vue.extend({
  name: 'ChatComment',
  props: {
    myitem: {
      type: Object as PropType<TypeChatComment>,
      required: true,
    },
    last: {
      type: Boolean,
      default: false,
    },
  },
  data(): State {
    return {
      urls: [],
      visible: false,
    };
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
    postdate(): string {
      return dayjs(this.myitem.postdate).format('YYYY.MM.DD HH:mm:ss');
    },
  },
  mounted() {
    const links = this.myitem.text.match(/http.*[a-zA-Z]?/g);
    if (links && links.length > 0) {
      this.urls = links;
    }
    if (this.myitem.imgurl) {
      this.urls.push(this.myitem.imgurl);
    }
    this.showGood();
  },
  methods: {
    showGood() {
      if (this.last) {
        setTimeout(() => {
          this.visible = true;
        }, 200);
      } else {
        this.visible = true;
      }
    },
    doGood() {
      console.log('doGood');
    },
  },
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
  // color: var(--app-comment-color);
  // color: #ceb60b;
}
.chatitem-icon {
  position: absolute;
  top: 5px;
  left: 50px;
}
.chatitem-body {
  flex: 1;
  font-size: 12px;
  line-height: 1.5;
}

.chatitem-body-good {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // min-height: 100px;
  padding: 0 0 20px 60px;

  p {
    position: relative;
    padding: 10px 10px;
    margin: 0 0 0px 20px;
    font-size: 22px;
    line-height: 1;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 0 2px 1px #ddcd69;
    color: #ddcd69;
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

.chatitem .chat-usericon {
  flex: 1 0 0;
  margin-right: 0.5em;
  border-radius: 0;
  width: 40px;
  height: auto;
}

.chatitem-bottom {
  display: flex;
  align-items: center;
  border-top: dashed 1px #bbb;
  border-radius: 3px;
  padding: 6px 10px;
  margin: 6px 0 0;
  font-size: 10px;
  color: #aaa;
}

.chatitem-postinfo {
  font-size: 10px;
  text-align: right;
  margin-left: auto;
}
.chatitem-good {
  cursor: pointer;
  text-decoration: underline;
}
.chatitem-good:hover {
  text-decoration: none;
}
</style>
