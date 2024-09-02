import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

//Vue.js 애플리케이션을 초기화하고 설정하는 JavaScript 모듈