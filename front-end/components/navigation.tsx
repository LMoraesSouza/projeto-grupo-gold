"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from './ui/button'
import { ROUTES } from '@/types/enums'
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { AppointmentIcon } from "@/public/icons/Appointments"
import { LogsIcon } from "@/public/icons/Logs"
import { MyAccountIcon } from "@/public/icons/MyAccount"
import { RiUserLine } from "@remixicon/react"


export function Navigation({hideBar}: {hideBar?: () => void}) {
    const { user } = useAuth();

    const router = useRouter()
    const pathname = usePathname()

    const onClick = (href: string) => {
        if (hideBar) {
            hideBar();
        }

        router.push(href)
    }
    const routes = [
        {
            href: ROUTES.ADMIN_DASHBOARD,
            label: 'Agendamentos',
            role: 'ADMIN',
            icon: AppointmentIcon
        },
        {
            href: ROUTES.CLIENTS,
            label: 'Clientes',
            role: 'ADMIN',
            icon: RiUserLine
        },
        {
            href: ROUTES.ADMIN_LOGS,
            label: 'Logs',
            role: 'ADMIN',
            icon: LogsIcon,
        },
        {
            href: ROUTES.DASHBOARD,
            label: 'Agendamentos',
            role: 'CLIENT',
            icon: AppointmentIcon
        },
        {
            href: ROUTES.MY_ACCOUNT,
            label: 'Minha Conta',
            role: 'CLIENT',
            icon: MyAccountIcon
        },
        {
            href : ROUTES.LOGS,
            label: 'Logs',
            role: 'CLIENT',
            icon: LogsIcon,
        }
    ]

    return (
        <nav className='flex flex-col gap-y-2 pt-5 pr-4 pl-4 border-t'>
            {routes.filter(route => route.role === user?.role).map(route => {
                return (
                    <Button
                        key={route.href}
                        className={cn('gap-3.75 w-full justify-start p-3 text-3.5 font-normal ', route.href === pathname ? "text-white" : "text-black hover:bg-gray-200")}
                        variant={route.href === pathname ? "default" : "ghost" }
                        onClick={() => onClick(route.href)}
                    >
                        {route.icon && <route.icon className="size-5" color={route.href === pathname ? "white" : "black"   }/>}
                        {(route.label)}
                    </Button>
                )
            })}
        </nav>
    )

    
}