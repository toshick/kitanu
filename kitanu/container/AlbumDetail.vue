<template>
  <ViewAlbumDetail
    :sending="sending"
    :members="members"
    :post-items="postItems"
    @addPost="onAddPost"
    @startOrderChange="onStartOrderChange"
    @orderChange="onOrderChange"
    @cancelChange="onCancelChange"
    @removePost="onRemovePost"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/common/util';
import { TypeFile, TypeAlbumPost, TypeUser } from '@/components/types/apptypes';
import ViewAlbumDetail from '@/components/ViewAlbumDetail.vue';
import { postStore } from '@/store';
import { members } from '@/mock/mockdata';

type State = {
  sending: boolean;
  members: TypeUser[];
};

export default Vue.extend({
  components: { ViewAlbumDetail },
  data(): State {
    return {
      sending: false,
      members,
    };
  },
  computed: {
    postItems(): TypeAlbumPost[] {
      // return postStore.postitems;
      return [];
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      return postStore.FetchPost();
    },
    async onAddPost(p: {
      fileItem: TypeFile;
      text: string;
      reset: () => void;
    }) {
      this.showInlineLoading(true);
      const item: TypeAlbumPost = {
        id: uuidv4(),
        date: dayjs().format('YYYY.MM.DD HH:mm:ss'),
        text: p.text,
        fileItem: p.fileItem || null,
      };
      await postStore.PostItem(item);
      toast('とーこうしたヌ');
      this.showInlineLoading(false);
      if (p.reset) p.reset();
    },
    showInlineLoading(flg: boolean) {
      this.sending = flg;
      this.scrollBottom();
    },
    onStartOrderChange() {
      postStore.BACKUP_POST();
    },
    onOrderChange(p: { postitem: TypeAlbumPost; direction: string }) {
      postStore.ChangeOrder(p);
    },
    onCancelChange() {
      postStore.REVERT_POST();
    },
    onRemovePost(postID: string) {
      postStore.REMOVE_POST(postID);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
