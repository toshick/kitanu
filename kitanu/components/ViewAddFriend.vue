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
      <div class="search-block">
        <div>
          <CaInput
            class="-yellow"
            name="title"
            title="ユーザIDまたはユーザ名から検索"
            rules="max:50"
            placeholder="完全一致で検索ヌ"
            width="100"
            has-remove-btn
            @input="searchFunc"
          ></CaInput>
        </div>
      </div>

      <transition name="fade">
        <div class="zero-result">
          <p v-if="visibleZeroResult">見つからんヌ</p>
        </div>
      </transition>

      <transition name="fade">
        <ul v-if="membersList.length > 0" class="member-list">
          <li
            v-for="(u, index) in membersList"
            :key="`member-${index}-${u.user.username}`"
            class="member-item"
            :class="{ '-added': u.friend }"
          >
            <label>
              <input
                v-model="selectedMap[u.user.id]"
                type="checkbox"
                :name="u.user.username"
              />
              <div>
                <UserForList
                  :user="u.user"
                  :disabled="u.friend"
                  :selected="selectedMap[u.user.id]"
                />
                <b><ion-icon name="hand-left-outline"></ion-icon></b>
              </div>
            </label>
          </li>
        </ul>
      </transition>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { debounce } from 'throttle-debounce';
import {
  TypeUser,
  TypeUserDisp,
  TypeUserID,
} from '@/components/types/apptypes';

type State = {
  selectedMap: { [key: string]: string };
  searchFunc: (str: string) => void;
};

type Member = {
  user: TypeUser;
  selected: boolean;
  friend: boolean;
};

export default Vue.extend({
  name: 'ViewAddFriend',
  components: {},
  props: {
    title: {
      default: 'メンバせんたくヌ',
      type: String,
    },
    searchResult: {
      default: [],
      type: Array as PropType<TypeUser[]>,
    },
    friends: {
      default: [],
      type: Array as PropType<TypeUserID[]>,
    },
    searched: {
      default: false,
      type: Boolean,
    },
  },
  data(): State {
    const self: any = this;
    return {
      selectedMap: {},
      searchFunc: debounce(300, self.search),
    };
  },
  computed: {
    membersList(): Member[] {
      return this.searchResult.map((m: TypeUser) => {
        const selected = !!this.selectedMap[m.id];
        const friend = this.friends.find((uid: TypeUserID) => uid === m.id);
        if (friend) {
          this.$set(this.selectedMap, friend, selected);
        }
        return { user: m, selected, friend: !!friend };
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
    visibleZeroResult(): boolean {
      return this.searched && this.searchResult.length === 0;
    },
  },
  mounted() {},
  methods: {
    save() {
      const list: TypeUser[] = this.membersList
        .filter((m: { user: TypeUser; selected: boolean }) => {
          return m.selected;
        })
        .map((m: { user: TypeUser; selected: boolean }) => m.user);
      this.$emit('save', list);
    },
    search(str: string) {
      this.$emit('search', str.trim());
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

    b {
      position: relative;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      margin: 0 10px 0 auto;
      ion-icon {
        display: none;
        font-size: 26px;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    input[type='checkbox']:checked + div {
      & > b {
        background-color: none;
        border: none;
        ion-icon {
          display: block;
        }
      }
    }
  }
  &.-added {
    pointer-events: none;
    ion-icon {
      display: block;
    }
    b {
      background-color: #d7c758;
    }
  }
}

.search-block {
  padding: 20px 20px 10px;
}
.zero-result {
  position: relative;
  font-size: var(--fontsize-normal);
  p {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0px 24px 0;
  }
}
</style>
