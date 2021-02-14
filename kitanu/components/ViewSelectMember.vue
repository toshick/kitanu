<template>
  <section class="app view selectmember">
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
            name="title"
            title="ユーザIDまたはユーザ名から検索"
            rules="max:50"
            placeholder="完全一致で検索ヌ"
            width="100"
            size="S"
            has-remove-btn
            @input="searchFunc"
          ></CaInput>
        </div>
      </div>
      <div class="member-total">
        <span>{{ selectedCount }}人</span>
      </div>
      <ul class="member-list">
        <li
          v-for="(u, index) in form.members"
          :key="`member-${index}-${u.username}`"
          class="member-item"
          :class="{ '-disabled': u.id === loginUser.id }"
        >
          <label>
            <input
              v-model="selectedMap[u.id]"
              type="checkbox"
              :name="u.username"
            />
            <div>
              <UserForList :user="u" :selected="selectedMap[u.id]" />
              <b>
                <ion-icon name="hand-left-outline"></ion-icon>
              </b>
            </div>
          </label>
        </li>
      </ul>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
// import { openDialog } from '@/common/util';
import { TypeUserDisp } from '@/components/types/apptypes';

type State = {
  selectedMap: { [key: string]: boolean };
  findUserID: string;
  form: {
    members: TypeUserDisp[];
  };
};

export default Vue.extend({
  name: 'ViewSelectMember',
  components: {},
  props: {
    loginUser: {
      required: true,
      type: Object as PropType<TypeUserDisp>,
    },
    members: {
      default: [],
      type: Array as PropType<TypeUserDisp[]>,
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
      form: {
        members: [],
      },
    };
  },
  computed: {
    membersList(): any {
      return this.members.map((m: TypeUserDisp) => {
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
  created() {
    this.form = {
      members: this.members.map((m: TypeUserDisp) => {
        const m2 = { ...m };
        let selected = false;
        if (m2.id === this.loginUser.id) {
          m2.subtext = 'あんただヌ';
          selected = true;
        }

        this.$set(this.selectedMap, m2.id, selected);

        return m2;
      }),
    };
  },
  methods: {
    save() {
      const list: TypeUserDisp[] = [];
      this.membersList.forEach(
        (m: { user: TypeUserDisp; selected: boolean }) => {
          if (m.selected) {
            list.push(m.user);
          }
        },
      );
      this.$emit('save', list);
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
$bgColor: #fff8e3;
.selectmember {
  // background-image: none;
  background-color: $bgColor;
  .app-body {
    padding: 20px;
  }
}
.member-total {
  position: relative;
  padding: 0 20px 0px;
  color: var(--app-color-dark);
  text-align: center;
  height: 30px;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $bgColor;
    background-image: url('/img/pat/subtle-dark-vertical.png');
    padding: 0 20px;
    z-index: 1;
    color: var(--app-base-color2);
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: dashed 1px var(--app-base-color2);
  }
}
.member-list {
  li {
    padding: 10px 0;
    input {
      display: none;
    }
  }
}
.member-item {
  &.-disabled {
    pointer-events: none;
  }
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
}
.search-block {
  input {
    border: none;
  }
}
</style>
