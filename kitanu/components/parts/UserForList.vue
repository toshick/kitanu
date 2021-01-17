<template>
  <div :class="myClass">
    <UserIcon :url="user.iconurl" :username="user.username" />
    <div class="userforlist-label">
      <p class="userforlist-username">{{ user.username }}</p>
      <p v-if="user.subtext" class="userforlist-subtext">{{ user.subtext }}</p>
    </div>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { TypeUserDisp } from '@/components/types/apptypes';

type State = {};

export default Vue.extend({
  name: 'UserForList',
  components: {},
  props: {
    user: {
      default: () => {},
      type: Object as PropType<TypeUserDisp>,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { userforlist: true };
      if (this.disabled) {
        klass['-disabled'] = true;
      }
      return klass;
    },
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
@import '@/assets/css/_mixins.scss';

.userforlist {
  display: flex;
  align-items: center;
  &.-disabled {
    .userforlist-username {
      opacity: 0.2;
    }
    .userforlist-subtext {
      opacity: 0.2;
    }
  }
}
.userforlist-label {
  color: var(--app-color-dark);
  margin-left: 10px;
}
.userforlist-username {
  font-size: var(--fontsize-medium);
  font-weight: bold;
}
.userforlist-subtext {
  font-size: var(--fontsize-small);
}
</style>
