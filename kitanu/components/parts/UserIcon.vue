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
    shadow: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { usericon: true };

      let size = '-size-m';
      if (this.size && this.size === 'S') {
        size = '-size-s';
      } else if (this.size && this.size === 'L') {
        size = '-size-l';
      }
      klass[size] = true;
      if (!this.iconUrl || this.shadow) {
        klass['-shadow'] = true;
      }
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
  // background-color: #fff;
  overflow: hidden;
  border-radius: 50%;
  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &.-size-l {
    --size-l: 50px;
    width: var(--size-l);
    height: var(--size-l);

    .initialStamp {
      width: var(--size-l);
      height: var(--size-l);
      font-size: var(--fontsize-normal);
    }
  }
  &.-size-m {
    --size-m: 40px;
    width: var(--size-m);
    height: var(--size-m);

    .initialStamp {
      width: var(--size-m);
      height: var(--size-m);
    }
  }
  &.-size-s {
    --size-s: 26px;
    width: var(--size-s);
    height: var(--size-s);

    .initialStamp {
      width: var(--size-s);
      height: var(--size-s);
      font-size: 10px;
    }
  }
  &.-shadow {
    .initialStamp,
    img {
      box-shadow: 0 0 1px 1px rgba(#c8ab381a, 0.15);
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
  font-size: var(--fontsize-small);
  span {
    @include center();
    white-space: nowrap;
  }
}
</style>
