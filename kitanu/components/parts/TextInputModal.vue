<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }" tag="form" class="form">
    <div class="ca-modal-scroll-wrapper">
      <CaModalScroll>
        <CaModalViewHeader title="タイトルである" @close="close">
          <!-- icons -->
          <div class="ca-modalview-header-icons">
            <a class="btn-header-action" :disabled="invalid" @click.stop.prevent="handleSubmit(save)">投稿ヌ</a>
          </div>
        </CaModalViewHeader>
        <CaModalViewBody>
          <CaTextarea v-model="text" name="kanso" rules="required" placeholder="テキスト入力ヌ"></CaTextarea>
        </CaModalViewBody>
      </CaModalScroll>
    </div>
  </ValidationObserver>
</template>
<!------------------------------->

<!------------------------------->
<script lang="ts">
import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';
import { toast } from '@/common/util';

type State = {
  text: string;
};

export default Vue.extend({
  name: 'TextInputModal',
  components: { ValidationObserver },
  props: {},
  data(): State {
    return {
      text: '',
    };
  },
  computed: {},
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      const $t = this.$el.closest('.mobileview') || null;
      toast('投稿されたーヌ', { target: $t });
      this.close();
    },
  },
});
</script>
<!------------------------------->

<!------------------------------->
<style scoped lang="scss"></style>

<style lang="scss">
.view-textinput {
  .ca-textarea {
    & > span {
      display: block;
      textarea {
        display: block;
        width: 100%;
        height: 200px;
        border-radius: 0;
        background-color: #fdf096;
        border: none !important;
      }
    }
    .ca-textarea-status,
    .ca-textarea-errors {
      display: none;
    }
  }

  .ca-modalview {
    background-color: #ddcd61;
    background-image: url('/img/subtle-dark-vertical.png');
  }
}
</style>
