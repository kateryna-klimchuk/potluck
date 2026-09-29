import { Card } from "@potluck/ui";
import { ComingSoonButton } from "./coming-soon-button";
import { Section } from "./section";

export function Pricing() {
  return (
    <Section id="pricing" title="Pricing" muted>
      <Card className="mx-auto max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Early access
        </p>
        <p className="mt-2 text-3xl font-semibold text-fg">
          Free during early access
        </p>
        <p className="mt-3 text-fg-muted">
          Unlimited budgets and invites while we build. Paid plans will be
          announced before anything changes.
        </p>
        <div className="mt-8">
          <ComingSoonButton size="md" />
        </div>
      </Card>
    </Section>
  );
}
