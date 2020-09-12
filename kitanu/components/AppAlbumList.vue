<template>
  <section class="app view albumlist">
    <AppHeader>
      <h1>アルバムリスト</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" @click.stop="editing = !editing">
          <ion-icon v-if="!editing" name="restaurant-outline" size="medium" />
          <span v-else>完了</span>
        </a>
      </template>
    </AppHeader>
    <div :class="myClass">
      <div class="album-body-head">
        <p class="album-text-des">
          アルバムだヌ
          <a class="kitanu" @click="description"><ion-icon name="finger-print-outline"></ion-icon></a>
        </p>
        <CaButton size="S" @click="createAlbum">新規作成</CaButton>
      </div>
      <!-- リスト -->
      <AlbumList :items="albumItems" :editing="editing" @delete="deleteItem" @select="selectItem" />
    </div>
    <AppFooter mode="albamlist" @talk="toast('ほおええええ')" @menu="openMenu" @setting="showSetting" @album="changeView('albumlist')" @home="changeView('/')" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { openDialog, openView, toast } from '@/common/util';
import { Input } from 'camaleao-design/components/type';
import AppAlbumDetail from '@/components/AppAlbumDetail.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AlbumList from './parts/AlbumList.vue';
import AboutAlbum from './description/AboutAlbum.vue';
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
    selectItem() {
      this.drillDown({
        component: AppAlbumDetail,
      });
    },
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
        target: $t,
        compoParams: {
          inputs,
          confirmText: 'よろしいヌ？',
          btnLabel: 'ヌ',
          onConfirm: () => {
            toast('アルバムを作成したヌ', { target: $t });
          },
        },
      });
    },
    deleteItem(i: AlbumItem) {
      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: 'このアルバムを削除するぞ',
        target: $t,
        compoParams: {
          confirmText: 'よろしいヌ？',
          btnLabel: 'ヌ',
          onConfirm: () => {
            toast('アルバムを削除したヌ', { target: $t });
          },
          type: 'danger',
        },
      });
    },
    description() {
      const $t = this.$el.closest('.mobileview') || null;
      openView({
        target: $t,
        component: AboutAlbum,
        klass: ['view-about'],
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
