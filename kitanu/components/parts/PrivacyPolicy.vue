<template>
  <div class="policy">
    <h1>プライバシーポリシー</h1>
    <p>プライバシーポリシー は、 インターネットのウェブサイトにおいて、収集した個人情報をどう扱うのかなどを、サイトの管理者が定めた規範のこと。個人情報保護方針などともいう。 プライバシーポリシーは、利用規約の一部として記載している場合もある。</p>
    <img src="/img/top/tanu.png" class="tanu" alt="kitanu" />
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';

type State = {};

export default Vue.extend({
  name: 'PrivacyPolicy',
  components: {},
  props: {},
  data(): State {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.policy {
  padding: 20px 20px;
  color: var(--app-color-dark);
  h1 {
    font-size: var(--fontsize-large);
    margin-bottom: 10px;
  }
  p {
    font-size: var(--fontsize-normal);
  }
  img {
    display: block;
    width: 60px;
    margin: 30px auto;
  }
}
</style>
