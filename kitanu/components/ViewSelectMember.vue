<template>
  <section class="app view">
    <ViewHeader>
      <a class="btn-back" @click.stop.prevent="$emit('close')"
        ><ion-icon name="chevron-down" size="medium"
      /></a>
      <h1>{{ title }}</h1>
      <!-- right -->
      <template v-slot:right>
        <a class="btn-header" :disabled="selectedCount === 0" @click="save"
          ><span>OK</span></a
        >
      </template>
    </ViewHeader>
    <ViewBody>
      <div class="member-total">{{ selectedCount }}人</div>
      <ul class="member-list">
        <li
          v-for="(u, index) in members"
          :key="`member-${index}-${u.username}`"
          class="member-item"
        >
          <label>
            <input
              v-model="selectedMap[u.id]"
              type="checkbox"
              :name="u.username"
            />
            <div>
              <b>
                <ion-icon name="bicycle-outline"></ion-icon>
              </b>
              <UserIcon :url="u.iconurl" size="M" />
              <p>{{ u.username }}</p>
            </div>
          </label>
        </li>
      </ul>

      <div class="search-block">
        <div class="ca-inputline">
          <CaInput
            v-model="findUserID"
            class="-yellow"
            name="title"
            title="ユーザIDから検索"
            rules="max:50"
            placeholder="ユーザID"
            width="L"
          ></CaInput>
        </div>
      </div>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
// import { openDialog } from '@/common/util';
import { TypeUser } from '@/components/types/apptypes';

type State = {
  selectedMap: { [key: string]: string };
  findUserID: string;
};

export default Vue.extend({
  name: 'ViewSelectMember',
  components: {},
  props: {
    members: {
      default: [],
      type: Array as PropType<TypeUser[]>,
    },
    title: {
      default: 'メンバせんたくヌ',
      type: String,
    },
  },
  data(): State {
    return {
      selectedMap: {},
      findUserID: '',
    };
  },
  computed: {
    membersList(): any {
      return this.members.map((m: TypeUser) => {
        const selected = this.selectedMap[m.id] || false;
        return { user: m, selected };
      });
    },
    selectedCount(): number {
      let count = 0;
      this.membersList.forEach((m: any) => {
        if (m.selected) {
          count += 1;
        }
      });
      return count;
    },
  },
  mounted() {},
  methods: {
    save() {
      const list: TypeUser[] = [];
      this.membersList.forEach((m: { user: TypeUser; selected: boolean }) => {
        if (m.selected) {
          list.push(m.user);
        }
      });
      this.$emit('save', list);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.member-total {
  padding: 20px;
  color: var(--app-color-dark);
}
.member-list {
  padding: 0 20px;
  li {
    padding: 10px 0;
    input {
      display: none;
    }
  }
}
.member-item {
  label {
    display: block;
    color: var(--app-color-dark);
    & > div {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    p {
      margin-left: 0.5em;
      font-size: var(--fontsize-small);
    }
    b {
      position: relative;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 0.5em;
      box-shadow: 0 0 1px 1px rgba(#000, 0.1);
      ion-icon {
        display: none;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // color: #fff;
      }
    }
    input[type='checkbox']:checked + div {
      font-weight: bold;
      & > b {
        background-color: var(--app-base-color);
        border: solid 2px #fff;
        ion-icon {
          display: block;
        }
      }
    }
  }
}
.search-block {
  padding: 20px 20px 0;
}
</style>
