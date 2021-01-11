<template>
  <section class="app view albumlist">
    <ViewHeader>
      <img
        src="/img/top/tanu-white.png"
        class="tanu-header"
        alt="kitanu-header"
        @click="goTop"
      />
      <h1>アルバムリスト</h1>
      <!-- right -->
      <template v-slot:right>
        <!-- <a class="btn-header" @click.stop="editing = !editing">
          <ion-icon v-if="!editing" name="restaurant-outline" size="medium" />
          <span v-else>完了</span>
        </a> -->
      </template>
    </ViewHeader>
    <div :class="myClass">
      <div class="album-body-head">
        <p class="album-text-des">
          アルバムだヌ
          <a
            class="btn-des"
            :disabled="editing"
            @click.stop.prevent="$emit('description')"
            ><ion-icon name="finger-print-outline"></ion-icon
          ></a>
        </p>
        <CaButton size="S" @click="$emit('create-album')">新規作成</CaButton>
      </div>
      <!-- リスト -->
      <AlbumList
        :albumitems="albumItems"
        @remove="(i) => $emit('remove', i)"
        @select="(i) => $emit('selected', i)"
        @more="$emit('more')"
      />
    </div>
    <ViewFooter />
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import AlbumList from '@/components/parts/AlbumList.vue';
import { TypeAlbum } from '@/components/types/apptypes';

type State = {
  editing: boolean;
};

export default Vue.extend({
  name: 'ViewAlbumList',
  components: {
    AlbumList,
  },
  props: {
    albumItems: {
      default: () => [],
      type: Array as PropType<TypeAlbum[]>,
    },
  },
  data(): State {
    return {
      editing: false,
    };
  },
  computed: {
    myClass(): any {
      const klass: any = { 'album-body': true };
      if (this.editing) {
        klass['-editing'] = true;
      }
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
.album-body {
  overflow: scroll;
  padding: 20px;
  &.-editing {
    .album-body-head {
      button {
        pointer-events: none;
        opacity: 0.5;
      }
    }
    .btn-des {
      opacity: 0.2;
    }
  }
}
.album-body-head {
  display: flex;
  align-items: center;
  line-height: 1;
  margin: 0 0 20px;
  color: var(--app-color-dark);
  button {
    margin-left: auto;
  }
}
.album-text-des {
  font-size: var(--fontsize-normal);
}
</style>
