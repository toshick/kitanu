<template>
  <section class="app view albumlist">
    <AppHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
        @click="openMenu"
      />
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
          <a
            class="btn-des"
            :disabled="editing"
            @click.stop.prevent="description"
            ><ion-icon name="finger-print-outline"></ion-icon
          ></a>
        </p>
        <CaButton size="S" @click="createAlbum">新規作成</CaButton>
      </div>
      <!-- リスト -->
      <AlbumList
        :items="albumItems"
        :editing="editing"
        @remove="startRemoveAlbum"
        @select="selectItem"
      />
    </div>
    <AppFooter
      @talk="toast('ほおええええ')"
      @menu="openMenu"
      @setting="showSetting"
      @album="changeView('albumlist')"
      @home="changeView('/')"
    />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { openDialog, openView, toast } from '@/common/util';
import { Input } from 'camaleao-design/components/type';
import AlbumList from './parts/AlbumList.vue';
import AboutAlbum from './description/AboutAlbum.vue';
import { AlbumItemType } from './types/app';
import { albumItems } from './sample';

type State = {
  albumItems: AlbumItemType[];
  editing: boolean;
};

export default Vue.extend({
  name: 'AppAlbumList',
  components: {
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
      this.$router.push('albumdetail');
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
    startRemoveAlbum(i: AlbumItemType) {
      const txt = i.text.length > 15 ? `${i.text.slice(0, 15)}...` : i.text;
      this.showConfirm(
        {
          title: 'アルバム削除',
          text: `「${txt}」<br><br>削除よろしいヌ？`,
          isDanger: true,
        },
        () => {
          console.log('いええす', { ...i });

          this.showLoading(true);
          setTimeout(() => {
            toast('アルバムを削除したヌ');
            this.showLoading(false);
          }, 3000);
        },
      );
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
    .btn-des {
      opacity: 0.2;
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
