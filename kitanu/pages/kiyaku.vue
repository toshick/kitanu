<template>
  <ViewKiyaku />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewKiyaku from '@/components/ViewKiyaku.vue';

export default Vue.extend({
  components: { ViewKiyaku },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss">
.kiyaku {
  background-color: #f4e694;
  .ca-modalview-header {
    background-color: #d0b722;
  }
}
</style>
