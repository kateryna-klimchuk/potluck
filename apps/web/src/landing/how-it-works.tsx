import { Section } from "./section";

const steps = [
  {
    title: "Create a budget",
    text: "Name it, set a target if you want one, and you are ready.",
  },
  {
    title: "Invite people",
    text: "Share a link with the people who are in on it.",
  },
  {
    title: "Track spending together",
    text: "Add contributions and expenses; everyone sees the running total.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" title="How it works">
      <ol className="grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-fg"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-fg">{step.title}</h3>
              <p className="mt-1 text-fg-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
