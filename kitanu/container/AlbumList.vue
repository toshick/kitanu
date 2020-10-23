<template>
  <ViewAlbumList
    :album-items="albumItems"
    @selected="onSelected"
    @more="onMore"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewAlbumList from '@/components/ViewAlbumList.vue';
import { albumStore } from '@/store';
import { TypeAlbumItem } from '@/components/types/app';

type State = {};

export default Vue.extend({
  components: { ViewAlbumList },
  data(): State {
    return {};
  },
  computed: {
    albumItems(): TypeAlbumItem[] {
      return albumStore.albumItems;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      return albumStore.FetchPost();
    },
    onSelected(albumId: number) {
      console.log('selected', albumId);
      this.$router.push(`/albumlist/${albumId}`);
    },
    onMore() {
      console.log('onMore');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
