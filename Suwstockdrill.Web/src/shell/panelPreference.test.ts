import { afterEach, describe, expect, it, vi } from "vitest";

import { storeCollapsed, storedCollapsed } from "./panelPreference";

function storage(): Pick<Storage, "getItem" | "setItem"> {
    const values = new Map<string, string>();
    return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("the remembered navigation panel", () => {
    it("knows nothing until a choice is made, then remembers it", () => {
        vi.stubGlobal("window", { localStorage: storage() });

        expect(storedCollapsed()).toBeNull();
        storeCollapsed(true);
        expect(storedCollapsed()).toBe(true);
        storeCollapsed(false);
        expect(storedCollapsed()).toBe(false);
    });

    it("works without storage, as in a private window with site data blocked", () => {
        const blocked = () => {
            throw new DOMException("blocked", "SecurityError");
        };
        vi.stubGlobal("window", { localStorage: { getItem: blocked, setItem: blocked } });

        expect(() => {
            storeCollapsed(true);
        }).not.toThrow();
        expect(storedCollapsed()).toBeNull();
    });
});
