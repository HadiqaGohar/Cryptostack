import {
  Navbar,
  Hero,
  StatsBar,
  Features,
  HowToStart,
  Payouts,
  Security,
  FAQ,
  Footer,
} from "@/components";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <HowToStart />
        <Payouts />
        <Security />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
