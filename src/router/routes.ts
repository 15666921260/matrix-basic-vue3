// 路由配置
import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import router from "@/router/index";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];
