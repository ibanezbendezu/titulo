"use client";

import { Navigation } from "./_components/navigation";
import {Navbar} from "./_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navbar />
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;