import { route } from "quasar/wrappers";
import jwt_decode from "jwt-decode";
import { Cookies } from "quasar";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    let token = Cookies.get("token");
    if ((to.path == "/login" || to.path == "/register") && token) next("/");
    if (token && store.state.user.isAdmin == null) {
      let { admin } = jwt_decode(token);
      store.commit("user/setAdmin", { admin });
    }
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!token) {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        if (to.matched.some((record) => record.meta.requiresAdmin)) {
          if (!store.state.user.isAdmin) next("/");
          else next();
        } else next();
      }
    } else {
      next();
    }
  });

  return Router;
});
