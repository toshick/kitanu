<template>
  <section>
    <h1>
      <img src="/img/top/tanu.png" class="tanu" alt="kitanu" />
      <p class="comment">{{ comment }}</p>
    </h1>
    <ul>
      <li v-for="i in 40" :key="i">
        <a href="">
          <ion-icon name="notifications-outline" />
          キタキタヌ
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
const comments: string[] = ['今日やらねえ奴は明日もヤラヌ', 'アイリッシュパブにいきたいヌ', 'あさめしはバナナだヌ', 'トマトはそのままでヌ', 'just do イッヌ', '勝てば負けないヌ', '不足を知る物は足る者ヌ', 'ストレイツオ容赦せんヌ', 'そのへんの草でも食わせておけヌ'];

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
  },
  methods: {
    close() {
      this.$emit('close');
    },
    onClickIcon(icon: string) {
      console.log('コール', icon);
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
  background-image: url('/img/subtle-dark-vertical.png');
}
.tanu {
  position: absolute;
  right: -18px;
  top: 20px;
  width: 100px;
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
