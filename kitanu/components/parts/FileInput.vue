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
import { base64ToFile } from '@/common/util';

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
                const size = {
                  width: image.naturalWidth,
                  height: image.naturalHeight,
                };
                const base64strResized = this.resize(image, f.type, size);

                const f2: File = await base64ToFile(base64strResized, f.name);

                const fitem = {
                  file: f2,
                  base64str,
                };
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
      const w = size.width / 10;
      const h = size.height / 10;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
      }

      const data = canvas.toDataURL(mimetype);
      return data;
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
