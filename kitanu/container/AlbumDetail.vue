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
import { TypeFileItem, TypePostItem, TypeUser } from '@/components/types/app';
import ViewAlbumDetail from '@/components/ViewAlbumDetail.vue';
import { postStore } from '@/store';

type State = {
  sending: boolean;
  members: TypeUser[];
};

const members: TypeUser[] = [];
members.push({
  id: '898808392',
  username: 'にゃんごろう',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'いつだってオレンジ',
});
members.push({
  id: '898808393',
  username: 'カマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'そろそろキャンプしたいぞ',
});

export default Vue.extend({
  components: { ViewAlbumDetail },
  data(): State {
    return {
      sending: false,
      members,
    };
  },
  computed: {
    postItems(): TypePostItem[] {
      return postStore.postitems;
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
      fileItem: TypeFileItem;
      text: string;
      reset: () => void;
    }) {
      this.showInlineLoading(true);
      const item: TypePostItem = {
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
    onOrderChange(p: { postitem: TypePostItem; direction: string }) {
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
