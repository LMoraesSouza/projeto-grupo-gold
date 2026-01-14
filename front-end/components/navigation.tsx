"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from './ui/button'
import { ROUTES } from '@/types/enums'
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"


export function Navigation(){
    const { user } = useAuth();
    console.log(user)
    const router = useRouter()
    const pathname = usePathname()

    const onClick = (href: string) => {
        router.push(href)
    }
    const routes = [
        {
            href: ROUTES.ADMIN_DASHBOARD,
            label: 'Agendamentos',
            role: 'admin'
        },
        {
            href: ROUTES.CLIENTS,
            label: 'Clientes',
            role: 'admin'
        },
        {
            href: ROUTES.ADMIN_LOGS,
            label: 'Logs',
            role: 'admin'
        },
        {
            href: ROUTES.DASHBOARD,
            label: 'Agendamentos',
            role: 'user'
        },
        {
            href: ROUTES.MY_ACCOUNT,
            label: 'Minha Conta',
            role: 'user'
        },
        {
            href : ROUTES.LOGS,
            label: 'Logs',
            role: 'user'
        }
    ]

    return (
        <nav className='flex flex-col gap-y-2 pt-5 pr-4 pl-4'>
            {routes.map(route => {
                return (
                    <Button
                        key={route.href}
                        className={cn('w-full justify-start p-3 text-3.5 font-normal ', route.href === pathname ? "text-white" : "text-black hover:bg-gray-200")}
                        variant={route.href === pathname ? "default" : "ghost" }
                        onClick={() => onClick(route.href)}
                    >
                        {(route.label)}
                    </Button>
                )
            })}
        </nav>
    )

    
}