import { Section } from "./section";

const features = [
  {
    title: "Several separate budgets",
    text: "Keep the trip, the flat, and the birthday apart. Each budget has its own people and its own total.",
  },
  {
    title: "Invite anyone to a budget",
    text: "Send a link. Whoever joins sees the same numbers, no spreadsheet access to manage.",
  },
  {
    title: "Track spending together",
    text: "Every contribution and expense is visible to the group as it happens.",
  },
];

export function Features() {
  return (
    <Section id="features" title="Features" muted>
      <ul className="grid gap-8 md:grid-cols-3">
        {features.map((item) => (
          <li key={item.title}>
            <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
            <p className="mt-2 text-fg-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
