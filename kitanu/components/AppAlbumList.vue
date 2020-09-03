<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" href=""><ion-icon name="chevron-back" size="medium" /></a>
      <h1>アルバムリスト</h1>
      <a class="btn-header" @click.stop="editing = !editing">
        <ion-icon v-if="!editing" name="restaurant-outline" size="medium" />
        <span v-else>完了</span>
      </a>
    </AppHeader>
    <div :class="myClass">
      <div class="album-body-head">
        <p class="album-text-des">アルバムだよ</p>
        <CaButton size="S" @click="createAlbum">新規作成</CaButton>
      </div>
      <!-- リスト -->
      <AlbumList :items="albumItems" :editing="editing" @delete="deleteItem" @select="selectItem" />
    </div>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { openDialog } from '@/common/util';
import { Input } from 'camaleao-design/components/type';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AlbumList from './parts/AlbumList.vue';
import { AlbumItem } from './types/app';
import { albumItems } from './sample';

type State = {
  albumItems: AlbumItem[];
  editing: boolean;
};

export default Vue.extend({
  name: 'AppAlbumList',
  components: {
    AppHeader,
    AppFooter,
    AlbumList,
  },
  props: {},
  data(): State {
    return {
      albumItems,
      editing: false,
    };
  },
  computed: {
    myClass(): any {
      const klass: any = { 'album-body': true };

      if (this.editing) {
        klass['-editing'] = true;
      }
      return klass;
    },
  },
  mounted() {},
  methods: {
    selectItem() {},
    createAlbum() {
      const inputs: Input[] = [];
      inputs.push({
        name: 'album_name',
        value: '',
        placeholder: 'アルバム名',
        width: 'M',
        rules: 'required',
      });

      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: '新しいアルバムをつくるぞ',
        confirmText: 'よろしいヌ？',
        btnLabel: 'ヌ',
        onConfirm: () => {
          console.log('いえす');
        },
        target: $t,
        inputs,
      });
    },
    deleteItem(i: AlbumItem) {
      console.log('i', i);
      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: 'このアルバムを削除するぞ',
        confirmText: 'よろしいヌ？',
        btnLabel: 'ヌ',
        type: 'danger',
        onConfirm: () => {
          console.log('いえす');
        },
        target: $t,
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.album-body {
  overflow: scroll;
  padding: 20px;
  &.-editing {
    .album-body-head {
      button {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
}
.album-body-head {
  display: flex;
  align-items: center;
  line-height: 1;
  margin: 0 0 20px;
  color: var(--app-color-dark);
  button {
    margin-left: auto;
  }
}
.album-text-des {
  font-size: var(--fontsize-normal);
}
</style>
