<template>
  <div v-if="myitem" :class="myclass">
    <div class="chatitem-icon">
      <img class="chat-usericon lazy" :src="placeholderImg" :data-src="myitem.iconurl" alt="" />
    </div>
    <div class="chatitem-body">
      <!-- text -->
      <p v-if="!isGood" class="chatitem-body-text wf-nicomoji" v-html="$sanitize(text)"></p>
      <!-- good -->
      <div v-if="isGood" class="chatitem-body-good">
        <transition name="fade">
          <p v-if="visibleGood" class="wf-nicomoji">
            <ion-icon v-for="g in +myitem.good" :key="`good${g}`" name="beer" />
            <!-- <img class="lazy" :src="placeholderImg" :data-src="`/img/good${myitem.good}.png`" alt="" /> -->
          </p>
        </transition>
      </div>
      <!-- imgs -->
      <p v-for="u in urls" :key="u" class="chatitem-body-img">
        <img class="lazy" :src="placeholderImg" :data-src="u" alt="" />
      </p>
      <!-- bottom -->
      <div class="chatitem-bottom">
        <p><a class="chatitem-good" @click="doGood">いいね（45）</a></p>
        <div class="chatitem-postinfo">
          （{{ myitem.username }}
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
    opposite: {
      default: false,
      type: Boolean,
    },
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
      const ret: any = { chatitem: true };
      if (this.opposite) {
        ret['--opposite'] = true;
      }
      if (this.myitem && this.myitem.fukitype) {
        ret['--fuki'] = true;
        ret[`--${this.myitem.fukitype}`] = true;
      }
      if (this.isGood) {
        ret['--good'] = true;
      }
      return ret;
    },
    text(): string {
      if (!this.myitem) return '';
      return this.myitem.text.replace(/http.*[a-zA-Z]?/, '').replace(/[\n]/g, '<br>');
    },
    postdate(): string {
      return dayjs(this.myitem.postdate).format('YYYY.MM.DD HH:mm:ss');
    },
    isGood(): boolean {
      if (!this.myitem.good) return false;
      return this.myitem.good > 0;
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
  color: #c1620e;
  &.--fuki {
    .chatitem-body {
      background-color: transparent;
      text-indent: initial;
      box-shadow: none;
    }
    .chatitem-body-text {
      display: flex;
      align-items: center;
      justify-content: center;
      text-indent: 0;

      background-size: 100% 100%;
      background-repeat: no-repeat;
      // font-size: 14px;
      padding: 40px 60px;
      min-height: 230px;
    }
  }
  &.--fuki1 .chatitem-body-text {
    position: relative;
    min-height: auto;
    padding: 20px;
    margin: 80px 20px 40px;
    border-radius: 22px;
    background-color: #ecde90;

    &::before {
      content: '';
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #ecde90;
      position: absolute;
      top: -25px;
      left: -10px;
    }
    &::after {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #ecde90;
      position: absolute;
      top: -44px;
      left: -15px;
    }
  }
  &.--fuki2 .chatitem-body-text {
    // background-image: url('/img/e0308_1.png');
    background-image: url('/img/e0099_0.svg');
    padding: 40px 60px 40px;
    min-height: 260px;
    color: #333;
    text-shadow: none;
    text-align: center;
  }
  &.--fuki3 .chatitem-body-text {
    background-image: url('/img/e0391_1.svg');
    padding: 30px 60px;
    min-height: 160px;
    text-align: center;
  }
  &.--fuki4 .chatitem-body-text {
    // background-image: url('/img/e0272_1.png');
    background-image: url('/img/e0313_1.svg');
    background-size: 100% auto;
    padding: 30px 60px 30px;
    min-height: 100px;
  }
  &.--waku {
    background-color: #fff;
    padding: 10px 5px 0;
    border-radius: 8px;
    box-shadow: -2px 2px 2px #eee, 2px -2px 2px #eee;
  }
}
.chatitem-icon {
  position: absolute;
  top: 5px;
  left: 10px;
}
.chatitem-body {
  flex: 1;
  font-size: 12px;
  line-height: 1.5;
}
.chatitem-body-text {
  font-size: 12px;
  padding: 0px 10px 10px 10px;
  text-indent: 0.7em;
  line-height: 1;
  text-shadow: 0 0 2px #ffbd41;
  color: #c1620e;
  &.wf-nicomoji {
    font-size: 28px;
  }
}
.chatitem-body-good {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  text-align: center;

  ion-icon {
    font-size: 63px;
    color: #ecde90;
  }
  p {
    border: solid 1px #fff;
    padding: 0px 0 20px 20px;
    font-size: 54px;
    line-height: 1;
  }
}
.chatitem-body-img {
  margin: 10px 0;
}

.chatitem .chat-usericon {
  flex: 1 0 0;
  margin-right: 0.5em;
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
