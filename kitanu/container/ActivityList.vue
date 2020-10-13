<template>
  <ViewActivityList @close="$emit('close')" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewActivityList from '@/components/ViewActivityList.vue';

type State = {};

export default Vue.extend({
  components: { ViewActivityList },
  data(): State {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
