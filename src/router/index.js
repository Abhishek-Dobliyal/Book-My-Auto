import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RidesView from "../views/RidesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/available-rides",
    name: "rides",
    component: RidesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
