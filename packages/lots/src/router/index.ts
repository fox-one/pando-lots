import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes: any = [
  {
    path: "/entry",
    name: "entry",
    component: () => import("../views/entry.vue")
  },
  {
    path: "/modal",
    name: "modal",
    component: () => import("../views/modal.vue")
  }
];

if (process.env.NODE_ENV === "development") {
  routes.push(
    {
      path: "/lib",
      name: "lib",
      component: () => import("../views/playground-lib.vue")
    },
    {
      path: "/ifream",
      name: "ifream",
      component: () => import("../views/playground-ifream.vue")
    }
  );
}

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
