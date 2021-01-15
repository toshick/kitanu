<template>
  <ViewTop
    :album-items="albumItems"
    :activities="activities"
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
import ActivityList from '@/container/ActivityList.vue';
import AboutThisApp from '@/components/description/AboutThisApp.vue';
import { albumStore, activityStore, userStore } from '@/store';
import { TypeAlbum, TypeUser, TypeActivity } from '@/components/types/apptypes';

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
    loginedUser(): TypeUser {
      return userStore.loginedUser;
    },
    activities(): TypeActivity[] {
      return activityStore.activities;
    },
  },
  watch: {
    loginedUser(newVal: TypeUser, oldVal: TypeUser) {
      if (!oldVal.id && newVal.id) {
        // this.fetch();
      }
    },
  },
  mounted() {},
  methods: {
    async fetch() {},
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
      userStore.FetchUsers({ ids: [this.loginedUser.id] });
      // firebaseStore.AddTry({ a: 1, b: 2, c: 3 });
    },
    openActivityList() {
      this.openModal({
        component: ActivityList,
        klass: ['view-activitylist'],
        transition: 'modal',
      });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
