import { createApp } from 'vue';
import Appearable from '@/components/Appearable.vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App).use(store).use(router);
app.component('Appearable', Appearable);
app.mount('#app');
