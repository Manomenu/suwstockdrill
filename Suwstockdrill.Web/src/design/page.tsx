import type { ReactNode } from "react";

/** The frame of every screen: its title, then its own content. */
export function Page({ title, children }: { title: string; children?: ReactNode }) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-[26px] leading-[1.35] font-bold wrap-anywhere">{title}</h1>
            {children}
        </div>
    );
}
