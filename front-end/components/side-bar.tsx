"use client";

import { cn } from "@/lib/utils";
import { Navigation } from "./navigation";
import { useMedia } from 'react-use'
import Image from "next/image";

export function SideBar() {
    const isMobile = useMedia("(max-width: 1024px", false)
    
    if (isMobile) {
        return null;
    }
    return (
        <div className="w-65 bg-[#F6F4F1] ">
            <div className={cn("bg-[#F6F4F1] w-65 h-25  flex items-center pl-5.75", isMobile ? "hidden": "")}>
                <Image 
                    src='/logo.svg'
                    alt="Logo Goold"
                    width={52}
                    height={52}
                />
            </div>

            <Navigation />
        </div>
    )
}