<template>
  <div :class="myClass">
    <img
      class="lazy"
      :src="placeholderImg"
      data-src="https://avatars3.githubusercontent.com/u/6635142?s=460&v=4"
      alt=""
    />
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'UserIcon',
  components: {},
  props: {
    size: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { usericon: true };

      let size = '';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'M') {
        size = '-size-m';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;
      return klass;
    },
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.usericon {
  --size: 50px;
  img {
    display: block;
    width: var(--size);
    height: var(--size);
    border-radius: calc(var(--size) * 0.5);
  }
  &.-size-m {
    --size: 30px;
    img {
      display: block;
      width: var(--size);
      height: var(--size);
      border-radius: calc(var(--size) * 0.5);
    }
  }
  &.-size-s {
    --size: 20px;
    img {
      display: block;
      width: var(--size);
      height: var(--size);
      border-radius: calc(var(--size) * 0.5);
    }
  }
}
</style>
