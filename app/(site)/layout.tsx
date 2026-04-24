import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { PageTransition } from "@/components/animation/PageTransition";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
