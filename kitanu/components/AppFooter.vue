<template>
  <footer class="app-footer">
    <div class="app-footer-icon"></div>
    <div class="app-footer-icon"></div>
    <div class="app-footer-icon"></div>
    <div class="app-footer-input">
      <input type="text" placeholder="書く" />
    </div>
    <div class="app-footer-icon"></div>
  </footer>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'AppFooter',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped>
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(var(--app-base-color) 50%, var(--app-base-color2) 0%);
  padding: 0 10px;
  height: 50px;
}

.app-footer-icon {
  --icon-size: 34px;
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: calc(var(--icon-size) / 2);
  background-color: #fff;
}

.app-footer-input input {
  height: 34px;
  border-radius: 4px;
  border: solid 1px var(--app-base-color);
  padding: 0 10px;
}
</style>
