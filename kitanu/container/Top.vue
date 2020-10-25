<template>
  <ViewTop
    :album-items="albumItems"
    @about="about"
    @create-album="createAlbum"
    @open-activitylist="openActivityList"
    @select-album="selectItem"
    @more="more"
    @kitanu="goSignup"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
// import { toast,  } from '@/common/util';
import ViewTop from '@/components/ViewTop.vue';
import AboutThisApp from '@/components/description/AboutThisApp.vue';
import { albumStore } from '@/store';
import { TypeAlbumItem } from '@/components/types/app';

type State = {
  page: number;
};

export default Vue.extend({
  components: { ViewTop },
  data(): State {
    return {
      page: 0,
    };
  },
  computed: {
    albumItems(): TypeAlbumItem[] {
      return albumStore.albumItems;
    },
  },
  mounted() {
    albumStore.RESET_ALBUM();
    this.fetch();
  },
  methods: {
    fetch() {
      return albumStore.FetchAlbum(this.page);
    },
    about() {
      this.openView({
        component: AboutThisApp,
        klass: ['view-about'],
      });
    },
    // confirm() {
    //   this.showConfirm({ title: 'にゃお', text: 'ニャーーーゴ' }, () => {
    //     console.log('いええす');
    //   });
    // },
    createAlbum() {
      this.$router.push('/albumlist/?new');
    },
    selectItem(i: TypeAlbumItem) {
      this.$router.push(`albumlist/${i.id}`);
    },
    more() {
      this.page += 1;
      this.fetch();
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
