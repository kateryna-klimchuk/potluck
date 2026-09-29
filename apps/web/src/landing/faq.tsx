import { Section } from "./section";

const faqs = [
  {
    q: "Do the people I invite have to pay?",
    a: "No. Joining a budget is free, and during early access everything is free for everyone.",
  },
  {
    q: "Can I have more than one budget?",
    a: "Yes. Create as many as you need; each has its own members and total.",
  },
  {
    q: "When does Potluck launch?",
    a: "We are building now. The Get started button will open sign-up as soon as it is ready.",
  },
  {
    q: "Who can see my budget?",
    a: "Only the people you invite. Nothing is public.",
  },
  {
    q: "Does Potluck hold the money?",
    a: "Not in the first version. Potluck tracks who paid what; the money moves the way it does today.",
  },
];

export function Faq() {
  return (
    <Section id="faq" title="Questions">
      <dl className="mx-auto max-w-3xl divide-y divide-border">
        {faqs.map((item) => (
          <div key={item.q} className="py-6">
            <dt>
              <h3 className="text-lg font-semibold text-fg">{item.q}</h3>
            </dt>
            <dd className="mt-2 text-fg-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
