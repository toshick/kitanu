<template>
  <div :class="myClass">
    <slot></slot>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'AppBody',
  components: {},
  props: {
    klass: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { 'app-body': true };
      if (this.klass) {
        klass[this.klass] = true;
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
.app-body {
  overflow: scroll;
}
</style>
