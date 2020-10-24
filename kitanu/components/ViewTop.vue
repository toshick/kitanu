<template>
  <section class="app view">
    <ViewHeader>
      <!-- <a class="btn-back" @click="openMenu"><ion-icon name="log-in-outline" size="medium" /></a> -->
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
        @click="openMenu"
      />
      <h1>キタキータヌ</h1>

      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" @click.stop.prevent="$emit('open-activitylist')"
          ><ion-icon name="bicycle-outline" size="medium" />
          <CaBadge :num="5" />
        </a>
        <a class="btn-header" @click.stop.prevent="showSetting"
          ><ion-icon name="restaurant-outline" size="medium"
        /></a>
      </template>
    </ViewHeader>
    <ViewBody class="top-body">
      <ChatInfo :infoitems="infoitems" />
      <section class="sec1">
        <img class="cloud1" src="/img/top/cloud1.png" alt="" />
        <img class="cloud2" src="/img/top/cloud2.png" alt="" />
        <p class="moon"></p>
        <div class="chara">
          <img
            data-src="/img/tanu/tanu.png"
            :src="placeholderImg"
            class="tanu lazy"
            alt="kitanu"
          />
          <img
            data-src="/img/top/tanu-title.png"
            :src="placeholderImg"
            class="tanu-title lazy"
            alt="kitanu-title"
          />
          <p>
            キータヌは世話焼きたぬき
            <a class="kitanu" @click="$emit('about')"
              ><ion-icon name="finger-print-outline"></ion-icon
            ></a>
            <br />
            キータヌに自分のアクティビティをみてもらおーぬ
          </p>
        </div>
      </section>
      <section class="sec2 activity">
        <header>
          <h2>最近のアルバム</h2>
          <CaButton size="S" @click="$emit('create-album')">新規作成</CaButton>
        </header>

        <!-- リスト -->
        <AlbumList
          :albumitems="albumItems"
          @remove="(i) => $emit('remove-album', i)"
          @select="(i) => $emit('select-album', i)"
          @more="$emit('more')"
        />
      </section>
    </ViewBody>
    <ViewFooter />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

import ChatInfo from '@/components/parts/ChatInfo.vue';
import AlbumList from '@/components/parts/AlbumList.vue';
import { TypeAlbumItem, TypeChatInfoItem } from '@/components/types/app';

type State = {};

export default Vue.extend({
  name: 'ViewTop',
  components: {
    AlbumList,
    ChatInfo,
  },
  props: {
    infoitems: {
      default: () => [],
      type: Array as PropType<TypeChatInfoItem[]>,
    },
    albumItems: {
      default: () => [],
      type: Array as PropType<TypeAlbumItem[]>,
    },
  },
  data(): State {
    return {};
  },
  mounted() {},
  methods: {},
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
  position: relative;
  z-index: 10;
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

$cloud-duration: 6s;
.cloud1 {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  animation-name: moveCloud1;
  animation-duration: $cloud-duration;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}
.cloud2 {
  position: absolute;
  top: 80px;
  left: 240px;
  width: 100px;
  animation-name: moveCloud2;
  animation-duration: $cloud-duration;
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
}
.moon {
  position: absolute;
  top: -10px;
  left: 260px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
}

@keyframes moveCloud1 {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(20px);
  }
}
@keyframes moveCloud2 {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-20px);
  }
}
</style>
