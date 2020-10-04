<template>
  <section>
    <h1>
      <a class="tanu" @click.stop.prevent="actionTop">
        <img data-src="/img/top/tanu/tanu.png" :src="placeholderImg" class="lazy" alt="kitanu" />
      </a>
      <p class="comment">{{ comment }}</p>
    </h1>
    <ul>
      <li>
        <a @click.stop.prevent="actionTop">
          <ion-icon name="notifications-outline" />
          トップへ
        </a>
      </li>
      <li>
        <a @click.stop.prevent="actionAlbum">
          <ion-icon name="notifications-outline" />
          アルバムへ
        </a>
      </li>
    </ul>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { shuffle } from '@/common/util';

type State = {
  comment: string;
};
const comments: string[] = ['今日やらねえ奴は明日もヤラヌ', 'アイリッシュパブにいきたいヌ', 'あさめしはバナナだヌ', 'トマトはそのままでヌ', 'just do イッヌ', '勝てば負けないヌ', '不足を知る物は足る者ヌ', 'ストレイツオ容赦せんヌ', 'そのへんの草でも食わせておけヌ', 'その紙切れ、あの世ではつかえんヌ', 'なぜできないか、やらないからだヌ', 'レモネードで回復ヌ'];

export default Vue.extend({
  name: 'ModalSideMenu',
  components: {},
  model: {
    event: 'change-open',
  },
  props: {},

  data(): State {
    return {
      comment: '',
    };
  },
  mounted() {
    this.comment = shuffle(comments)[0];
    // this.comment = comments[comments.length - 1];
  },
  methods: {
    close() {
      this.$parent.$emit('close');
    },
    actionTop() {
      this.close();
      this.goTop();
    },
    actionAlbum() {
      this.close();
      this.goAlbum();
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
/* section {
  padding: 20px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: -2px 2px 5px #eee, inset 2px -2px 5px #eee, 2px -2px 5px #eee, inset -2px 2px 5px #eee;
} */
section {
  position: relative;
  overflow: hidden;

  padding: 20px;
  // background-image: url('/img/subtle-dark-vertical.png');
}
.tanu {
  position: absolute;
  right: -18px;
  top: 20px;
  width: 100px;
  img {
    width: 100%;
  }
}
h1 {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  color: #fff;
  font-size: 18px;
  p {
    padding-right: 1em;
  }
}
h1 ion-icon {
  color: inherit;
  margin-right: 0.2em;
}

li {
  padding: 10px 0;
}
li a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
}
li ion-icon {
  color: inherit;
  margin-right: 0.2em;
}
</style>
