<template>
  <footer class="app-footer">
    <!-- top -->
    <template v-if="mode == 'top'">
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('menu')">
          <ion-icon name="log-in-outline" />
          <p>メニュー</p>
        </a>
      </div>
      <!-- <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('home')">
          <ion-icon name="leaf" />
          <p>ホーム</p>
        </a>
      </div> -->
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('album')">
          <ion-icon name="reorder-four-outline" />
          <p>アルバム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('talk')">
          <ion-icon name="chatbubble-ellipses-outline" />
          <p>しゃべる</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('setting')">
          <ion-icon name="restaurant-outline" />
          <p>せってい</p>
        </a>
      </div>
    </template>
    <!-- chat -->
    <template v-if="mode == 'albamlist'">
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('menu')">
          <ion-icon name="log-in-outline" />
          <p>メニュー</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('home')">
          <ion-icon name="leaf" />
          <p>ホーム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('album')">
          <ion-icon name="reorder-four-outline" />
          <p>アルバム</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('talk')">
          <ion-icon name="chatbubble-ellipses-outline" />
          <p>しゃべる</p>
        </a>
      </div>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('setting')">
          <ion-icon name="restaurant-outline" />
          <p>せってい</p>
        </a>
      </div>
    </template>
    <!-- make -->
    <template v-if="mode == 'make'">
      <ValidationProvider v-slot="{ invalid }" class="app-footer-input" name="mycomment" :rules="'required'" tag="div">
        <CaInput v-model="talkText" name="mail2" size="S" width="M" placeholder="コメント"></CaInput>
        <a :disabled="invalid" @click.stop.prevent="$emit('album')">
          <ion-icon name="cloud-upload-outline" />
        </a>
      </ValidationProvider>
      <div class="app-footer-icon">
        <a @click.stop.prevent="$emit('setting')">
          <ion-icon name="duplicate-outline" />
        </a>
      </div>
    </template>
  </footer>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ValidationProvider } from 'vee-validate';

type State = {
  talkText: string;
};
type Mode = 'top' | 'chat';

export default Vue.extend({
  name: 'AppFooter',
  components: { ValidationProvider },
  props: {
    mode: {
      default: 'top',
      type: String as PropType<Mode>,
    },
  },
  data(): State {
    return {
      talkText: '',
    };
  },
  mounted() {},
  methods: {},
});
</script>
<!------------------------------->

<!------------------------------->
<style lang="scss">
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(var(--app-base-color) 50%, var(--app-base-color2) 0%);
  padding: 0 30px;
  height: 50px;
  border-top: solid 1px #ecde90;
}

.app-footer-icon {
  a {
    display: block;
    text-align: center;
    font-size: 10px;
    color: var(--app-color-dark);
    text-decoration: none;
    // color: #fff;
  }
  p {
    padding: 0;
    margin: -3px 0 0;
    color: inherit;
  }
  input {
    height: 34px;
    border-radius: 4px;
    border: solid 1px var(--app-base-color);
    padding: 0 10px;
  }
  ion-icon {
    font-size: 26px;
    color: inherit;
  }
}
.app-footer-input {
  display: flex;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    margin-left: 0.5em;
  }
  .ca-input-status {
    display: none;
  }
  .ca-input-errors {
    display: none !important;
  }
}
</style>
