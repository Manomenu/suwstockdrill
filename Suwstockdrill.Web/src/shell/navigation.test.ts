import { describe, expect, it } from "vitest";

import { isCurrent } from "./navigation";

describe("isCurrent", () => {
    it("marks the item of its own address and of the screens under it", () => {
        expect(isCurrent("/companies", "/companies")).toBe(true);
        expect(isCurrent("/companies/CDR.WA", "/companies")).toBe(true);
    });

    it("does not mark an item whose address only starts the same way", () => {
        expect(isCurrent("/companies-archive", "/companies")).toBe(false);
        expect(isCurrent("/thesis", "/companies")).toBe(false);
    });
});
