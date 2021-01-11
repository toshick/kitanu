<template>
  <ViewAlbumList
    :album-items="albumItems"
    @selected="onSelected"
    @create-album="createAlbum"
    @remove="startRemoveAlbum"
    @more="more"
    @description="description"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { openDialog, openView, toast } from '@/common/util';
import { Input } from 'camaleao-design/components/type';
import ViewAlbumList from '@/components/ViewAlbumList.vue';
import { albumStore, userStore } from '@/store';
import { TypeAlbum } from '@/components/types/apptypes';
import AboutAlbum from '@/components/description/AboutAlbum.vue';

type State = {
  page: number;
};

export default Vue.extend({
  components: { ViewAlbumList },
  data(): State {
    return {
      page: 0,
    };
  },
  computed: {
    albumItems(): TypeAlbum[] {
      return albumStore.albumItems;
    },
    loginUserID(): string {
      return userStore.loginedUser.id;
    },
  },
  mounted() {
    albumStore.RESET_ALBUM();
    this.fetch();
    if (document.URL.includes('?new')) {
      this.createAlbum();
    }
  },
  methods: {
    async fetch() {
      await albumStore.FetchAlbum({ userID: this.loginUserID });
      await userStore.FetchUsers([this.loginUserID]);
    },
    onSelected(i: TypeAlbum) {
      this.$router.push(`/albumlist/${i.id}`);
    },
    createAlbum() {
      const inputs: Input[] = [];
      inputs.push({
        name: 'albumName',
        value: '',
        placeholder: 'アルバム名',
        width: 'M',
        rules: 'required',
      });

      const $t = this.$el.closest('.mobileview') || null;
      openDialog({
        modalTitle: '新しいアルバムをつくるぞ',
        target: $t,
        compoParams: {
          inputs,
          confirmText: 'よろしいヌ？',
          btnLabel: 'ヌ',
          onConfirm: async ({ albumName }: { albumName: string }) => {
            this.showLoading(true);

            await albumStore.CreateAlbum({
              title: albumName,
              members: [this.loginUserID],
            });
            toast('アルバムを作成したヌ');
            this.showLoading(false);
          },
        },
      });
    },
    startRemoveAlbum(i: TypeAlbum) {
      const txt = i.text.length > 15 ? `${i.text.slice(0, 15)}...` : i.text;
      this.showConfirm(
        {
          title: 'アルバム削除',
          text: `「${txt}」<br>削除よろしいヌ？`,
          isDanger: true,
        },
        async () => {
          this.showLoading(true);
          await albumStore.RemoveAlbum(i.id);
          this.showLoading(false);
          toast('アルバムを削除したヌ');
        },
      );
    },
    description() {
      const $t = this.$el.closest('.mobileview') || null;
      openView({
        target: $t,
        component: AboutAlbum,
        klass: ['view-about'],
      });
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
