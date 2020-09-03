<template>
  <section class="app view">
    <AppHeader>
      <a class="btn-back" href=""><ion-icon name="chevron-back" size="medium" /></a>
      <img class="chat-usericon" src="https://storage.googleapis.com/toshickcom-a7f98.appspot.com/upload_images/%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8-1595803900938.jpeg" alt="" />
      <p class="chat-username">{{ title }}</p>
      <a class="btn-header margin-left-auto" href=""><ion-icon name="log-in" size="medium" /></a>
      <a class="btn-header" href=""><ion-icon name="log-in-outline" size="medium" /></a>
    </AppHeader>

    <div class="chat-body">
      <ChatInfo :infoitems="infoitems" />
      <ul>
        <li v-for="(i, index) in chatitems" :key="`${index}-${i.text}`">
          <ChatComment :myitem="i" :opposite="index % 2 === 1" />
        </li>
      </ul>
    </div>

    <AppFooter />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import ChatComment, { ChatCommentType } from './ChatComment.vue';
import ChatInfo, { ChatInfoItemType } from './ChatInfo.vue';
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';

type State = {};

export default Vue.extend({
  name: 'Chat',
  components: {
    ChatComment,
    ChatInfo,
    AppFooter,
    AppHeader,
  },
  props: {
    title: {
      default: 'むだい',
      type: String,
    },
    chatitems: {
      default: () => [],
      type: Array as PropType<ChatCommentType[]>,
    },
    infoitems: {
      default: () => [],
      type: Array as PropType<ChatInfoItemType[]>,
    },
  },
  data(): State {
    return {
      // items: items.concat(items),
      // infoitems,
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.chat-body {
  overflow: scroll;
}
.chat-body ul {
  padding: 10px 0 30px;
}
</style>
