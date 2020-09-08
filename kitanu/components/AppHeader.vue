<template>
  <header class="app-header">
    <slot></slot>
    <div class="app-header-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'AppHeader',
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
<style scoped lang="scss">
/* ------------------ 
 app header
 ------------------ */
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(var(--app-base-color) 60%, var(--app-base-color2) 0%);
  padding: 0px 15px 0 10px;
  height: 40px;
  border-bottom: solid 1px #ecde90;

  a {
    display: flex;
    align-items: center;
  }

  // .md {
  //   font-size: 20px;
  //   svg {
  //     color: #7e7020;
  //   }
  // }
  .chat-usericon {
    margin-right: 0.5em;
  }
  p {
    color: #fff;
    font-size: 12px;
  }
  h1 {
    color: #fff;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    letter-spacing: 0.2em;
  }
  .app-header-right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  /* -------------------- 
    Ionicons
  ---------------------*/
  .btn-header {
    margin-left: 10px;
    & > span {
      color: var(--button-label-color);
      font-size: var(--fontsize-normal);
    }
  }
  .btn-back {
    margin-left: 0px;
    margin-right: 10px;

    color: #fff;

    ion-icon {
      color: #fff;
    }
  }
  .btn-menu {
    margin-right: 10px;
  }
  .ca-badge {
    margin-left: 4px;
  }
}
</style>
