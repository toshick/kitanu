<template>
  <section class="app view editchatroom">
    <ViewHeader>
      <a class="btn-back" @click.stop.prevent="$emit('close')"
        ><ion-icon name="chevron-down" size="medium"
      /></a>
      <h1>{{ title }}</h1>
      <!-- right -->
      <template v-slot:right>
        <a
          class="btn-header margin-left-auto"
          :disabled="editing"
          @click="$emit('add')"
        >
          <ion-icon name="person-add-outline"></ion-icon>
        </a>
      </template>
    </ViewHeader>
    <ViewBody>
      <div class="editchatroom-head">
        <div class="editchatroom-title-input">
          <CaInput
            v-model="form.title"
            class="-yellow form-header"
            name="title"
            rules="max:50"
            title="ルームタイトルーヌ"
            placeholder="タイトルーヌ"
            width="100"
            size="S"
            has-remove-btn
          ></CaInput>
          <a class="btn-save-title" :disabled="!canSubmit" @click="saveTitle">
            <ion-icon name="paper-plane-outline"></ion-icon>
          </a>
        </div>
      </div>
      <div class="editchatroom-body">
        <div class="member-total">
          <span>{{ selectedCount }}人</span>
          <hr />
          <a class="btn-edit" @click="editing = !editing">
            <ion-icon name="restaurant-outline"></ion-icon>
          </a>
        </div>
        <transition name="fade">
          <ul v-if="visibleList" class="member-list">
            <li
              v-for="(u, index) in membersList"
              :key="`member-${index}-${u.username}`"
              class="member-item"
            >
              <UserForList :user="u" :selected="true" />
              <transition name="fade">
                <a
                  v-if="editing && u.id !== loginUser.id"
                  class="btn-remove"
                  @click="() => removeMember(u)"
                >
                  <ion-icon name="trash-outline" size="small"></ion-icon>
                </a>
              </transition>
            </li>
          </ul>
        </transition>
      </div>
    </ViewBody>
  </section>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { TypeUserDisp, TypeChatRoom } from '@/components/types/apptypes';

type State = {
  selectedMap: { [key: string]: boolean };
  findUserID: string;
  form: {
    title: string;
  };
  visibleList: boolean;
  editing: boolean;
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
    chatroom: {
      default: {},
      type: Object as PropType<TypeChatRoom>,
      required: true,
    },
    title: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {
      selectedMap: {},
      findUserID: '',
      form: {
        title: '',
      },
      visibleList: false,
      editing: false,
    };
  },
  computed: {
    membersList(): TypeUserDisp[] {
      return this.members.map((m: TypeUserDisp) => {
        const m2 = { ...m };
        if (m2.id === this.loginUser.id) {
          m2.subtext = 'あんただヌ';
        }
        return m2;
      });
    },
    selectedCount(): number {
      return this.membersList.length;
    },
    canSubmit(): boolean {
      if (!this.form.title) return false;
      return true;
    },
  },
  created() {
    this.form.title = this.chatroom.title || '';
  },
  mounted() {
    setTimeout(() => {
      this.visibleList = true;
    }, 500);
  },
  methods: {
    saveTitle() {
      this.$emit('save', { title: this.form.title });
    },
    removeMember(user: TypeUserDisp) {
      this.showConfirm(
        {
          title: `${user.username}をルームから削除するヌ`,
          text: `よいヌね？`,
          isDanger: true,
        },
        () => {
          this.$emit('remove-member', user.id);
          this.editing = false;
        },
      );
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.form-header {
  flex: 1 0 auto;
}
.editchatroom {
  background-image: none;
}

.editchatroom-head {
  padding: 20px;
}
.editchatroom-body {
  padding: 10px;
}
.editchatroom-title-input {
  display: flex;
  align-items: center;
  .ca-input {
    flex: 1 0 auto;
  }
}
.btn-save-title {
  display: block;
  margin: 24px 0 0 10px;
  ion-icon {
    vertical-align: middle;
  }
}

.member-total {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 15px 0px;
  color: var(--app-color-dark);
  text-align: center;
  height: 30px;

  span {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    background-color: #fbecad;
    // padding: 0 20px;
    // z-index: 1;
    color: var(--app-base-color2);
  }
  hr {
    border: none;
    border-top: dashed 1px var(--app-base-color2);
    flex: 1 0 auto;
    margin: 0 10px;
  }
  a {
    display: block;
    margin-left: auto;
    ion-icon {
      color: var(--app-base-color2);
    }
  }
}
.member-list {
  padding: 0 10px;
  li {
    padding: 10px 0;
    input {
      display: none;
    }
  }
}
.member-item {
  display: flex;
  align-items: center;
  a {
    margin: 0 2em 0 auto;
    // background-color: #fff;
    // width: 30px;
    // height: 30px;
    // border-radius: 50%;
  }
}
</style>
