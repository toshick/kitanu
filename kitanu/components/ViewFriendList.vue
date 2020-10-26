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
        <a class="btn-header" @click.stop.prevent="$emit('add-friend')"
          ><ion-icon name="add-outline" size="medium"
        /></a>
      </template>
    </ViewHeader>
    <ViewBody>
      <ul class="member-list">
        <li
          v-for="(u, index) in members"
          :key="`member-${index}-${u.username}`"
        >
          <UserIcon :url="u.iconurl" />
          <div class="member-label">
            <h3>{{ u.username }}</h3>
            <p v-if="u.subtext">{{ u.subtext }}</p>
          </div>
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
import { TypeUser } from './types/app';

type State = {};

export default Vue.extend({
  name: 'ViewFriendList',
  components: {},
  props: {
    members: {
      default: [],
      type: Array as PropType<TypeUser[]>,
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
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
}
.member-label {
  margin-left: 1em;
  color: var(--app-color-dark);
  h3 {
    font-size: var(--fontsize-medium);
  }
  p {
    font-size: var(--fontsize-small);
  }
}

.member-add {
  text-align: center;
}
.btn-add-member {
  // display: inline-flex;
  // align-items: center;
}
</style>
