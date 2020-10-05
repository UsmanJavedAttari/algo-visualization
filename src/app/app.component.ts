import AppBarComponent from '@/components/core/app-bar/app-bar.component';
import { LoaderService } from '@/services';
import { defineComponent } from 'vue';

const { FullScreenLoader } = LoaderService.Instance;

const AppComponent = defineComponent({
  components: {
    AppBarComponent
  },
  setup() {
    return {
      FullScreenLoader
    };
  }
});

export default AppComponent;
