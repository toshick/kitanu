<template>
  <ValidationProvider
    v-slot="{ invalid }"
    tag="form"
    class="mytextarea"
    :class="myclass"
    rules="required"
  >
    <div class="textareainput">
      <div class="textarea">
        <textarea
          ref="textarea"
          :value="txt"
          :rows="commentTextRows"
          placeholder="コメントヌ"
          @input="onInputComment"
        />
      </div>
      <div class="textarea-bottom">
        <!-- 送信 -->
        <a class="btn-submit" :disabled="invalid" @click="submit">
          <ion-icon name="paper-plane-outline"></ion-icon>
        </a>
        <!-- 送信 -->
        <a class="btn-trash" @click="remove">
          <ion-icon name="trash-outline"></ion-icon>
        </a>
        <!-- 閉じる -->
        <a class="btn-close" @click="$emit('close')">
          <ion-icon name="close-outline"></ion-icon>
        </a>
      </div>
    </div>
  </ValidationProvider>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';

type State = {
  txt: string;
};

export default Vue.extend({
  name: 'TextArea',
  components: { ValidationProvider },
  props: {
    placeholder: {
      default: '',
      type: String,
    },
    withColor: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {
      txt: '',
    };
  },
  computed: {
    commentTextRows(): number {
      if (!this.txt) return 1;
      const tmp = this.txt.split('\n');
      const count = tmp.reduce((eachValue, currentValue) => {
        const mycount = Math.floor(currentValue.length / 13);
        return eachValue + mycount;
      }, 0);
      return tmp.length + count;
    },
    myclass(): any {
      const ret: any = {};
      if (this.withColor) {
        ret['--with-color'] = true;
      }
      return ret;
    },
  },
  mounted() {
    if (this.value) {
      this.txt = this.value.replace(/<br>/g, '\n');
    }
    this.focus();
  },
  methods: {
    focus() {
      const $textarea = this.$refs.textarea as HTMLTextAreaElement;
      $textarea.focus();
    },
    submit() {
      this.$emit('submit', this.txt);
      this.txt = '';
    },
    onInputComment(e: InputEvent) {
      const $el = e.target as HTMLTextAreaElement;
      this.txt = $el.value;
    },
    remove() {
      this.$emit('remove', this.txt);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
$keyColor: #d9c84e;
.mytextarea {
  &.--with-color {
    textarea {
      background-color: $keyColor;
      border: none;
      color: #fff;
    }
  }
}
textarea {
  display: block;
  width: 100%;
  border: solid 1px #ccc;
  border-radius: var(--form-radius);
  font-size: var(--form-input-fontsize-normal);
  // box-shadow: var(--form-shadow);
  box-shadow: 0 0 2px 1px #fff;
  padding: 6px 2em 6px 12px;
  color: var(--dark);
  &:focus {
    border: solid 1px #ccc;
    outline: none;
  }
}
.textarea-bottom {
  display: flex;
  justify-content: flex-start;
  margin: 4px 0 0;
  font-size: 20px;
  color: $keyColor;
  ion-icon {
    color: inherit;
    font-size: inherit;
  }
}
.btn-close {
  margin-left: auto;
}
.btn-trash {
  margin-left: 1em;
}
</style>
