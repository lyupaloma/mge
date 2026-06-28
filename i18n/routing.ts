import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "kz", "zh", "en"],
  defaultLocale: "ru",
  localePrefix: "always",
});
