<template>
  <ViewPrivacyPolicy />
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import ViewPrivacyPolicy from '@/components/ViewPrivacyPolicy.vue';

export default Vue.extend({
  components: { ViewPrivacyPolicy },
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss">
.policy {
  background-color: #f4e694;
  height: 100vh;
  .ca-modalview-header {
    background-color: #d0b722;
  }
}
</style>
