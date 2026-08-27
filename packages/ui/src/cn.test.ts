import { expect, test } from "bun:test";
import { cn } from "./cn";

test("cn joins truthy class names", () => {
  expect(cn("a", false, "b", undefined, null, "c")).toBe("a b c");
});
