<template>
  <section class="app view album-setting">
    <AppHeader>
      <a class="btn-back" @click.stop.prevent="close"
        ><ion-icon name="chevron-back" size="medium"
      /></a>
      <h1>アルバム せってい</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" @click="save"><span>保存</span></a>
      </template>
    </AppHeader>
    <AppBody>
      <!-- <h2><input class="ca-input-editablelabel" value="みんなでピクニックにいってみようの巻" /></h2> -->

      <div class="setting-input">
        <div class="ca-inputline">
          <CaInput
            v-model="title"
            class="-yellow"
            name="title"
            title="たいとる"
            rules="max:50"
            placeholder="アルバムたいとる"
            width="L"
          ></CaInput>
        </div>
        <div class="ca-inputline">
          <CaTextarea
            v-model="des"
            class="-yellow"
            autorows
            auto-width
            name="des"
            title="せつめい"
            placeholder="アルバムせつめいぶん"
          ></CaTextarea>
        </div>
      </div>

      <div class="member-add">
        <CaButton size="S" class="btn-add-member" @click="addMember">
          メンバー追加
        </CaButton>
      </div>

      <ul class="member-list">
        <li
          v-for="(u, index) in members"
          :key="`member-${index}-${u.username}`"
        >
          <UserIcon :url="u.iconurl" />
          <div class="member-label">
            <h3>{{ u.username }}</h3>
            <p v-if="u.subtext">{{ u.subtext }}</p>
          </div>
        </li>
      </ul>
    </AppBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
// import CaModalPG from 'camaleao-design/components/CaModalPG';
import { toast } from '@/common/util';
import { UserType } from './types/app';

type State = {
  members: UserType[];
  title: string;
  des: string;
};

const members: UserType[] = [];
members.push({
  username: 'にゃんごろう',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'いつだってオレンジ',
});
members.push({
  username: 'カマキチ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'そろそろキャンプしたいぞ',
});
members.push({
  username: 'エドブラウン',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: '',
});
members.push({
  username: 'サルバトーレトスカニーニ',
  iconurl: 'https://avatars3.githubusercontent.com/u/6635142?s=460&v=4',
  subtext: 'スパゲティつくってみた',
});

export default Vue.extend({
  name: 'AppMember',
  components: {},
  props: {},
  data(): State {
    return {
      members,
      title: 'みんなでピクニックにいってみようの巻',
      des:
        'ここはせつめいです\n今年も春がやってきました。\nそこでどこぞの公園でピクニックをすることにしましたよ。',
    };
  },
  computed: {
    textRows(): number {
      return this.des.split('\n').length;
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.showLoading(true);
      setTimeout(() => {
        toast('ほぞんしたヌ');
        this.showLoading(false);
        this.close();
      }, 1000);
    },
    addMember() {},
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.setting-input {
  padding: 20px 20px 10px;
  margin-bottom: 20px;
  .ca-inputline {
    padding-bottom: 0;
  }
}

.member-list {
  padding: 20px;
  li {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
}
.member-label {
  margin-left: 1em;
  color: var(--app-color-dark);
  h3 {
    font-size: var(--fontsize-medium);
  }
  p {
    font-size: var(--fontsize-small);
  }
}
.ca-input-editablelabel {
  width: 100%;
  text-align: center;
  font-size: var(--fontsize-medium);
  color: var(--app-color-dark);
}
.member-add {
  text-align: center;
}
.btn-add-member {
  // display: inline-flex;
  // align-items: center;
}
</style>
