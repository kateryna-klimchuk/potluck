import { Container } from "@potluck/ui";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-2 text-sm text-fg-muted sm:flex-row">
        <span className="font-semibold text-fg">Potluck</span>
        <span>© {new Date().getFullYear()} Potluck</span>
      </Container>
    </footer>
  );
}
