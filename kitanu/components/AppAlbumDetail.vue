<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" @click.stop.prevent="$emit('close')"><ion-icon name="chevron-back" size="medium" /></a>
      <h1>2020.08.08</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header margin-left-auto" @click.stop.prevent="changingOrder = true"><ion-icon name="swap-vertical-outline" size="medium" /></a>
        <a class="btn-header" href=""><ion-icon name="log-in-outline" size="medium" /></a>
        <a class="btn-header" href=""><ion-icon name="walk-outline" size="medium" /></a>
      </template>
    </AppHeader>
    <AppBody>
      <div class="album-body">
        <transition-group class="postitems" name="flip-list" tag="ul">
          <li v-for="(p, index) in postItems" :key="p.text" class="postitems-item">
            <PostItem :postitem="p" :first="index == 0" :last="index == postItems.length - 1" @orderChange="onOrderChange" />
          </li>
        </transition-group>
      </div>
    </AppBody>
    <AppFooter mode="make" @menu="openMenu" @talk="startTalk" @submit="onSubmit" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { toast, sidemenu, openView } from '@/common/util';
import { FileItem, PostItem } from '@/components/types/app';
import { postStore } from '@/store';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import TextInputModal from './parts/TextInputModal.vue';

type State = {
  changingOrder: boolean;
};

export default Vue.extend({
  name: 'AppAlbumDetail',
  components: {
    AppHeader,
    AppFooter,
  },
  props: {},
  data(): State {
    return {
      changingOrder: false,
    };
  },
  computed: {
    postItems(): PostItem[] {
      return postStore.postitems;
    },
  },
  mounted() {
    postStore.FetchPost();
  },
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
    onSubmit(p: { fileItems: FileItem; text: string; reset: () => void }) {
      // const fileItems = p.fileItems;
      const text = p.text;
      console.log('text', text);

      this.showLoading(true);
      setTimeout(() => {
        toast('投稿したヌ');
        p.reset();
        this.showLoading(false);
      }, 1000);
    },
    onOrderChange(p: { postitem: PostItem; direction: string }) {
      postStore.ChangeOrder(p);
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

.flip-list-move {
  // transition: transform 1s;
  transition: 0.4s transform cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
