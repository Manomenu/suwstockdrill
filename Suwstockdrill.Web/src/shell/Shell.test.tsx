import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";

import { EXAMPLE_ITEM, MAIN_ITEMS } from "./navigation";
import { Shell } from "./Shell";

function render(pathname: string): string {
    return renderToStaticMarkup(
        <Router ssrPath={pathname}>
            <Shell>
                <p>content</p>
            </Shell>
        </Router>,
    );
}

describe("Shell", () => {
    it("links every area and the template's example, each with its label", () => {
        const html = render("/companies");

        for (const { label, href } of [...MAIN_ITEMS, EXAMPLE_ITEM]) {
            expect(html).toContain(`href="${href}"`);
            expect(html).toContain(`>${label}</span>`);
        }
    });

    it("marks only the item of the open screen, also on a screen under it", () => {
        const html = render("/portfolio/CDR.WA");

        expect(html.match(/aria-current="page"/g)).toHaveLength(1);
        expect(html).toMatch(/<a [^>]*aria-current="page"[^>]*href="\/portfolio"/);
    });
});
