import { createApp } from 'vue';
import App from './core/App.vue';
import router from './core/Router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
//@ts-ignore
import vClickOutside from 'click-outside-vue3';
import './index.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primevue/resources/primevue.min.css '; //core css
import 'primeicons/primeicons.css ';
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import ApiService from './core/Axios/ApiService';

const pinia = createPinia();

ApiService.init('http://localhost:3005');

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app
  .use(router)
  .use(pinia)
  .use(PrimeVue, { ripple: true })
  .use(vClickOutside)
  .component('v-select', VSelect)
  .mount('#app');
