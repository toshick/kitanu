<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" @click.stop.prevent="$emit('close')"><ion-icon name="chevron-back" size="medium" /></a>
      <h1>2020.08.08</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header margin-left-auto" href=""><ion-icon name="heart-outline" size="medium" /></a>
        <a class="btn-header" href=""><ion-icon name="log-in-outline" size="medium" /></a>
        <a class="btn-header" href=""><ion-icon name="walk-outline" size="medium" /></a>
      </template>
    </AppHeader>
    <div class="album-body">
      <p class="album-text-des">みんなで東北へいってきたよ。<br />変な公園があったんだ。（グレイフォックスのすけ）</p>
      <div class="album-item">
        <p class="album-text -sirowaku -bottom-center">我々は不思議なキャットに遭遇した。</p>
        <img class="lazy" :src="placeholderImg" data-src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.00-1595582593445.jpeg" alt="" />
      </div>
      <p class="album-text-des">キャットはじっと何かをみつめているよ。（グレイフォックスのすけ）</p>
      <div class="album-item">
        <img class="lazy" :src="placeholderImg" data-src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.23.42-1595582635687.jpeg" alt="" />
        <p class="album-text -sirowaku -bottom-right">なにかがあるのかしら。</p>
      </div>
      <div class="album-item">
        <img class="lazy" :src="placeholderImg" data-src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-08-01_13.04.25-1596254669373.jpeg" alt="" />
        <p class="album-text -sirowaku -bottom-left">なんか綿菓子うっている。</p>
      </div>
      <div class="album-item">
        <img class="lazy" :src="placeholderImg" data-src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.38.38-1595583527442.jpeg" alt="" />
        <p class="album-text -sirowaku -bottom-left">せかいのとしっくです。こちらは謎の池を発見せり</p>
      </div>
    </div>
    <AppFooter mode="make" @menu="openMenu" @talk="startTalk" @submit="onSubmit" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { sidemenu, openView } from '@/common/util';
import { FileItem } from '@/components/types/app';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import UserIcon from './parts/UserIcon.vue';
import TextInputModal from './parts/TextInputModal.vue';

type State = {};

export default Vue.extend({
  name: 'AppAlbum',
  components: {
    AppHeader,
    AppFooter,
    UserIcon,
  },
  props: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    openMenu() {
      const $t = this.$el.closest('.mobileview') || null;
      sidemenu({
        target: $t,
      });
    },
    startTalk() {
      const $t = this.$el.closest('.mobileview') || null;

      openView({
        target: $t,
        component: TextInputModal,
        klass: ['view-textinput'],
        compoParams: {
          onConfirm: () => {
            console.log('いえすだよ');
          },
        },
      });
    },
    onSubmit(p: { fileItems: FileItem; text: string }) {
      const fileItems = p.fileItems;
      const text = p.text;
      console.log(text, fileItems);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.album-body {
  overflow: scroll;
  background-color: #fff;
}
.album-item {
  position: relative;
  border-top: solid 1px #fff;
}
.album-text-des {
  font-size: 12px;
  padding: 25px 10px;
}
.album-text {
  position: absolute;

  font-size: 12px;
  color: #fff;
  text-shadow: 0 0 1px #333;
  &.-sirowaku {
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    color: #333;
    text-shadow: none;
  }
  &.-bottom-center {
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    width: max-content;
  }
  &.-bottom-left {
    bottom: 10px;
    left: 10px;
    width: max-content;
  }
  &.-bottom-right {
    bottom: 10px;
    right: 10px;
    width: max-content;
  }
}
</style>
