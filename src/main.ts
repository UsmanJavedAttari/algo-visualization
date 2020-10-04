import { createApp } from 'vue';
import AppComponent from './app/app.component';
import BaseBtn from './components/core/btn/base-btn.component';
import BaseInput from './components/core/input/base-input';
import BaseSelect from './components/core/select/base-select';
import router from './router';

const app = createApp(AppComponent).use(router);

app.component('base-input', BaseInput);
app.component('base-select', BaseSelect);
app.component('base-btn', BaseBtn);

app.mount('#app');
