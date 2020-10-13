<template>
  <ViewSelectMember :members="members" @close="$emit('close')" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import ViewSelectMember from '@/components/ViewSelectMember.vue';
import { UserType } from '@/components/types/app';

type State = {};

export default Vue.extend({
  components: { ViewSelectMember },
  props: {
    members: {
      default: () => [],
      type: Array as PropType<UserType[]>,
    },
  },
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
