import { InteractionLayer } from "@/components/animation/InteractionLayer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { PageTransition } from "@/components/animation/PageTransition";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <InteractionLayer />
      <PageTransition>
        <div className="site-shell">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </PageTransition>
    </MotionProvider>
  );
}
