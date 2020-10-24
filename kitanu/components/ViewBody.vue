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
  name: 'ViewBody',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { 'app-body': true };

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
