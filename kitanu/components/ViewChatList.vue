<template>
  <section class="app view chatlist">
    <ViewHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
        @click="goTop"
      />
      <h1>おしゃべりヌ</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" @click.stop.prevent="$emit('addchat')"
          ><ion-icon name="add-outline" size="medium"
        /></a>
      </template>
    </ViewHeader>
    <ViewBody>
      <section>
        <ul v-if="chatrooms.length > 0" class="chat-list">
          <li v-for="(u, index) in chatrooms" :key="`member-${index}-${u.id}`">
            <a class="chat-item" @click="() => goChatDetail(u.id)">
              <UserIcon :url="u.members[0].iconurl" />
              <div class="chat-item-body">
                <h3>{{ u.title }}</h3>
                <p v-if="u.members[0].subtext">{{ u.members[0].subtext }}</p>
                <ul>
                  <li v-for="m in u.members" :key="`icon-${m.id}`">
                    <UserIcon :url="m.iconurl" size="S" />
                  </li>
                </ul>
              </div>
            </a>
          </li>
        </ul>
        <!-- notice-area -->
        <div v-else class="notice-area -gray nodata">
          <p class="text -white">
            <ion-icon name="rainy-outline" size="large" />
            <br />
            チャットはまだないよーだヌ
            <br />
            チャットをしてみよーヌ
          </p>
        </div>
      </section>
    </ViewBody>
    <ViewFooter />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
// import { openDialog } from '@/common/util';
import { TypeUser, TypeChatRoom } from './types/app';

type State = {};

export default Vue.extend({
  name: 'ViewChatList',
  components: {},
  props: {
    chatrooms: {
      default: () => [],
      type: Array as PropType<TypeChatRoom[]>,
    },
  },
  data(): State {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    goChatDetail(id: string) {
      this.$emit('selected', id);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.chatlist {
  background-color: #fff;
}
h2 {
  padding: 30px;
  font-size: var(--fontsize-medium);
  font-weight: normal;
  color: var(--app-color-dark);
  text-align: center;
}
.chat-list {
}
.chat-item {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  border-bottom: dotted 1px #aaa;
  ul {
    display: flex;
    align-items: center;
    margin-top: 4px;
  }
  li {
    margin-right: 4px;
  }
}
.chat-item-body {
  margin-left: 1em;
  color: var(--app-color-dark);
  h3 {
    font-size: var(--fontsize-normal);
  }
  p {
    font-size: var(--fontsize-small);
  }
}

.ca-input-editablelabel {
  width: 100%;
  text-align: center;
  font-size: var(--fontsize-medium);
  color: var(--app-color-dark);
}

.nodata {
  margin: 20px auto 30px;
}
</style>
