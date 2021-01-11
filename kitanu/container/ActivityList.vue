<template>
  <ViewActivityList
    :activities="activities"
    @close="$emit('close')"
    @more="more"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewActivityList from '@/components/ViewActivityList.vue';
import { activityStore } from '@/store';
import { TypeActivity } from '@/components/types/apptypes';

type State = {};

export default Vue.extend({
  name: 'ActivityList',
  components: { ViewActivityList },
  data(): State {
    return {};
  },
  computed: {
    activities(): TypeActivity[] {
      return activityStore.activities;
    },
  },
  mounted() {},
  methods: {
    more() {
      console.log('more');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss"></style>
