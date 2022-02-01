import { boot } from "quasar/wrappers";
import axios from "axios";

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
});
