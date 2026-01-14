"use client";

import { Navigation } from "./navigation";
import { useMedia } from 'react-use'

export function SideBar() {
    const isMobile = useMedia("(max-width: 1024px", false)
    
    if (isMobile) {
        return null;
    }
    return (
        <div className="w-65 p border-r border-b h-screen">
            
            <Navigation />
        </div>
    )
}