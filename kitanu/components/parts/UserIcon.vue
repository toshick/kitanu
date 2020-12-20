<template>
  <div :class="myClass">
    <img
      v-if="iconUrl"
      class="lazy"
      :src="placeholderImg"
      :data-src="iconUrl"
      alt=""
    />
    <p v-else class="initialStamp">
      <span>{{ initialStr }}</span>
    </p>
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
    url: {
      default: '',
      type: String,
    },
    username: {
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
    iconUrl(): string {
      return this.url;
    },
    initialStr(): string {
      return this.username.slice(0, 2);
    },
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
@import '@/assets/css/_mixins.scss';
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
.initialStamp {
  --size: 50px;
  position: relative;
  width: var(--size);
  height: var(--size);
  background-color: #fff;
  border-radius: 50%;

  span {
    @include center();
    font-size: var(--fontsize-medium);
    white-space: nowrap;
  }
}
</style>
