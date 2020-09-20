<template>
  <footer :class="myClass">
    <!-- top -->
    <template v-if="mode == 'top'">
      <!-- <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('menu')">
          <ion-icon name="log-in-outline" />
          <p>メニュー</p>
        </a>
      </div> -->
      <div class="app-footer-icon">
        <a @click.stop.prevent="goTop">
          <ion-icon name="leaf" />
          <p>ホーム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('album')">
          <ion-icon name="reorder-four-outline" />
          <p>アルバム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('talk')">
          <ion-icon name="chatbubble-ellipses-outline" />
          <p>しゃべる</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('activity')">
          <ion-icon name="leaf-outline" />
          <p>かつどう</p>
          <CaBadge :num="5" />
        </a>
      </div>
    </template>
    <!-- chat -->
    <template v-if="mode == 'albamlist'">
      <div class="app-footer-icon">
        <a @click.stop.prevent="goTop">
          <ion-icon name="leaf" />
          <p>ホーム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('album')">
          <ion-icon name="reorder-four-outline" />
          <p>アルバム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('talk')">
          <ion-icon name="chatbubble-ellipses-outline" />
          <p>しゃべる</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('activity')">
          <ion-icon name="leaf-outline" />
          <p>かつどう</p>
        </a>
      </div>
    </template>
    <!-- make -->
    <template v-if="mode == 'make'">
      <ValidationProvider v-slot="{ invalid }" class="talk-input" name="mycomment" :rules="'required'" tag="div">
        <a :disabled="invalid" class="btn-comment" @click.stop.prevent="$emit('album')">
          <ion-icon name="cloud-upload-outline" />
        </a>
        <!-- <CaTextarea v-model="talkText" name="talkText" width="M" placeholder="コメント"></CaTextarea> -->
        <div class="textarea">
          <textarea v-model="talkText" :rows="talkTextRows" placeholder="しゃべる" />
          <div v-if="imgurl" class="preview">
            <img :src="imgurl" alt="" />
            <a @click="removeImg">
              <ion-icon name="close-circle" />
            </a>
          </div>
        </div>
        <div v-show="imgurl == ''" class="uibuttons">
          <div class="app-footer-icon">
            <a @click.stop.prevent="addImg">
              <ion-icon name="duplicate-outline" />
              <p>画像</p>
            </a>
          </div>
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

type State = {
  talkText: string;
  imgurl: string;
};
type Mode = 'top' | 'chat';

export default Vue.extend({
  name: 'AppFooter',
  components: { ValidationProvider },
  props: {
    mode: {
      default: 'top',
      type: String as PropType<Mode>,
    },
  },
  data(): State {
    return {
      talkText: '',
      imgurl: '',
    };
  },
  computed: {
    myClass(): any {
      const klass: any = { 'app-footer': true };
      klass[`-${this.mode}`] = true;
      return klass;
    },
    talkTextRows(): number {
      return this.talkText.split('\n').length;
    },
  },
  mounted() {},
  methods: {
    addImg() {
      this.imgurl = 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg';
    },
    removeImg() {
      this.imgurl = '';
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
  &.-make {
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

.btn-comment {
  display: flex;
  align-items: center;
  margin-right: 0.5em;
  flex-shrink: 0;
  &[disabled] {
    opacity: 0.4;
  }
}
.preview {
  position: relative;
  padding: 3px 6px;
  width: 80px;
  flex: 2 0 auto;
  img {
    display: block;
    border-radius: 3px;
    box-shadow: 0 0 0px 1px rgba(#fff, 0.7);
  }
  a {
    display: block;
    position: absolute;
    top: 0px;
    right: -4px;
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
    }
  }
  ion-icon {
    color: #fff;
  }
}
.textarea {
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
.uibuttons {
  display: flex;
  align-items: center;
}
</style>
