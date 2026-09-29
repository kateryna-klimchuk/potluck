import { Container } from "@potluck/ui";
import { ComingSoonButton } from "./coming-soon-button";

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="text-center">
        <p className="mb-4 inline-block rounded-button bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
          Free during early access
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
          Shared budgets for the things you do together
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-fg-muted">
          Plan a trip, run a household, throw a party, or shop as a group.
          Everyone sees the same pot and knows where the money goes.
        </p>
        <div className="mt-10">
          <ComingSoonButton />
        </div>
      </Container>
    </section>
  );
}
