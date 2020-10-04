import { defineComponent } from 'vue';

const BaseBtn = defineComponent({
  props: {
    loading: {
      default: false
    },
    disabled: {
      default: false
    }
  }
});

export default BaseBtn;
