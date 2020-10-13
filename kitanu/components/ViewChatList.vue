<template>
  <section class="app view chatlist">
    <ViewHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
        @click="openMenu"
      />
      <h1>おしゃべりヌ</h1>
      <!-- right -->
      <template v-slot:right>
        <!-- <a href=""><ion-icon name="restaurant-outline" size="medium" /></a> -->
      </template>
    </ViewHeader>
    <ViewBody>
      <ul class="chat-list">
        <li
          v-for="(u, index) in members"
          :key="`member-${index}-${u.username}`"
        >
          <a class="chat-item" @click="() => goChatDetail()">
            <UserIcon :url="u.iconurl" />
            <div class="chat-item-body">
              <h3>{{ u.username }}</h3>
              <p v-if="u.subtext">{{ u.subtext }}</p>
            </div>
          </a>
        </li>
      </ul>
    </ViewBody>
    <ViewFooter
      @talk="toast('ほおええええ')"
      @menu="openMenu"
      @setting="showSetting"
      @home="changeView('/')"
    />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import CaModalPG from 'camaleao-design/components/CaModalPG';
// import { openDialog } from '@/common/util';
import { UserType } from './types/app';

type State = {};

export default Vue.extend({
  name: 'ViewChatList',
  components: {},
  props: {
    members: {
      default: [],
      type: Array as PropType<UserType[]>,
    },
  },
  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    goChatDetail() {
      this.$router.push('/chatdetail/444');
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
.member-add {
  text-align: center;
}
.btn-add-member {
  // display: inline-flex;
  // align-items: center;
}
</style>
