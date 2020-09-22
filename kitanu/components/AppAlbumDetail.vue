<template>
  <section class="app view">
    <AppHeader>
      <!-- <a class="btn-back" @click.stop.prevent="$emit('close')"><ion-icon name="chevron-back" size="medium" /></a> -->
      <img src="/img/top/tanu-white.png" class="tanu-header" alt="kitanu-header" @click="openMenu" />
      <h1>2020.08.08</h1>
      <!-- right -->
      <template v-slot:right>
        <div v-show="!editing" class="header-buttons">
          <a class="btn-header" @click.stop.prevent="changeOrder"><ion-icon name="swap-vertical-outline" size="medium" /></a>
          <a class="btn-header" href=""><ion-icon name="walk-outline" size="medium" /></a>
        </div>
        <div v-show="editing" class="header-buttons">
          <a class="btn-header" @click="() => finishEdit(true)"><span>完了</span></a>
          <a class="btn-header" @click="() => finishEdit(false)"><span>キャンセル</span></a>
        </div>
      </template>
    </AppHeader>
    <AppBody>
      <div class="album-body">
        <transition-group class="postitems" name="flip-list" tag="ul">
          <li v-for="(p, index) in postItems" :key="`${p.text}-${p.date}`" class="postitems-item">
            <PostItem :postitem="p" :first="index == 0" :last="index == postItems.length - 1" :changing-order="changingOrder" @orderChange="onOrderChange" />
          </li>
        </transition-group>
      </div>
    </AppBody>
    <AppFooter mode="make" @talk="startTalk" @submit="onSubmit" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { toast, openView } from '@/common/util';
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
    editing(): boolean {
      if (this.changingOrder) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      return postStore.FetchPost();
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
        toast('とーこうしたヌ');
        p.reset();
        this.showLoading(false);
      }, 1000);
    },
    changeOrder() {
      this.changingOrder = true;
      postStore.BACKUP_POST();
    },
    onOrderChange(p: { postitem: PostItem; direction: string }) {
      postStore.ChangeOrder(p);
    },
    finishEdit(save: boolean) {
      if (this.changingOrder) {
        if (save) {
          this.saveChange();
        } else {
          this.cancelChange();
        }
      }
    },
    saveChange() {
      this.showLoading(true);
      setTimeout(() => {
        toast('ほぞんしたヌ');
        this.changingOrder = false;
        this.showLoading(false);
      }, 1000);
    },
    cancelChange() {
      postStore.REVERT_POST();
      this.changingOrder = false;
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

.header-buttons {
  display: flex;
  align-items: center;
}

.flip-list-move {
  transition: 0.4s transform cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
