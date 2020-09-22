<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" @click.stop.prevent="goAlbum"><ion-icon name="chevron-back" size="medium" /></a>
      <h1>2020.08.08</h1>
      <!-- right -->
      <template v-slot:right>
        <div v-show="!editing" class="header-buttons">
          <a class="btn-header" @click.stop.prevent="changeOrder"><ion-icon name="swap-vertical-outline" size="medium" /></a>
          <a class="btn-header" href=""><ion-icon name="walk-outline" size="medium" /></a>
        </div>
        <div v-show="editing" class="header-buttons">
          <a class="btn-header" @click="() => finishEdit(true)"><span>保存</span></a>
          <a class="btn-header" @click="() => finishEdit(false)"><span>キャンセル</span></a>
        </div>
      </template>
    </AppHeader>
    <AppBody>
      <div class="album-body">
        <section class="album-des">
          <h1>みんなでピクニックにいってみようの巻</h1>
          <p>ここはせつめいです</p>
          <p>今年も春がやってきました。<br />そこでどこぞの公園でピクニックをすることにしましたよ。</p>
          <ul class="member-list">
            <li v-for="(u, index) in members" :key="`member-${index}-${u.username}`">
              <UserIcon :url="u.iconurl" size="S" />
            </li>
          </ul>
        </section>

        <transition-group class="postitems" name="flip-list" tag="ul">
          <li v-for="(p, index) in postItems" :key="`${p.text}-${p.date}`" class="postitems-item">
            <PostItem :postitem="p" :first="index == 0" :last="index == postItems.length - 1" :changing-order="changingOrder" @orderChange="onOrderChange" @remove="removePost" />
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
import { User } from './types/app';

type State = {
  changingOrder: boolean;
  members: User[];
};

const members: User[] = [];
members.push({ username: 'にゃんごろう', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'いつだってオレンジ' });
members.push({ username: 'カマキチ', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'そろそろキャンプしたいぞ' });

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
      members,
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
    removePost(postitem: PostItem) {
      postStore.REMOVE_POST(postitem.id);
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
  background-image: url('/img/subtle-dark-vertical.png');
}
.album-des {
  // margin: 20px;
  font-size: var(--fontsize-normal);
  color: #666;

  padding: 20px;
  // border-radius: 14px;
  // background: #ffffff;
  // box-shadow: -2px 2px 5px #eee, inset 2px -2px 5px #eee, 2px -2px 5px #eee, inset -2px 2px 5px #eee;
  h1 {
    font-size: var(--fontsize-medium);
    margin-bottom: 1em;
  }
}

.member-list {
  display: flex;
  margin-top: 0.5em;
  li {
    margin-right: 0.5em;
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
