import { createRouter, createWebHistory } from "vue-router";
import { checkAuth } from "./guards.js";
import EntityAddEditView from "../views/entity/EntityAddEditView.vue";
import EntityModelAddEditView from "../views/entity/model/EntityModelAddEditView.vue";
import EntityModelListView from "../views/entity/model/EntityModelListView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignUpView from "../views/auth/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpView,
    },
    {
      path: "/models",
      name: "entity-models",
      component: EntityModelListView,
    },
    {
      path: "/models/add",
      name: "add-entity-model",
      component: EntityModelAddEditView,
    },
    {
      path: "/entity/add/:modelId",
      name: "add-entity",
      component: EntityAddEditView,
    },
  ],
});

router.beforeEach(checkAuth);
export default router;
