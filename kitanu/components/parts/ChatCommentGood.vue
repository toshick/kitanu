<template>
  <div v-if="myitem" :class="myclass">
    <div class="chatitem-icon">
      <img class="chat-usericon lazy" :src="placeholderImg" :data-src="myitem.iconurl" alt="" />
    </div>
    <div class="chatitem-body">
      <!-- text -->
      <!-- good -->
      <div class="chatitem-body-good">
        <transition name="fade">
          <p v-if="visibleGood" class="wf-nicomoji">
            <!-- <ion-icon v-for="g in +myitem.good" :key="`good${g}`" name="beer" /> -->
            <!-- <img class="lazy" :src="placeholderImg" :data-src="`/img/good${myitem.good}.png`" alt="" /> -->
            {{ myitem.text }}
          </p>
        </transition>
      </div>
      <!-- bottom -->
      <div class="chatitem-bottom">
        <div class="chatitem-postinfo">
          （キータヌ
          <span>{{ postdate }}</span>
          ）
        </div>
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
import { ChatCommentType } from '@/components/types/app';

type State = {
  urls: string[];
  visibleGood: boolean;
};

export default Vue.extend({
  name: 'ChatComment',
  props: {
    myitem: {
      type: Object as PropType<ChatCommentType>,
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
      visibleGood: false,
    };
  },
  computed: {
    myclass(): any {
      const ret: any = { chatitem: true, '--good': true };

      return ret;
    },
    text(): string {
      if (!this.myitem) return '';
      return this.myitem.text.replace(/http.*[a-zA-Z]?/, '').replace(/[\n]/g, '<br>');
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
          this.visibleGood = true;
        }, 200);
      } else {
        this.visibleGood = true;
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
  justify-content: flex-start;
  align-items: center;
  // min-height: 100px;
  padding: 0 0 20px 60px;

  p {
    // text-shadow: 0 0 2px #ccc;
    padding: 10px 10px;
    margin: 0 0 0px 20px;
    font-size: 24px;
    line-height: 1;
    border-radius: 6px;
    // background-color: #fff;
    // box-shadow: 0 0 2px 1px rgba(#000, 0.2);
    color: #fff;
    text-shadow: 0 0 1px #000;
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
