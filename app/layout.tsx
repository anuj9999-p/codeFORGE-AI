import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { QueryProvider } from "@/components/shared/query-provider";
import { CommandPalette } from "@/components/shared/command-palette";
import { ServiceWorkerRegister } from "@/components/shared/service-worker-register";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeForge AI — Forge Your Future. Master Every Interview.",
  description:
    "A premium coding interview preparation platform: structured learning, interactive algorithm visualizations, company-specific prep, and an AI assistant — all in one place.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CodeForge AI",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#FF6B35",
          colorBackground: "#14161B",
          colorText: "#F5F3EF",
          colorTextSecondary: "#9A9CA5",
          colorInputBackground: "#1C1F26",
          colorInputText: "#F5F3EF",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html
        lang="en"
        className={`dark ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-screen bg-background font-body text-foreground">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}
              <CommandPalette />
              <ServiceWorkerRegister />
              <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "#1C1F26",
                    color: "#F5F3EF",
                    border: "1px solid rgba(255,255,255,0.08)",
                  },
                }}
              />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
