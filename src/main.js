
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'; // Import Pinia
import router from '@/router/index.js';

const app = createApp(App);
app.use(router);
app.use(createPinia()); // Initialize Pinia

app.mount('#app');