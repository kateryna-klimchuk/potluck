import { Card } from "@potluck/ui";
import { Section } from "./section";

const useCases = [
  {
    title: "Travel",
    text: "One pot for flights, stays, and dinners, so nobody fronts the whole trip.",
  },
  {
    title: "Family",
    text: "Groceries, bills, and the kids' activities in a budget the household shares.",
  },
  {
    title: "Party",
    text: "Collect for the venue, food, and gifts, and show everyone where it went.",
  },
  {
    title: "Shopping",
    text: "Bulk orders and group buys with a clear split from the first item.",
  },
];

export function UseCases() {
  return (
    <Section
      id="use-cases"
      title="Use cases"
      description="Wherever money is shared, Potluck keeps it in one place everyone can see."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((item) => (
          <li key={item.title}>
            <Card className="h-full">
              <h3 className="text-xl font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 text-fg-muted">{item.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
