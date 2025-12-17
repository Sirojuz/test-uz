import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

axios.defaults.baseURL = "https://api.examin.tdmau.uz";
app.config.globalProperties.$axios = axios;

createApp(App).use(store).use(router).use(VueAxios, axios).mount("#app");
