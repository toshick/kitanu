<template>
  <footer :class="myClass">
    <!-- top -->
    <template v-if="mymode == 'menu'">
      <div class="app-footer-icon">
        <a @click.stop.prevent="goTop">
          <ion-icon name="leaf-outline" />
          <p>ホーム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="goChatList">
          <ion-icon name="chatbubble-ellipses-outline" />
          <p>しゃべる</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="goAlbum">
          <ion-icon name="reorder-four-outline" />
          <p>アルバム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="goFriendList">
          <ion-icon name="paw-outline" />
          <p>ごゆうじん</p>
        </a>
      </div>
      <!-- <div class="app-footer-icon">
        <a @click.stop.prevent="openActivityList">
          <ion-icon name="bicycle-outline" />
          <p>かつどう</p>
          <CaBadge :num="5" />
        </a>
      </div> -->
    </template>
    <!-- make -->
    <template v-if="mymode == 'input'">
      <ValidationProvider v-slot="{ valid }" class="talk-input" name="mycomment" :rules="'required'" tag="div">
        <a :disabled="!canSubmit(valid)" class="btn-icon btn-comment" @click.stop.prevent="() => submit()">
          <ion-icon name="cloud-upload-outline" />
        </a>
        <!-- <CaTextarea v-model="talkText" name="talkText" width="M" placeholder="コメント"></CaTextarea> -->
        <div class="textarea">
          <textarea v-model="talkText" :rows="talkTextRows" :placeholder="placeholder" />
          <ul v-show="imgSelected" class="preview">
            <li v-for="url in imgurls" :key="url" class="preview-item">
              <img :src="url" alt="" />
              <a @click="() => removeImg(url)">
                <ion-icon name="close-circle" />
              </a>
            </li>
          </ul>
          <div v-show="!imgSelected" class="fileInput">
            <div class="app-footer-icon">
              <FileInput @loaded="onImgLoaded" />
            </div>
          </div>
        </div>
        <div v-if="mode === 'chat'" v-show="!imgSelected" class="buttonsRight">
          <a :disabled="!canSubmit(valid)" class="btn-icon btn-comment" @click.stop.prevent="() => submit(true)">
            <ion-icon name="flash-outline" />
          </a>
          <!-- good button -->
          <a class="btn-icon btn-good" @click.stop.prevent="doGood">
            <ion-icon name="beer-outline" />
          </a>
        </div>
      </ValidationProvider>
    </template>
  </footer>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider } from 'vee-validate';
import FileInput from '@/components/parts/FileInput.vue';
import { FileItemType } from '@/components/types/app';

type State = {
  talkText: string;
  fileItems: FileItemType[];
};

export default Vue.extend({
  name: 'AppFooter',
  components: { ValidationProvider, FileInput },
  props: {
    mode: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {
      talkText: '',
      fileItems: [],
    };
  },
  computed: {
    myClass(): any {
      const klass: any = { 'app-footer': true };
      if (this.mymode === 'input') {
        klass[`-input`] = true;
      }
      return klass;
    },
    talkTextRows(): number {
      return this.talkText.split('\n').length;
    },
    imgurls(): string[] {
      return this.fileItems.map((fileItem: FileItemType) => {
        return fileItem.base64str;
      });
    },
    mymode(): string {
      if (this.mode === 'chat' || this.mode === 'make') {
        return 'input';
      }
      return 'menu';
    },
    placeholder(): string {
      if (this.mode === 'make') {
        return 'おもいでをついか';
      }
      return 'しゃべる';
    },
    imgSelected(): boolean {
      return this.imgurls.length > 0;
    },
  },
  mounted() {},
  methods: {
    // addImg() {
    //   this.imgurls = ['https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg'];
    // },
    removeImg(url: string) {
      this.fileItems = this.fileItems.filter((fileItem: FileItemType) => {
        return fileItem.base64str !== url;
      });
    },
    onImgLoaded(i: FileItemType) {
      this.fileItems.push(i);
    },
    submit(withFuki: boolean = false) {
      const fukitype = withFuki ? `fuki${Math.ceil(Math.random() * 4)}` : '';
      this.$emit('submit', {
        fileItem: this.fileItems[0],
        text: this.talkText,
        reset: this.reset,
        fukitype,
      });
    },
    reset() {
      this.fileItems = [];
      this.talkText = '';
    },
    canSubmit(valid: boolean) {
      if (valid || this.imgurls.length > 0) return true;
      return false;
    },
    doGood() {
      this.$emit('submit', {
        good: Math.ceil(Math.random() * 5),
        text: '',
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss">
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(var(--app-base-color) 50%, var(--app-base-color2) 0%);
  padding: 0 30px;
  min-height: 50px;
  height: min-content;
  border-top: solid 1px #ecde90;

  &.-input {
    padding: 4px 10px;
    justify-content: flex-start;
    .app-footer-icon {
      margin-right: 0.5em;
      ion-icon {
        font-size: 20px;
      }
    }
  }
}

.app-footer-icon {
  position: relative;
  a {
    display: block;
    text-align: center;
    font-size: 10px;
    color: var(--app-color-dark);
    text-decoration: none;
    // color: #fff;
  }
  p {
    padding: 0;
    margin: -3px 0 0;
    color: inherit;
  }
  input {
    height: 34px;
    border-radius: 4px;
    border: solid 1px var(--app-base-color);
    padding: 0 10px;
  }
  ion-icon {
    font-size: 26px;
    color: inherit;
  }
  .ca-badge {
    position: absolute;
    top: 5px;
    right: -5px;
  }
}
.app-footer-input {
  display: flex;
  align-items: center;
  margin-right: 0.5em;

  .ca-input-status {
    display: none;
  }
  .ca-input-errors {
    display: none !important;
  }
}

.talk-input {
  position: relative;
  display: flex;
  align-items: center;
  flex: auto;
  .app-footer-icon {
    position: absolute;
    top: 6px;
    right: 5px;

    ion-icon {
      font-size: 16px !important;
    }
  }
}

.btn-icon {
  display: flex;
  align-items: center;

  flex-shrink: 0;
}

.btn-comment {
  margin-right: 0.5em;
  &[disabled] {
    opacity: 0.4;
  }
}
ul.preview {
  position: relative;
  padding: 3px 6px 3px 10px;

  flex: 2 0 auto;
  img {
    display: block;
    border-radius: 3px;
    box-shadow: 0 0 0px 1px rgba(#fff, 0.7);
    max-width: 80px;
  }
  a {
    display: block;
    position: absolute;
    top: 0px;
    right: -10px;
    z-index: 1;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      left: 3px;
      width: 17px;
      height: 17px;
      border-radius: 8px;
      background-color: #666;
      z-index: -1;
    }
  }
  ion-icon {
    color: #fff;
  }
}
.preview-item {
  position: relative;
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0;
  }
}
.textarea {
  position: relative;
  display: flex;
  align-items: center;
  flex: 2;
}
textarea {
  display: block;
  width: 100%;
  border: solid 1px #ccc;
  border-radius: var(--form-radius);
  font-size: var(--form-input-fontsize-normal);
  box-shadow: var(--form-shadow);
  padding: 6px 2em 6px 12px;
  color: var(--dark);
  &:focus {
    border: solid 1px #ccc;
    outline: none;
  }
}
.fileInput {
  display: flex;
  align-items: center;
}
.buttonsRight {
  display: flex;
  align-items: center;
  margin-left: 0.5em;
}
</style>
