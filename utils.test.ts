import { assertEquals } from "https://deno.land/std@0.204.0/assert/mod.ts";
import { speedToCharDelay } from "./utils.ts";

Deno.test("speedToCharDelay", () => {
  const cases = [
    [-10, 150],
    [0, 150],
    [1, 150],
    [2, 37.5],
    [4, 9.375],
  ];

  for (const [speed, delay] of cases) {
    assertEquals(speedToCharDelay(speed), delay);
  }
});
