import { describe, it, expect } from "vitest";
import { Crystalfinder } from "../src/core.js";
describe("Crystalfinder", () => {
  it("init", () => { expect(new Crystalfinder().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Crystalfinder(); await c.search(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Crystalfinder(); await c.search(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
