<template>
  <div :class="myClass">
    <p v-if="text" class="postitem-text -top-left" v-html="$sanitize(text)"></p>
    <img v-if="imgurl" class="postitem-img lazy" :src="placeholderImg" :data-src="imgurl" alt="" />
    <p class="postitem-index">{{ postitem.sortindex }}</p>
    <!-- orderButtons -->
    <div v-if="changingOrder" class="orderButtons">
      <div class="orderButtons-body">
        <a class="btn-up" :disabled="first" @click.stop.prevent="up"><ion-icon name="chevron-up-outline" size="medium" /></a>
        <a class="btn-down" :disabled="last" @click.stop.prevent="down"><ion-icon name="chevron-down-outline" size="medium" /></a>
      </div>
    </div>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
/* eslint vue/no-v-html: 0 */
import Vue from 'vue';
import { PostItem } from '@/components/types/app';

type State = {};

export default Vue.extend({
  name: 'PostItem',
  components: {},
  props: {
    postitem: {
      type: Object as () => PostItem,
      default: null,
    },
    first: {
      type: Boolean,
      default: false,
    },
    last: {
      type: Boolean,
      default: false,
    },
    changingOrder: {
      type: Boolean,
      default: false,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { postitem: true };
      if (!this.imgurl) {
        klass['-textonly'] = true;
      } else {
        klass['-sirowaku'] = true;
      }
      if (this.first) {
        klass['-first'] = true;
      }
      if (this.last) {
        klass['-last'] = true;
      }

      return klass;
    },
    imgurl(): string {
      if (!this.postitem) return '';
      return this.postitem.imgurl || '';
    },
    text(): string {
      if (!this.postitem) return '';
      return this.postitem.text || '';
    },
  },
  mounted() {},
  methods: {
    up() {
      this.$emit('orderChange', { postitem: this.postitem, direction: 'up' });
    },
    down() {
      this.$emit('orderChange', { postitem: this.postitem, direction: 'down' });
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.postitem {
  position: relative;
  border-top: solid 1px #fff;
  &.-textonly {
    .postitem-text {
      position: static;
      padding: 25px 10px;
      max-width: 100%;
      font-size: var(--fontsize-small);
    }
  }
  &.-sirowaku {
    .postitem-text {
      background-color: #fff;
      padding: 4px 6px;
      border-radius: 4px;
      color: #333;
      text-shadow: none;
    }
  }
  &.-first,
  &.-last {
    .orderButtons-body {
      justify-content: center;
    }
  }
}
.postitem-text {
  position: absolute;

  font-size: 10px;

  &.-sirowaku {
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    color: #333;
    text-shadow: none;
  }
  &.-top-left {
    top: 10px;
    left: 10px;
    width: max-content;
    max-width: 94%;
  }
  &.-bottom-center {
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    width: max-content;
  }
  &.-bottom-left {
    bottom: 10px;
    left: 10px;
    width: max-content;
  }
  &.-bottom-right {
    bottom: 10px;
    right: 10px;
    width: max-content;
  }
}
.postitem-img {
  min-height: 280px;
}

.orderButtons {
  display: flex;
  align-items: center;
  background-color: rgba(#000, 0.3);
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
.orderButtons-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  width: 100px;
  a {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
    padding: 5px;
    color: #333;
    box-shadow: 0 0 2px 1px rgba(#000, 0.2);
    &[disabled] {
      display: none;
    }
  }
  ion-icon {
    color: inherit;
  }
}
.postitem-index {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: red;
  color: #fff;
  padding: 4px;
  font-size: 12px;
}
</style>
