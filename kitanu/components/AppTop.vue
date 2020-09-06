<template>
  <section class="app view">
    <AppHeader>
      <h1>キタキターヌ</h1>
      <a class="btn-header" @click="login"><ion-icon name="log-in-outline" size="medium" /></a>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" @click="showActivityList"><ion-icon name="leaf-outline" size="medium" /></a>
        <CaBadge :num="5" />
      </template>
    </AppHeader>
    <div class="top-body">
      <ChatInfo :infoitems="infoitems" />
      <section>
        <div class="chara">
          <img src="/img/top/tanu.png" class="tanu" alt="kitanu" />
          <img src="/img/top/tanu-title.png" class="tanu-title" alt="kitanu-title" />
          <p>
            キータヌは世話焼きたぬき
            <ion-icon name="heart"></ion-icon>
            <br />
            キータヌに自分のアクティビティをみてもらおーぬ
          </p>
        </div>
        <h2>最近のアクティビティ</h2>
        <!-- リスト -->
        <AlbumList :items="albumItems" />
      </section>
    </div>
    <AppFooter @talk="toast" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { openView, toast } from '@/common/util';
import ChatInfo, { ChatInfoItemType } from './ChatInfo.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AlbumList from './parts/AlbumList.vue';
import ActivityList from './parts/ActivityList.vue';
import { AlbumItem } from './types/app';
import { albumItems } from './sample';

type State = {
  albumItems: AlbumItem[];
};

export default Vue.extend({
  name: 'AppTop',
  components: {
    AppHeader,
    AppFooter,
    AlbumList,
    ChatInfo,
  },
  props: {
    infoitems: {
      default: () => [],
      type: Array as PropType<ChatInfoItemType[]>,
    },
  },
  data(): State {
    return {
      albumItems,
    };
  },
  mounted() {},
  methods: {
    showActivityList() {
      const $t = this.$el.closest('.mobileview') || null;
      openView({
        modalTitle: '最近の活動ーヌ',
        target: $t,
        component: ActivityList,
        klass: ['view-activitylist'],
      });
    },
    toast() {
      const $t = this.$el.closest('.mobileview') || null;
      toast('とーすとだよ', { target: $t });
    },
    login() {},
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.top-body {
  overflow: scroll;

  & > section {
    padding: 20px;
    background-color: #ddcd61;
    margin-top: 160px;
    background-image: url('/img/subtle-dark-vertical.png');
  }
}
.tanu {
  display: block;
  width: 157px;
  height: 181px;
  margin: 0 auto;
}
.tanu-title {
  display: block;
  width: 309px;
  height: 77px;
  margin: 10px auto 0;
}

.chara {
  margin-top: -100px;
  margin-bottom: 50px;
}

.chara {
  & > p {
    font-size: var(--fontsize-medium);
    color: #fff;
    margin: 20px auto;
    width: 260px;
  }
}
.top-body {
  position: relative;
}

h2 {
  color: var(--app-color-dark);
  font-size: var(--fontsize-medium);
  margin-bottom: 20px;
}
</style>
