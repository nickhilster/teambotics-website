import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { PageTransition } from "@/components/animation/PageTransition";
import { LocaleProvider } from "@/components/theme/LocaleProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import type { SiteLocale } from "@/lib/siteLocale";

export function SiteShell({ children, locale }: { children: React.ReactNode; locale: SiteLocale }) {
  return (
    <ThemeProvider>
      <LocaleProvider locale={locale}>
        <MotionProvider>
          <PageTransition>
            <div className="site-shell">
              <Header />
              <main>{children}</main>
              <Footer />
              <ChatbotWidget />
            </div>
          </PageTransition>
        </MotionProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}