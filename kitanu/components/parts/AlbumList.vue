<template>
  <section :class="myClass">
    <div
      v-for="(i, index) in albumitems"
      :key="`item${index}`"
      class="album-item"
    >
      <header>
        <h2>{{ i.dateDisp }}</h2>
        <p class="update">update: 5days ago</p>
      </header>
      <div class="album-item-cont">
        <div class="album-item-left">
          <div class="album-item-img">
            <a
              v-longpress="() => removeItem(i)"
              :class="{ 'btn-img': true, '-noimg': !i.imgurl }"
              @click.stop="selectItem(i)"
            >
              <img
                v-show="i.imgurl"
                class="lazy"
                :src="placeholderImg"
                :data-src="i.imgurl"
                alt=""
              />
            </a>
            <span class="btn-remove" href=""
              ><ion-icon name="trash"></ion-icon
            ></span>
          </div>
        </div>
        <div class="album-item-body">
          <p>{{ i.text }}</p>
          <p class="album-item-member">
            <UserIcon
              v-for="(u, index) in i.members"
              :key="`${index}-${u.iconurl}`"
              :url="u.iconurl"
              size="S"
              :username="u.name"
            />
          </p>
        </div>
      </div>
    </div>
    <!-- more -->
    <a class="btn-more" @click.stop.prevent="$emit('more')"
      ><ion-icon name="chevron-down-outline" size="large"
    /></a>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { TypeAlbumItem } from '../types/app';

type State = {};

export default Vue.extend({
  name: 'AlbumList',
  components: {},
  props: {
    albumitems: {
      default: () => [],
      type: Array as PropType<TypeAlbumItem[]>,
    },
    editing: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    return {};
  },
  computed: {
    myClass(): any {
      const klass: any = { albumlist: true };

      if (this.editing) {
        klass['-editing'] = true;
      }
      return klass;
    },
  },
  mounted() {},
  methods: {
    selectItem(i: TypeAlbumItem) {
      if (this.editing) {
        this.$emit('remove', i);
        return;
      }
      this.$emit('select', i);
    },
    removeItem(i: TypeAlbumItem) {
      this.$emit('remove', i);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
@import '@/assets/css/_mixins.scss';
.albumlist {
  &.-editing {
    img {
      filter: sepia(100%);
    }
    .btn-remove {
      display: flex;
    }
    .btn-more {
      display: none;
    }
  }
}
.album-item {
  margin: 0 0 20px;
  user-select: none;
  header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  h2 {
    margin-right: 0.5em;
    font-size: var(--fontsize-large);
    line-height: 1;
    color: var(--app-color-dark);
  }
}
.album-item-cont {
  display: flex;
}
.album-item-left {
  width: 120px;
  margin-right: 15px;
}
.album-item-img {
  position: relative;
}
.btn-img {
  position: relative;
  display: block;
  height: 80px;
  border-radius: 6px;
  flex-grow: 0;

  overflow: hidden;
  cursor: pointer;
  &.-noimg {
    background-color: #fff;
    &::before {
      content: 'NO IMG';
      display: block;
      color: #ddd;
      font-weight: bold;
      @include center();
      width: 100%;
      text-align: center;
    }
  }
}
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.album-item-body {
  flex: 1 0 0;
  color: var(--app-color-dark);

  p {
    font-size: var(--fontsize-small);
  }
}
.album-item-member {
  display: flex;
  margin: 10px 0 0;
  .usericon {
    margin-right: 6px;
  }
}

.btn-remove {
  display: none;
  align-items: center;
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ion-icon {
    position: relative;
    color: #aaa;
  }
  &::before {
    content: '';
    display: block;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.update {
  font-size: var(--fontsize-small);
  color: var(--app-color-dark);
}
</style>
