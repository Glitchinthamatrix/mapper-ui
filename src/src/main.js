import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import "./libs/font-awesome.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Change Naive UI Style element position
// See https://www.naiveui.com/en-US/light/docs/style-position
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

// Global component registration
app.component("fa-icon", FontAwesomeIcon);

app.mount("#app");
