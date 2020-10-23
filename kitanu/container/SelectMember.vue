<template>
  <ViewSelectMember
    :members="members"
    @close="$emit('close')"
    @save="(map) => $emit('save', map)"
  />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import ViewSelectMember from '@/components/ViewSelectMember.vue';
import { TypeUser } from '@/components/types/app';

type State = {};

export default Vue.extend({
  components: { ViewSelectMember },
  props: {
    members: {
      default: () => [],
      type: Array as PropType<TypeUser[]>,
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
