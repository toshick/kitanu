<template>
  <a :class="myClass" :disabled="disabled" @click.stop.prevent="onClick">
    <slot />
  </a>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { particleEffect } from '@/common/util';

type State = {};

export default Vue.extend({
  name: 'ParticleButton',
  components: {},
  props: {
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
      const klass: any = { 'btn-particle': true };

      return klass;
    },
  },
  mounted() {},
  methods: {
    onClick(e: Event) {
      const t = e.currentTarget as Element;
      particleEffect('#fff', t);
      this.$emit('click', e);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
a {
  display: inline-flex;
  align-items: center;
  position: relative;
  color: inherit;
  &[disabled] {
    opacity: 0.4;
  }
}
</style>
