import { Button } from "@potluck/ui";

export function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 text-zinc-900">
      <h1 className="text-3xl font-semibold">Potluck</h1>
      <p className="text-zinc-600">
        Bun + React + Tailwind monorepo is running.
      </p>
      <Button onClick={() => alert("hello")}>Say hi</Button>
    </main>
  );
}
