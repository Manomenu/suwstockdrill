import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";

import { cn } from "@/design/classNames";

import { AppNavbar } from "./AppNavbar";
import { HOME_HREF } from "./navigation";
import { storeCollapsed, storedCollapsed } from "./panelPreference";

// Why: Tailwind's lg breakpoint (64rem), so the width JavaScript reads agrees with the CSS.
const NARROW_SCREEN = "(width < 64rem)";

function isNarrow(): boolean {
    return window.matchMedia(NARROW_SCREEN).matches;
}

export function AppShell({ children }: { children: ReactNode }) {
    const [pathname] = useLocation();
    const [collapsed, setCollapsed] = useState(() => storedCollapsed() ?? isNarrow());

    function toggle() {
        setCollapsed(!collapsed);
        storeCollapsed(!collapsed);
    }

    return (
        <div className="min-h-dvh">
            <header className="sticky top-0 z-30 flex h-15 items-center gap-3 border-b border-border bg-background px-4">
                <Link href={HOME_HREF} className="flex items-center gap-2 text-foreground">
                    <img src="/favicon.svg" alt="" width={28} height={28} />
                    <span className="text-lg font-bold">suwstockdrill</span>
                </Link>
            </header>
            <div className="flex">
                <aside
                    id="navigation-panel"
                    className={cn(
                        "sticky top-15 flex h-[calc(100dvh-(--spacing(15)))] shrink-0 flex-col gap-1 overflow-y-auto border-r border-border bg-background p-1.5",
                        collapsed ? "w-12" : "w-55",
                    )}
                >
                    <button
                        type="button"
                        aria-label="Panel nawigacji"
                        aria-expanded={!collapsed}
                        aria-controls="navigation-panel"
                        title={collapsed ? "Pokaż nawigację" : "Ukryj nawigację"}
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground hover:bg-accent/50"
                        onClick={toggle}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" stroke="currentColor" strokeWidth="2">
                            <path d="M2 5h16M2 10h16M2 15h16" />
                        </svg>
                    </button>
                    {!collapsed && (
                        <div className="flex min-h-0 flex-1 flex-col px-1 pb-1">
                            <AppNavbar
                                pathname={pathname}
                                onNavigate={() => {
                                    if (isNarrow()) setCollapsed(true);
                                }}
                            />
                        </div>
                    )}
                </aside>
                <main className="min-w-0 flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}
