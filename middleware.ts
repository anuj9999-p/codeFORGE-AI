import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Only these routes require a signed-in user. Everything else (landing,
// interview sheet, visualizer, patterns, roadmaps, resources) stays public
// so unauthenticated visitors can explore the product before signing up.
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/settings(.*)",
  "/bookmarks(.*)",
  "/notes(.*)",
  "/leaderboard(.*)",
  "/assistant(.*)",
  "/playground(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
