<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" @click.stop.prevent="goAlbum"><ion-icon name="chevron-back" size="medium" /></a>
      <h1>2020.08.08</h1>
      <!-- right -->
      <template v-slot:right>
        <div v-show="!editing" class="header-buttons">
          <a class="btn-header" @click.stop.prevent="changeOrder"><ion-icon name="swap-vertical-outline" size="medium" /></a>
          <a class="btn-header" @click.stop.prevent="goAlbumSetting"><ion-icon name="restaurant-outline" size="medium" /></a>
        </div>
        <div v-show="editing" class="header-buttons">
          <a class="btn-header" @click.stop.prevent="() => finishEdit(true)"><span>保存</span></a>
          <a class="btn-header" @click.stop.prevent="() => finishEdit(false)"><span>キャンセル</span></a>
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
        <!-- postitem list -->
        <transition-group class="postitem-list" tag="ul" name="flip-list">
          <li v-for="(p, index) in postItems" :key="`${p.id}`" class="postitems-item">
            <PostItem :postitem="p" :changing-order="changingOrder" :last="index === postItems.length - 1" @orderChange="onOrderChange" @remove="onRemovePost" />
          </li>
        </transition-group>
        <LoadingInline v-show="visbleInlineLoading" class="loading-inline" />
      </div>
    </AppBody>
    <AppFooter mode="make" @talk="startTalk" @submit="onSubmit" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { toast, openView, drillDown } from '@/common/util';
import mixinScrollview from '@/mixin/mxinScrollview';
import { FileItemType, PostItemType } from '@/components/types/app';
import { postStore } from '@/store';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AppAlbumSetting from './AppAlbumSetting.vue';
import TextInputModal from './parts/TextInputModal.vue';
import PostItem from './parts/PostItem.vue';
import LoadingInline from './parts/LoadingInline.vue';
import { UserType } from './types/app';

type State = {
  changingOrder: boolean;
  members: UserType[];
  sending: boolean;
};

const members: UserType[] = [];
members.push({ username: 'にゃんごろう', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'いつだってオレンジ' });
members.push({ username: 'カマキチ', iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4', subtext: 'そろそろキャンプしたいぞ' });

export default Vue.extend({
  name: 'AppAlbumDetail',
  components: {
    AppHeader,
    AppFooter,
    PostItem,
    LoadingInline,
  },
  mixins: [mixinScrollview],
  props: {},
  data(): State {
    return {
      changingOrder: false,
      members,
      sending: false,
    };
  },
  computed: {
    postItems(): PostItemType[] {
      return postStore.postitems;
    },
    editing(): boolean {
      if (this.changingOrder) {
        return true;
      }
      return false;
    },
    visbleInlineLoading(): boolean {
      return this.sending;
      // return true;
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
    async onSubmit(p: { fileItem: FileItemType; text: string; reset: () => void }) {
      this.showInlineLoading(true);

      const item: PostItemType = {
        id: uuidv4(),
        date: dayjs().format('YYYY.MM.DD HH:mm:ss'),
        text: p.text,
        fileItem: p.fileItem || null,
        // imgurl: 'https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/Camera_2020-07-24_18.38.38-1595583527442.jpeg',
      };
      await postStore.PostItem(item);
      toast('とーこうしたヌ');
      this.showInlineLoading(false);
      if (p.reset) p.reset();
    },
    changeOrder() {
      this.changingOrder = true;
      postStore.BACKUP_POST();
    },
    onOrderChange(p: { postitem: PostItemType; direction: string }) {
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
    onRemovePost(postitem: PostItemType) {
      postStore.REMOVE_POST(postitem.id);
    },
    goAlbumSetting() {
      this.drillDown({ component: AppAlbumSetting });
    },
    showInlineLoading(flg: boolean) {
      this.sending = flg;
      this.scrollBottom();
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.album-body {
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

.loading-inline {
  padding: 50px 0;
}

.flip-list-move {
  transition: 0.4s transform cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
