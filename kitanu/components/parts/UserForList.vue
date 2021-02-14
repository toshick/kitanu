<template>
  <div :class="myClass">
    <UserIcon
      class="myicon"
      :url="user.iconurl"
      :username="username"
      :shadow="true"
    />
    <div class="userforlist-label">
      <p class="userforlist-username">
        {{ username }}
      </p>
      <p v-if="subtext" class="userforlist-subtext">{{ subtext }}</p>
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
      required: true,
      type: Object as PropType<TypeUserDisp>,
    },
    selected: {
      default: false,
      type: Boolean,
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
      if (this.selected) {
        klass['-selected'] = true;
      }
      if (this.disabled) {
        klass['-disabled'] = true;
      }
      return klass;
    },
    username(): string {
      return this.user.username;
    },
    subtext(): string {
      return this.user.subtext;
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
  &.-selected {
    .myicon {
      transform: scale(1, 1);
      opacity: 1;
    }
    .userforlist-username {
      opacity: 1;
    }
  }
  &.-disabled {
    pointer-events: none;
  }
}
.myicon {
  transform: scale(0.8, 0.8);
  opacity: 0.3;
  transition: all 100ms ease;
}

.userforlist-label {
  color: var(--app-color-dark);
  margin-left: 10px;
}
.userforlist-username {
  font-size: var(--fontsize-basic);
  opacity: 0.3;
}
.userforlist-subtext {
  font-size: var(--fontsize-small);
  color: var(--app-base-color2);
  margin-top: 4px;
}
</style>
