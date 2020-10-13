<template>
  <div class="wrapper">
    <Nuxt />
    <!-- side menu -->
    <transition name="fade">
      <CaModal
        v-if="visibleMenu"
        class="-sidemenu"
        @close="visibleMenu = false"
      >
        <CaModalSideMenu>
          <ModalSideMenu />
        </CaModalSideMenu>
      </CaModal>
    </transition>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {
  visibleMenu: boolean;
};

export default Vue.extend({
  name: 'Default',
  components: {},

  props: {},

  data(): State {
    return {
      visibleMenu: false,
    };
  },
  created() {
    this.$nuxt.$on('openMenu', () => {
      this.visibleMenu = true;
    });
  },
  mounted() {},
  beforeDestroy() {
    this.$nuxt.$off('openMenu');
  },
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style></style>
