import { expect, test, type Page } from "@playwright/test";

const AREAS = ["Spółki", "Teza", "Monitoring", "Briefy", "Notatnik", "Portfel", "Backtesty"];

const toggleOf = (page: Page) => page.getByRole("button", { name: "Panel nawigacji" });

const navigationOf = (page: Page) => page.getByRole("navigation", { name: "Główna" });

async function widthOf(page: Page, selector: string): Promise<number> {
    const box = await page.locator(selector).boundingBox();
    if (box === null) throw new Error(`${selector} is not on the screen`);
    return box.width;
}

test("the start address opens the first area, and every item opens its screen, named in the browser tab, and is marked", async ({
    page,
}) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/companies$/);

    for (const area of AREAS) {
        await navigationOf(page).getByRole("link", { name: area, exact: true }).click();
        await expect(page.getByRole("heading", { level: 1, name: area, exact: true })).toBeVisible();
        await expect(page).toHaveTitle(`${area} · Suwstockdrill`);
        await expect(navigationOf(page).getByRole("link", { name: area, exact: true })).toHaveAttribute("aria-current", "page");
    }
});

test("the toggle collapses the panel to a strip of icons and back, the content gets the width, and the choice survives a reload", async ({
    page,
}) => {
    await page.goto("/companies");
    await expect(toggleOf(page)).toHaveAttribute("aria-expanded", "true");
    const expandedContent = await widthOf(page, "main");

    await toggleOf(page).click();

    await expect(toggleOf(page)).toHaveAttribute("aria-expanded", "false");
    expect(await widthOf(page, "#navigation-panel")).toBeLessThanOrEqual(64);
    expect(await widthOf(page, "main")).toBeGreaterThan(expandedContent + 100);
    await navigationOf(page).getByRole("link", { name: "Portfel", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Portfel", exact: true })).toBeVisible();

    await page.reload();
    await expect(toggleOf(page)).toHaveAttribute("aria-expanded", "false");

    await toggleOf(page).click();
    await page.reload();
    await expect(toggleOf(page)).toHaveAttribute("aria-expanded", "true");
});
