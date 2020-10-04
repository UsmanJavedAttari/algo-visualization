import { randomStr, slugify } from '@/globals';
import { computed, defineComponent } from 'vue';

const BaseSelect = defineComponent({
  props: {
    label: {
      required: true,
      type: String
    },
    placeholder: String,
    hint: String,
    modelValue: {
      default: null
    },
    items: {
      default: () => [],
      type: Array
    }
  },
  setup(props) {
    const labelSlug = computed(() => `${slugify(props.label)}-${randomStr()}`);
    return {
      labelSlug
    };
  }
});

export default BaseSelect;
