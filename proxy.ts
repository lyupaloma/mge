import createMiddleware from "next-intl/middleware";
// proxy.ts = Next.js 16 replacement for middleware.ts
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(ru|kz|zh|en)/:path*",
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
