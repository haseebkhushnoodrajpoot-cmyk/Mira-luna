import { onRequest as __send_email_js_onRequest } from "D:\\MiraLunaProject\\mira-luna\\functions\\send-email.js"

export const routes = [
    {
      routePath: "/send-email",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__send_email_js_onRequest],
    },
  ]