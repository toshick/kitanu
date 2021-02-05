<template>
  <div :class="myClass">
    <label>
      <input type="file" @change="onFileChange" />
      <ion-icon name="duplicate-outline" />
      <p>画像</p>
    </label>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { TypeFile } from '@/components/types/apptypes';
import { base64ToFile, ArrayUtil } from '@/common/util';

type State = {};

export default Vue.extend({
  name: 'FileUpload',
  components: {},
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {
      files: [],
    };
  },
  computed: {
    myClass(): any {
      const klass: any = { fileupload: true };
      if (this.disabled) {
        klass['-disabled'] = true;
      }
      return klass;
    },
  },
  mounted() {},
  methods: {
    onFileChange(e: any) {
      const a = ArrayUtil.Unique(['aaa', 'aaa', 'ggg']);
      console.log('ユニーク', a);

      const myfiles: TypeFile[] = [];
      const files: File[] = e.target.files || e.dataTransfer.files;

      const p: Promise<any>[] = [];
      files.forEach((f: File) => {
        p.push(
          new Promise((resolve: any) => {
            const reader = new FileReader();
            reader.onload = (e: Event) => {
              const fr = e.target as FileReader;
              const base64str: string = fr.result as string;

              // サイズ取得
              const image = new Image();
              image.onload = async () => {
                const base64strResized = this.resize(image, f.type, {
                  width: image.naturalWidth,
                  height: image.naturalHeight,
                });

                const f2: File = await base64ToFile(base64strResized, f.name);
                const fitem = {
                  file: f2,
                  base64str,
                } as const;
                myfiles.push(fitem);
                this.$emit('loaded', fitem);
                resolve();
              };
              image.src = base64str;
            };
            reader.readAsDataURL(f);
          }),
        );
      });

      Promise.all(p).then(() => {
        console.log('おわり');
        this.$emit('finish-all', myfiles);
      });
    },
    resize(
      img: Image,
      mimetype: string,
      size: { width: number; height: number },
    ): string {
      const { width, height } = size;
      const maxW = 640;
      const ratio = maxW / size.width;
      const w = Math.floor(width * ratio);
      const h = Math.floor(height * ratio);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
      }
      return canvas.toDataURL(mimetype);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.fileupload {
  label {
    display: block;
    text-align: center;
    font-size: 10px;
    color: var(--app-color-dark);
    text-decoration: none;
    cursor: pointer;
  }
  ion-icon {
    font-size: 26px;
    color: inherit;
  }
  p {
    padding: 0;
    margin: -3px 0 0;
    color: inherit;
  }
  &.-disabled {
    pointer-events: none;
    label {
      opacity: 0.4;
    }
  }
}
input[type='file'] {
  display: none;
}
</style>
