import { createRouter, createWebHistory } from "vue-router";
import UpcomingLaunches from "../views/UpcomingLaunches.vue";
import RecentLaunches from "../views/RecentLaunches.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "upcoming",
      component: UpcomingLaunches,
    },
    {
      path: "/recent",
      name: "recent",
      component: RecentLaunches,
    },
  ],
});

export default router;
