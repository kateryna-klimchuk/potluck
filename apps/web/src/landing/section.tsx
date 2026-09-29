import { Container, cn, SectionHeading } from "@potluck/ui";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  muted?: boolean;
  children: ReactNode;
};

/** Landmark region named by its heading, so it is navigable and testable by name. */
export function Section({
  id,
  title,
  description,
  muted = false,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-16 sm:py-24", muted && "bg-surface-muted")}
    >
      <Container>
        <SectionHeading
          id={headingId}
          title={title}
          description={description}
        />
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}
