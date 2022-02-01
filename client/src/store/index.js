import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import user from "./user";
import layout from "./layout";

export default store(function () {
  const Store = createStore({
    modules: {
      user,
      layout,
    },
    strict: process.env.DEBUGGING,
  });

  return Store;
});
