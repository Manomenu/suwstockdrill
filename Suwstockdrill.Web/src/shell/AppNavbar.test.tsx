import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";

import { AppNavbar } from "./AppNavbar";
import { EXAMPLE_ITEM, MAIN_ITEMS } from "./navigation";

function render(pathname: string): string {
    return renderToStaticMarkup(
        <Router ssrPath={pathname}>
            <AppNavbar pathname={pathname} />
        </Router>,
    );
}

describe("AppNavbar", () => {
    it("links every area and the template's example", () => {
        const html = render("/companies");

        for (const { label, href } of [...MAIN_ITEMS, EXAMPLE_ITEM]) {
            expect(html).toContain(`href="${href}"`);
            expect(html).toContain(`>${label}</a>`);
        }
    });

    it("marks only the item of the open screen", () => {
        const html = render("/portfolio");

        expect(html.match(/aria-current="page"/g)).toHaveLength(1);
        expect(html).toMatch(/<a [^>]*aria-current="page"[^>]*>Portfel</);
    });
});
