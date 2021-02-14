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
        v-if="!editing"
        class="chatitem-body-text"
        v-html="$sanitize(text)"
      ></p>
      <TextArea
        v-else
        class="chatitem-edit-textarea"
        placeholder="コメントヌ"
        with-color
        :value="myitem.text"
        @close="editing = false"
        @submit="onSubmitCommentEdit"
        @remove="onRemovePost"
      />
      <!-- imgs -->
      <p v-for="u in urls" :key="u" class="chatitem-body-img">
        <img class="lazy" :src="placeholderImg" :data-src="u" alt="" />
      </p>
      <!-- bottom -->
      <div class="chatitem-bottom">
        <!-- 編集 -->
        <a v-if="editable" class="chatitem-edit" @click="editing = true">
          編集</a
        >
        <!-- グッドヌ -->
        <a
          v-show="!editing && !isRemoved"
          class="chatitem-good"
          @click="$emit('good', myitem.id)"
        >
          <span>{{ goodCount }}</span>
          <ion-icon name="paw" size="small"></ion-icon>
        </a>
      </div>
      <!-- コメント -->
      <div v-if="comments.length > 0" class="chatitem-body-comments">
        <ul>
          <li v-for="(i, index) in comments" :key="`${index}-${i.text}`">
            <ChatPost
              v-if="!i.npc"
              :myitem="i"
              :last="index === comments.length - 1"
              :is-comment="true"
              :login-user-id="loginUserId"
              @good="(chatpostid) => $emit('good', chatpostid)"
              @update-comment="
                (chatpostid, str) => $emit('update-comment', chatpostid, str)
              "
              @remove-post="
                (chatpostid, str) => onRemovePostComment(chatpostid, str)
              "
            />
            <ChatPostNPC
              v-else
              :myitem="i"
              :last="index === comments.length - 1"
            />
          </li>
        </ul>
      </div>
      <!-- 返信 -->
      <div v-if="visibleCommentBtn" class="chatitem-reply">
        <div
          v-show="!visibleCommentInput"
          class="chatitem-reply-btn"
          @click="toggleStartComment"
        >
          <ion-icon name="chatbubble-ellipses-outline" size="small"></ion-icon>
        </div>
        <!-- コメント入力 -->
        <div v-show="visibleCommentInput" class="chatitem-comment">
          <TextArea
            ref="commentInput"
            class="chatitem-comment-textarea"
            placeholder="コメントヌ"
            with-color
            @close="visibleCommentInput = false"
            @submit="onSubmitComment"
            @remove="onRemovePost"
          />
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
import { TypeChatPost, TypeUserDisp } from '@/components/types/apptypes';
import { hiraToKana } from '@/common/util';
import { makeUserDisp } from '@/common/helper';

type State = {
  visibleCommentInput: boolean;
  editing: boolean;
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
      visibleCommentInput: false,
      editing: false,
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
      if (this.isSelfPost) {
        ret['--self'] = true;
      }
      if (this.editing) {
        ret['--editing'] = true;
      }
      if (this.isRemoved) {
        ret['--removed'] = true;
      }
      return ret;
    },
    text(): string {
      if (!this.myitem) return '';
      const txt = this.myitem.text
        // .replace(/http.*[a-zA-Z]?/, '')
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
    visibleCommentBtn(): boolean {
      return !this.isComment;
    },
    isRemoved(): boolean {
      return this.myitem.removed;
    },
    editable(): boolean {
      return this.isSelfPost && !this.editing && !this.isRemoved;
    },
    urls(): string[] {
      let ret: string[] = [];
      const { imgurl, text } = this.myitem;
      const links = text.match(/http.*[a-zA-Z]?/g);
      if (links && links.length > 0) {
        ret = ret.concat(links);
      }
      if (imgurl) ret = ret.concat(imgurl);
      return ret;
    },
  },
  mounted() {
    // const links = this.myitem.text.match(/http.*[a-zA-Z]?/g);
    // if (links && links.length > 0) {
    //   this.urls = links;
    // }
    // if (this.myitem.imgurl) {
    //   this.urls.push(this.myitem.imgurl);
    // }
  },
  methods: {
    toggleStartComment() {
      this.visibleCommentInput = !this.visibleCommentInput;
      if (this.visibleCommentInput) {
        this.$nextTick(() => {
          const $commentInput: any = this.$refs.commentInput;
          $commentInput.focus();
        });
      }
    },
    // startComment() {
    //   this.visibleCommentInput = true;
    //   this.$nextTick(() => {
    //     const $textareaInput: any = this.$refs.textareaInput;
    //     $textareaInput.focus();
    //     this.$emit('focus', $textareaInput.getBoundingClientRect().top);
    //   });
    // },
    onRemovePost(str: string) {
      this.$emit('remove-post', this.myitem.id, str);
      // this.editing = false;
    },
    onRemovePostComment(chatpostid: string, str: string) {
      this.$emit('remove-post', chatpostid, str);
      // this.editing = false;
    },
    onSubmitComment(str: string) {
      this.$emit('submit-comment', this.myitem.id, str);
      this.visibleCommentInput = false;
    },
    onSubmitCommentEdit(str: string) {
      this.$emit('update-comment', this.myitem.id, str);
      this.editing = false;
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
  $fuki1BG: #d9c84e;
  &.--fuki1 > .chatitem-body > .chatitem-body-text {
    display: inline-flex;
    position: relative;
    min-height: auto;
    padding: 10px 15px;
    margin: 20px 20px 10px;
    border-radius: 12px;
    background-color: $fuki1BG;
    color: #fff;
    font-weight: normal;
    text-shadow: none;
    // box-shadow: inset 0 1px 1px 0 rgba(#fff, 0.8);

    &::before {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: $fuki1BG;
      // box-shadow: 0 1px 1px 0 rgba(#000, 0.3);
      position: absolute;
      top: 10px;
      left: -10px;
    }
    &::after {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $fuki1BG;
      // box-shadow: 0 1px 1px 0 rgba(#000, 0.3);
      position: absolute;
      top: 0px;
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
  &.--self > .chatitem-body > .chatitem-body-comments {
    li {
      margin-bottom: 0;
    }
  }
  &.--editing > .chatitem-icon {
    transform: scale(0.9, 0.9);
    opacity: 0.5;
  }
  &.--removed > .chatitem-body > .chatitem-body-text {
    display: flex;
    color: #ccc;
    text-shadow: none;
    background-image: none;
    min-height: auto;
    justify-content: center;
    padding: 10px 0px;
    text-indent: 0;
  }
}
.chatitem-icon {
  position: absolute;
  top: 0px;
  left: 10px;
  transition: all 200ms ease;
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
  word-break: break-all;
  &.wf-nicomoji {
    font-size: 14px;
  }
}

.chatitem-body-img {
  position: relative;
  margin: 10px 0;
  img {
    display: block;
    border-radius: 4px;
    box-shadow: 0 0 3px 0px rgba(#666, 0.6);
    max-height: 230px;
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
  position: absolute;
  top: 10px;
  right: 30px;
  ion-icon {
    color: inherit;
    border-radius: 50%;
    padding: 1px;
    // background-color: #fff;
    // box-shadow: 0 1px 0 rgba(#000, 0.2);
  }
  span {
    display: block;
    margin: 0 5px 0 5px;
    text-shadow: 1px 1px 0 #fff;
    font-weight: bold;
  }
}
// 編集
.chatitem-edit {
  margin-right: 1em;
}
$leftSpace: 36px;
// 返信
.chatitem-reply {
  position: relative;
  margin: 0 0px 0 $leftSpace;
  text-align: center;
  // &::before {
  //   content: '';
  //   display: block;
  //   border-top: dashed 1px #eee496;
  //   position: absolute;
  //   top: 10px;
  //   left: 0;
  //   width: 100%;
  // }
}
.chatitem-reply-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: #d2bd28;
  background-color: #fff;
  border-radius: 50%;
  padding: 2px;
  ion-icon {
    color: inherit;
  }
}

.chatitem-edit-textarea {
  padding: 0 4px;
  margin: 10px 0 0 $leftSpace;
}
.chatitem-comment {
  padding-top: 4px;
}
.chatitem-comment-textarea {
  padding: 0 4px;
}

// コメント一覧
.chatitem-body-comments {
  margin: 10px 0 0 $leftSpace;

  li {
    margin-bottom: 0.5em;
  }

  .chatitem {
    padding: 0;
    margin: 0;
    overflow: auto;
    &.--removed {
      margin-bottom: 10px;
      .chatitem-body-text {
        background-color: transparent;
        box-shadow: none;
        background-image: none;
        color: #ccc;
        padding: 10px 0px;
      }
    }
  }

  .chatitem-icon {
    left: 0px;
    top: 0px;
  }
  .chatitem-body-name {
    padding: 0px 0 5px 35px;
  }
  .chatitem-body-text {
    position: relative;
    border-radius: 4px;
    background-image: url('/img/pat/light-mesh.png');
    background-color: #eeedcc;
    background-color: #fffefb;
    background-size: 70%;
    box-shadow: inset 0 1px 1px 0px rgba(#000, 0.4);
    padding: 10px 40px 10px 10px;
    margin: 0 2px 5px;
    text-indent: 0;
    font-size: 12px;
    color: #666;
    overflow: hidden;
    text-shadow: none;
    &::after {
      content: '';
      display: block;
      background-image: url('/img/tanu/tanu.png');
      background-repeat: no-repeat;
      background-size: 100% auto;
      width: 40px;
      height: 50px;
      position: absolute;
      top: 120px;
      right: -7px;
      z-index: 1;
    }
  }
  .chatitem-good {
    top: 31px;
    right: 10px;
  }
  .chatitem-edit-textarea {
    margin: 0;
  }
}
</style>
