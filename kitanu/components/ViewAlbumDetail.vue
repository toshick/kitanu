<template>
  <section class="app view">
    <ViewHeader>
      <a class="btn-back" @click.stop.prevent="goAlbum"
        ><ion-icon name="chevron-back" size="medium"
      /></a>
      <h1>2020.08.08</h1>
      <!-- right -->
      <template v-slot:right>
        <div v-show="!editing" class="header-buttons">
          <a class="btn-header" @click.stop.prevent="startOrderChange"
            ><ion-icon name="swap-vertical-outline" size="medium"
          /></a>
          <a class="btn-header" @click.stop.prevent="goAlbumSetting"
            ><ion-icon name="restaurant-outline" size="medium"
          /></a>
        </div>
        <div v-show="editing" class="header-buttons">
          <a class="btn-header" @click.stop.prevent="() => finishEdit(true)"
            ><span>保存</span></a
          >
          <a class="btn-header" @click.stop.prevent="() => finishEdit(false)"
            ><span>キャンセル</span></a
          >
        </div>
      </template>
    </ViewHeader>
    <ViewBody>
      <div class="album-body">
        <section class="album-des">
          <h1>みんなでピクニックにいってみようの巻</h1>
          <p>ここはせつめいです</p>
          <p>
            今年も春がやってきました。<br />そこでどこぞの公園でピクニックをすることにしましたよ。
          </p>
          <ul class="member-list">
            <li
              v-for="(u, index) in members"
              :key="`member-${index}-${u.username}`"
            >
              <UserIcon :url="u.iconurl" size="S" />
            </li>
          </ul>
        </section>
        <!-- postitem list -->
        <transition-group class="postitem-list" tag="ul" name="flip-list">
          <li
            v-for="(p, index) in postItems"
            :key="`${p.id}`"
            class="postitems-item"
          >
            <PostItem
              :postitem="p"
              :changing-order="changingOrder"
              :last="index === postItems.length - 1"
              @orderChange="onOrderChange"
              @remove="onRemovePost"
            />
          </li>
        </transition-group>
        <LoadingInline v-show="sending" class="loading-inline" />
      </div>
    </ViewBody>
    <ViewFooter mode="make" @talk="startTalk" @submit="onSubmit" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import dayjs from 'dayjs';
import { toast, openView } from '@/common/util';
import mixinScrollview from '@/mixin/mxinScrollview';
import { TypeUser, TypePostItem } from '@/components/types/app';
// import AppAlbumSetting from './AppAlbumSetting.vue';
import TextInputModal from './parts/TextInputModal.vue';
import PostItem from './parts/PostItem.vue';
import LoadingInline from './parts/LoadingInline.vue';

type State = {
  changingOrder: boolean;
};

export default Vue.extend({
  name: 'ViewAlbumDetail',
  components: {
    PostItem,
    LoadingInline,
  },
  mixins: [mixinScrollview],
  props: {
    sending: {
      default: false,
      type: Boolean,
    },
    members: {
      default: [],
      type: Array as PropType<TypeUser[]>,
    },
    postItems: {
      default: [],
      type: Array as PropType<TypePostItem[]>,
    },
  },
  data(): State {
    return {
      changingOrder: false,
    };
  },
  computed: {
    editing(): boolean {
      if (this.changingOrder) {
        return true;
      }
      return false;
    },
  },
  mounted() {},
  methods: {
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
    onSubmit(p: any) {
      this.$emit('addPost', p);
    },
    startOrderChange() {
      this.changingOrder = true;
      this.$emit('startOrderChange');
    },
    onOrderChange(p: any) {
      this.$emit('orderChange', p);
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
      this.$emit('cancelChange');
      this.changingOrder = false;
    },
    onRemovePost(postitem: TypePostItem) {
      this.$emit('removePost', postitem.id);
    },
    goAlbumSetting() {
      // this.drillDown({ component: AppAlbumSetting });
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
