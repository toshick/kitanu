<template>
  <section class="app view">
    <AppHeader>
      <!-- <a class="btn-back" @click="openMenu"><ion-icon name="log-in-outline" size="medium" /></a> -->
      <img src="/img/top/tanu-white.png" class="tanu-header" alt="kitanu-header" @click="openMenu" />
      <h1>キタキータヌ</h1>

      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" @click="showSetting"><ion-icon name="restaurant-outline" size="medium" /></a>
        <!-- <CaBadge :num="5" /> -->
      </template>
    </AppHeader>

    <div class="top-body">
      <ChatInfo :infoitems="infoitems" />
      <section class="sec1">
        <div class="chara">
          <img data-src="/img/top/tanu.png" :src="placeholderImg" class="tanu lazy" alt="kitanu" />
          <img data-src="/img/top/tanu-title.png" :src="placeholderImg" class="tanu-title lazy" alt="kitanu-title" />
          <p>
            キータヌは世話焼きたぬき
            <a class="kitanu" @click="about"><ion-icon name="finger-print-outline"></ion-icon></a>
            <br />
            キータヌに自分のアクティビティをみてもらおーぬ
          </p>
        </div>
      </section>
      <section class="sec2 activity">
        <header>
          <h2>最近のアクティビティ</h2>
          <CaButton size="S" @click="createAlbum">新規作成</CaButton>
        </header>

        <!-- リスト -->
        <AlbumList :items="albumItems" @remove="startRemoveAlbum" @select="selectItem" />
      </section>
    </div>

    <AppFooter @talk="confirm" @menu="openMenu" @activity="showActivityList" @album="changeView('albumlist')" />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { toast, particleEffect } from '@/common/util';
import { Input } from 'camaleao-design/components/type';
import AppAlbumDetail from '@/components/AppAlbumDetail.vue';
import ChatInfo, { ChatInfoItemType } from './ChatInfo.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import AlbumList from './parts/AlbumList.vue';
import ActivityList from './parts/ActivityList.vue';
import AboutThisApp from './description/AboutThisApp.vue';
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
      this.openModal({
        component: ActivityList,
        klass: ['view-activitylist'],
        transition: 'modal',
      });
    },

    about() {
      this.openView({
        component: AboutThisApp,
        klass: ['view-about'],
      });
    },
    confirm() {
      this.showConfirm({ title: 'にゃお', text: 'ニャーーーゴ' }, () => {
        console.log('いええす');
      });
    },
    showParticle() {
      particleEffect();
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

      this.openDialog({
        modalTitle: '新しいアルバムをつくるぞ',
        compoParams: {
          inputs,
          confirmText: 'よろしいヌ？',
          btnLabel: 'ヌ',
          onConfirm: () => {
            toast('アルバムを作成したヌ');
          },
        },
      });
    },
    startRemoveAlbum(i: AlbumItem) {
      const txt = i.text.length > 15 ? `${i.text.slice(0, 15)}...` : i.text;
      this.showConfirm({ title: 'アルバム削除', text: `「${txt}」<br><br>削除よろしいヌ？`, isDanger: true }, () => {
        console.log('いええす', { ...i });

        this.showLoading(true);
        setTimeout(() => {
          toast('アルバムを削除したヌ');
          this.showLoading(false);
        }, 3000);
      });
    },
    selectItem() {
      // this.drillDown({
      //   component: AppAlbumDetail,
      // });
      this.$router.push('albumdetail');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.top-body {
  overflow: scroll;

  & > section {
    padding: 10px 20px;
    background-color: #ddcd61;
    background-image: url('/img/subtle-dark-vertical.png');
  }
}
.sec1 {
  margin-top: 160px;
}
.activity {
  header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  h2 {
    color: var(--app-color-dark);
    font-size: var(--fontsize-medium);
    margin-right: auto;
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
  width: 293px;
  height: 77px;
  margin: 10px auto 0;
}

.chara {
  margin-top: -100px;
  margin-bottom: 0px;
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

.myparticle {
  position: absolute;
  top: 50%;
  left: 50%;
  border: solid 1px #ff0000;
}
</style>
