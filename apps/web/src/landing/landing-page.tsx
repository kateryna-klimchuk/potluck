import { Faq } from "./faq";
import { Features } from "./features";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Pricing } from "./pricing";
import { UseCases } from "./use-cases";

export function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <UseCases />
        <Features />
        <HowItWorks />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
