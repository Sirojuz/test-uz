import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

axios.defaults.baseURL = "http://10.1.100.11:8800"; // Serveringiz uchun
app.config.globalProperties.$axios = axios;

createApp(App).use(store).use(router).use(VueAxios, axios).mount("#app");
