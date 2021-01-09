<template>
  <ViewTop
    :album-items="albumItems"
    @about="about"
    @create-album="createAlbum"
    @open-activitylist="openActivityList"
    @select-album="selectItem"
    @more="more"
    @kitanu="goSignup"
    @debug="debug"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
// import { toast,  } from '@/common/util';
import ViewTop from '@/components/ViewTop.vue';
import AboutThisApp from '@/components/description/AboutThisApp.vue';
import { albumStore, firebaseStore, userStore } from '@/store';
import { TypeAlbum } from '@/components/types/apptypestypes';

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
    albumItems(): TypeAlbum[] {
      return albumStore.albumItems;
    },
  },
  mounted() {
    albumStore.RESET_ALBUM();
    this.fetch();
  },
  methods: {
    fetch() {
      return albumStore.FetchAlbum({ userID: userStore.loginedUser.id });
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
    selectItem(i: TypeAlbum) {
      this.$router.push(`albumlist/${i.id}`);
    },
    more() {
      this.page += 1;
      this.fetch();
    },
    debug() {
      firebaseStore.AddPostImg({ a: 1, b: 2, c: 3 });
      // firebaseStore.AddTry({ a: 1, b: 2, c: 3 });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
