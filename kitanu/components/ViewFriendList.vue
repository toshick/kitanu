<template>
  <section class="app view">
    <ViewHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
        @click="goTop"
      />
      <h1>トモダチ</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" @click.stop.prevent="$emit('select-friend')"
          ><ion-icon name="add-outline" size="medium"
        /></a>
        <a class="btn-header" @click.stop.prevent="$emit('copy-friend-link')"
          ><ion-icon name="attach-outline" size="medium"
        /></a>
      </template>
    </ViewHeader>
    <ViewBody>
      <ul class="member-list">
        <li
          v-for="(u, index) in members"
          :key="`member-${index}-${u.username}`"
        >
          <UserForList :user="u" :selected="true" />
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
import { TypeUserDisp } from '@/components/types/apptypes';

type State = {};

export default Vue.extend({
  name: 'ViewFriendList',
  components: {},
  props: {
    members: {
      default: () => [],
      type: Array as PropType<TypeUserDisp[]>,
    },
  },
  data(): State {
    return {};
  },
  mounted() {},
  methods: {
    addMember() {},
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.setting-body {
  padding: 20px;
  color: var(--app-color-dark);
}
h2 {
  padding: 30px;
  font-size: var(--fontsize-medium);
  font-weight: normal;
  color: var(--app-color-dark);
  text-align: center;
}
.member-list {
  padding: 20px;
  li {
    padding: 5px 0;
  }
}
.member-add {
  text-align: center;
}
</style>
