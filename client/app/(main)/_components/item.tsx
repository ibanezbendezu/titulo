"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
    LucideIcon,
} from "lucide-react";
interface ItemProps {
    active?: boolean;
    expanded?: boolean; // expanded = see the children of the document
    isSearched?: boolean;
    level?: number; // to use it to set the padding of the document
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}

export const Item = ({
                         active,
                         isSearched,
                         level = 0,
                         label,
                         onClick,
                         icon: Icon,
                     }: ItemProps) => {

    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
            className={cn(
                "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
            )}
        >
            <span className="truncate">{label}</span>
            {/* Render this part if and only if the "isSearched" prop is true */}
            {isSearched && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">Ctrl+K</span>
                </kbd>
            )}
        </div>
    );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    );
};