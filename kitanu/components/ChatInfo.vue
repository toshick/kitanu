<template>
  <div :class="myclass">
    <ul>
      <li v-for="(i, index) in infoitems" :key="`info-${index}`" class="chatinfo-item">
        <div class="chatinfo-item-body">
          <p>{{ i.text }}</p>
          <div class="chatinfo-item-unread"><CaBadge :num="5" /></div>
        </div>
        <p class="chatinfo-item-user">（{{ i.username }} {{ i.postdate }}）</p>
      </li>
    </ul>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';

type State = {
  urls: string[];
};

export type ChatInfoItemType = {
  text: string;
  username: string;
  postdate: string;
};

export default Vue.extend({
  name: 'ChatInfo',
  props: {
    infoitems: {
      default: [],
      type: Array as PropType<ChatInfoItemType[]>,
    },
  },
  data(): State {
    return {
      urls: [],
    };
  },
  computed: {
    myclass(): any {
      const ret: any = { chatinfo: true };

      return ret;
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    good() {},
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.chatinfo {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-x: scroll;
  ul {
    display: flex;
    margin: 20px 10px 10px;
    padding: 0 10px;
  }
}

.chatinfo-item-body {
  position: relative;
  display: flex;
  align-items: center;
  width: 200px;
  height: 40px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: var(--modalbody-header-shadow);
  margin-right: 10px;
  font-size: 12px;
  line-height: 1.3;
  padding: 6px 10px;
}

.chatinfo-item-body > p {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.chatinfo-item-user {
  font-size: 10px;
  padding: 4px 1em;
  text-align: right;
}

.chatinfo-item-unread {
  position: absolute;
  top: -3px;
  right: -3px;
}
</style>
