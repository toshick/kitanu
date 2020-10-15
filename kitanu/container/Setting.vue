<template>
  <ViewSetting @close="$emit('close')" />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
// import dayjs from 'dayjs';
// import { v4 as uuidv4 } from 'uuid';
// import { toast } from '@/common/util';
// import { TypeUser } from '@/components/types/app';
import ViewSetting from '@/components/ViewSetting.vue';
// import { postStore } from '@/store';

type State = {};

export default Vue.extend({
  components: { ViewSetting },
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
