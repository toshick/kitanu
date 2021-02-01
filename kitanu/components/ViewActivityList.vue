<template>
  <div class="activity ca-modal-scroll-wrapper">
    <CaModalScroll>
      <CaModalViewHeader title="最近の活動ヌ" @close="close" />
      <CaModalViewBody>
        <ul class="item-list">
          <li
            v-for="(i, index) in activities"
            :key="`item-${index}-${i.user.username}`"
          >
            <UserIcon :url="i.user.iconurl" :username="i.user.username" />
            <div class="item-label">
              <!-- <h3>{{ i.user.username }}</h3> -->
              <div>
                <span class="item-date">{{ i.createdAt | dateDisp }}</span>
                {{ i.text }}<br />
                <CaTag v-for="t in i.tags" :key="t" class="item-tag" size="S">{{
                  t
                }}</CaTag>
              </div>
            </div>
          </li>
        </ul>
        <a class="btn-more" @click="$emit('more')"
          ><ion-icon name="chevron-down-outline" size="large"
        /></a>
      </CaModalViewBody>
    </CaModalScroll>
  </div>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue, { PropType } from 'vue';
import { TypeUser, TypeActivity } from '@/components/types/apptypes';
import UserIcon from '@/components/parts/UserIcon.vue';

type State = {};

export default Vue.extend({
  name: 'ViewActivityList',
  components: { UserIcon },
  props: {
    activities: {
      default: () => [],
      type: Array as PropType<TypeActivity[]>,
    },
    debug: {
      default: '',
      type: String,
    },
  },
  data(): State {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss">
.item-list {
  li {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: dashed 1px var(--app-color-dark);
  }
}
.item-label {
  flex: 1 0 0;
  margin-left: 1em;
  color: var(--app-color-dark);
  h3 {
    font-size: var(--fontsize-medium);
  }
  & > div {
    font-size: var(--fontsize-small);
    .ca-tag {
      background-color: #f0d755;
      color: #6c3321;
      margin-top: 3px;
      margin-right: 6px;
      // border: solid 1px #fff;
    }
  }
}
.item-date {
  color: #fff;
  margin-right: 0.5em;
}
</style>
<style lang="scss">
.view-activitylist {
  .ca-modalview {
    background-color: #ddcd61;
    background-image: url('/img/pat/subtle-dark-vertical.png');
  }
}
</style>
