import { onRequest as __auth_callback_js_onRequest } from "D:\\MiraLunaProject\\mira-luna\\functions\\auth\\callback.js"
import { onRequest as __auth_index_js_onRequest } from "D:\\MiraLunaProject\\mira-luna\\functions\\auth\\index.js"
import { onRequest as __send_email_js_onRequest } from "D:\\MiraLunaProject\\mira-luna\\functions\\send-email.js"

export const routes = [
    {
      routePath: "/auth/callback",
      mountPath: "/auth",
      method: "",
      middlewares: [],
      modules: [__auth_callback_js_onRequest],
    },
  {
      routePath: "/auth",
      mountPath: "/auth",
      method: "",
      middlewares: [],
      modules: [__auth_index_js_onRequest],
    },
  {
      routePath: "/send-email",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__send_email_js_onRequest],
    },
  ]