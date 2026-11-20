import { AppShell, NavLink } from "@maniumek/suwfrontkit";
import { ChartCandlestick } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";

import { EXAMPLE_ITEM, HOME_HREF, isCurrent, MAIN_ITEMS, type NavigationItem } from "./navigation";

export function Shell({ children }: { children: ReactNode }) {
    const [pathname] = useLocation();

    function item({ label, href, icon: Icon }: NavigationItem) {
        return (
            <NavLink key={href} asChild icon={<Icon />} label={label} current={isCurrent(pathname, href)}>
                <Link href={href} />
            </NavLink>
        );
    }

    return (
        <AppShell
            appIcon={<ChartCandlestick />}
            appTitle="Suwstockdrill"
            home={(link) => <Link href={HOME_HREF} {...link} />}
            panel={
                <nav aria-label="Główna" className="flex min-h-0 flex-1 flex-col gap-0.5">
                    {MAIN_ITEMS.map(item)}
                    <div className="mt-auto border-t border-border pt-2">{item(EXAMPLE_ITEM)}</div>
                </nav>
            }
            panelLabel="Panel nawigacji"
            storageKey="suwstockdrill.navigation-panel"
        >
            {children}
        </AppShell>
    );
}
