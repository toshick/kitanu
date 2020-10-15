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
import { TypeFileItem } from '@/components/types/app';

type State = {
  files: TypeFileItem[];
};

export default Vue.extend({
  name: 'FileUpload',
  components: {},
  props: {},
  data(): State {
    return {
      files: [],
    };
  },
  computed: {
    myClass(): any {
      const klass: any = { fileupload: true };

      return klass;
    },
  },
  mounted() {},
  methods: {
    onFileChange(e: any) {
      const files: File[] = e.target.files || e.dataTransfer.files;

      const p: Promise<any>[] = [];
      files.forEach((f: File) => {
        p.push(
          new Promise((resolve: any) => {
            const reader = new FileReader();
            reader.onload = (e: Event) => {
              const fr = e.target as FileReader;
              const base64str: string = fr.result as string;
              const fitem: TypeFileItem = {
                file: f,
                base64str,
              };
              this.files.push(fitem);
              this.$emit('loaded', fitem);
              resolve();
            };
            reader.readAsDataURL(f);
          }),
        );
      });

      Promise.all(p).then(() => {
        this.$emit('finish-all', this.files);
        this.files = [];
      });
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
}
input[type='file'] {
  display: none;
}
</style>
