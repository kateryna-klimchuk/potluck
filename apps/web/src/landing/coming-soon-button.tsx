import { Button } from "@potluck/ui";
import { useId, useState } from "react";

type ComingSoonButtonProps = {
  label?: string;
  size?: "md" | "lg";
};

/**
 * Every CTA on the landing page behaves the same (PRD-0001 req. 2):
 * it reveals a "Coming soon" message and collects nothing.
 */
export function ComingSoonButton({
  label = "Get started",
  size = "lg",
}: ComingSoonButtonProps) {
  const [revealed, setRevealed] = useState(false);
  const messageId = useId();

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        size={size}
        onClick={() => setRevealed(true)}
        aria-describedby={revealed ? messageId : undefined}
      >
        {label}
      </Button>
      {revealed ? (
        <p
          id={messageId}
          role="status"
          className="rounded-button bg-accent-soft px-3 py-1 text-sm text-fg"
        >
          Coming soon. Potluck is in early access; check back shortly.
        </p>
      ) : null}
    </div>
  );
}
