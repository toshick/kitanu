<template>
  <div v-if="myitem" :class="myclass">
    <!-- ユーザアイコン -->
    <UserIcon
      class="chatitem-icon"
      :url="createdBy.iconurl"
      :username="createdBy.username"
      :size="isComment ? 'S' : 'M'"
      shadow
    />
    <!-- <div class="chatitem-icon">
      <img
        class="chat-usericon lazy"
        :src="placeholderImg"
        :data-src="createdBy.iconurl"
        alt=""
      />
    </div> -->
    <div class="chatitem-body">
      <p class="chatitem-body-name">
        {{ createdBy.username }}
        <span>（{{ postdate }}）</span>
      </p>
      <!-- text -->
      <p
        class="chatitem-body-text"
        :class="{ 'wf-nicomoji': hasFukidashi }"
        v-html="$sanitize(text)"
      ></p>
      <!-- imgs -->
      <p v-for="u in urls" :key="u" class="chatitem-body-img">
        <img class="lazy" :src="placeholderImg" :data-src="u" alt="" />
      </p>
      <!-- bottom -->
      <div v-show="!visibleCommentInput" class="chatitem-bottom">
        <!-- 編集 -->
        <a
          v-if="isSelfPost"
          class="chatitem-edit"
          @click="$emit('edit', { ...myitem })"
        >
          編集</a
        >
        <!-- グッドヌ -->
        <a class="chatitem-good" @click="$emit('good', myitem.id)">
          <ion-icon name="paw" size="small"></ion-icon>
          <span>{{ goodCount }}</span>
        </a>
        <!-- 返信 -->
        <div v-if="!isComment" class="chatitem-reply" @click="startComment">
          <ion-icon name="chatbubble-ellipses-outline" size="small"></ion-icon>
        </div>
      </div>
      <!-- コメント -->
      <ul v-if="comments.length > 0" class="chatitem-body-comments">
        <li v-for="(i, index) in comments" :key="`${index}-${i.text}`">
          <ChatPost
            v-if="!i.npc"
            :myitem="i"
            :last="index === comments.length - 1"
            :is-comment="true"
            @good="(chatpostid) => $emit('good', chatpostid)"
          />
          <ChatPostNPC
            v-else
            :myitem="i"
            :last="index === comments.length - 1"
          />
        </li>
      </ul>
      <!-- コメント入力 -->
      <div
        v-show="visibleCommentInput"
        ref="textareaInput"
        class="chatitem-comment"
      >
        <TextArea
          class="chatitem-comment-textarea"
          placeholder="コメントヌ"
          with-color
          @close="visibleCommentInput = false"
          @submit="onSubmitComment"
        />
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
import { TypeChatPost, TypeUserDisp } from '@/components/types/apptypes';
import { hiraToKana } from '@/common/util';
import { makeUserDisp } from '@/common/helper';

type State = {
  urls: string[];
  visibleCommentInput: boolean;
};

export default Vue.extend({
  name: 'ChatPost',
  props: {
    myitem: {
      type: Object as PropType<TypeChatPost>,
      required: true,
    },
    last: {
      type: Boolean,
      default: false,
    },
    isComment: {
      type: Boolean,
      default: false,
    },
    // isSelfPost: {
    //   type: Boolean,
    //   default: false,
    // },
    loginUserId: {
      type: String,
      default: '',
    },
  },
  data(): State {
    return {
      urls: [],
      visibleCommentInput: false,
    };
  },
  computed: {
    myclass(): any {
      const ret: any = { chatitem: true };
      if (this.myitem && this.myitem.fukitype) {
        ret['--fuki'] = true;
        ret[`--${this.myitem.fukitype}`] = true;
      }
      if (this.isComment) {
        ret['--comment'] = true;
      }
      if (this.isGood) {
        ret['--good'] = true;
      }
      return ret;
    },
    text(): string {
      if (!this.myitem) return '';
      const txt = this.myitem.text
        .replace(/http.*[a-zA-Z]?/, '')
        .replace(/[\n]/g, '<br>');
      return hiraToKana(txt).trim();
    },
    postdate(): string {
      return dayjs(this.myitem.createdAt).format('YYYY.MM.DD HH:mm:ss');
    },
    hasFukidashi(): boolean {
      return !!this.myitem.fukitype;
    },
    createdBy(): TypeUserDisp {
      return (
        this.myitem.createdBy ||
        makeUserDisp({
          id: '',
        })
      );
    },
    comments(): TypeChatPost[] {
      return this.myitem.comments || [];
    },
    goodCount(): number {
      return this.myitem.goodMemberIDs.length;
    },
    isSelfPost(): boolean {
      return this.myitem.createdByID === this.loginUserId;
    },
    isGood(): boolean {
      return this.myitem.goodMemberIDs.includes(this.loginUserId);
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
  },
  methods: {
    startComment() {
      this.visibleCommentInput = true;
      this.$nextTick(() => {
        const $textareaInput: any = this.$refs.textareaInput;
        $textareaInput.focus();
        this.$emit('focus', $textareaInput.getBoundingClientRect().top);
      });
    },
    onSubmitComment(str: string) {
      this.$emit('submit-comment', this.myitem.id, str);
      this.visibleCommentInput = false;
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
  padding: 5px 20px 10px;
  // color: var(--app-comment-color);
  color: #c1620e;
  overflow: hidden;
  &.--fuki {
    & > .chatitem-body {
      background-color: transparent;
      text-indent: initial;
      box-shadow: none;
      & > .chatitem-body-text {
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
  }
  &.--fuki1 > .chatitem-body > .chatitem-body-text {
    display: inline-flex;
    position: relative;
    min-height: auto;
    padding: 10px 15px;
    margin: 20px 20px 10px;
    border-radius: 16px;
    background-color: #ecde90;

    &::before {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #ecde90;
      position: absolute;
      top: 5px;
      left: -10px;
    }
    &::after {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ecde90;
      position: absolute;
      top: -4px;
      left: -15px;
    }
  }
  &.--fuki2 > .chatitem-body > .chatitem-body-text {
    // background-image: url('/img/e0308_1.png');
    background-image: url('/img/e0099_0.svg');
    max-width: 200px;
    min-height: 200px;
    color: #333;
    text-shadow: none;
    text-align: center;
    margin: 0 auto;
    padding: 0;
  }

  &.--fuki3 > .chatitem-body > .chatitem-body-text {
    background-image: url('/img/e0391_1.svg');
    padding: 30px 60px;
    min-height: 160px;
    text-align: center;
  }
  // &.--fuki4 .chatitem-body-text {
  //   background-image: url('/img/e0313_1.svg');
  //   background-size: 100% auto;
  //   background-position: 50%;
  //   padding: 30px 60px 30px;
  //   min-height: 100px;
  // }
  &.--waku {
    background-color: #fff;
    padding: 10px 5px 0;
    border-radius: 8px;
    box-shadow: -2px 2px 2px #eee, 2px -2px 2px #eee;
  }
  &.--good > .chatitem-body > .chatitem-bottom > .chatitem-good {
    color: var(--app-base-color2);
  }
}
.chatitem-icon {
  position: absolute;
  top: 0px;
  left: 10px;
}
.chatitem-body {
  flex: 1;
  font-size: 12px;
  line-height: 1.5;
}
.chatitem-body-name {
  padding: 0 0 4px 40px;
  font-size: 12px;
  color: #333;

  span {
    font-size: 10px;
    vertical-align: middle;
  }
}
.chatitem-body-text {
  font-size: 14px;
  padding: 0px 10px 5px 10px;
  text-indent: 2em;
  line-height: 1.4;
  text-shadow: 0 0 2px #ffbd41;
  color: #c1620e;
  &.wf-nicomoji {
    font-size: 14px;
  }
}

.chatitem-body-img {
  margin: 10px 0;
  img {
    border-radius: 4px;
    box-shadow: 0 0 2px 1px rgba(#a89b52, 0.6);
  }
}

.chatitem .chat-usericon {
  flex: 1 0 0;
  margin-right: 0.5em;
}

.chatitem-bottom {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-radius: 3px;
  font-size: 10px;
  color: #aaa;
}

.chatitem-postinfo {
  display: none;
  font-size: 10px;
  text-align: right;
  margin-left: auto;
}
.chatitem-good {
  display: flex;
  align-items: center;
  cursor: pointer;
  ion-icon {
    color: inherit;
  }
  span {
    margin: 0 10px 0 5px;
  }
}
// 編集
.chatitem-edit {
  margin-right: 1em;
}
// 返信
.chatitem-reply {
  display: flex;
  align-items: center;
  ion-icon {
    color: inherit;
  }
}

.chatitem-comment-textarea {
  margin: 10px 0 0;
}

// コメント一覧
.chatitem-body-comments {
  margin: 10px 0 0 22px;

  .chatitem {
    padding: 0 0 0 10px;
    margin: 0 0 10px;
    overflow: auto;
  }

  .chatitem-icon {
    left: 10px;
    top: 0px;
  }
  .chatitem-body-name {
    padding: 0px 0 5px 35px;
  }
  .chatitem-body-text {
    border-radius: 4px;
    background-color: #ececec;
    box-shadow: 0 0 2px 2px #fff;
    padding: 10px;
    margin: 0 2px 5px;
    text-indent: 0;
    font-size: 12px;
    color: #666;
    text-shadow: none;
  }
}
</style>
