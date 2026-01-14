"use client"

import { ROUTES } from '@/types/enums';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { useState } from 'react';
import { Navigation } from './navigation';
import { useMedia } from 'react-use'
import Image from 'next/image';
import { cn } from '@/lib/utils';

const route = {
    [ROUTES.ADMIN_DASHBOARD]: {
        title: 'Agendamentos',
        description: 'Acompanhe todos os agendamentos de clientes de forma simples',
        href: ROUTES.ADMIN_DASHBOARD,
        role: 'admin'
    },
    [ROUTES.ADMIN_LOGS]: {
        title: 'Logs',
        description: 'Acompanhe todos as Logs de clientes',
        href: ROUTES.ADMIN_LOGS,
        role: 'admin'
    },
    [ROUTES.CLIENTS]: {
        title: 'Clientes',
        description: 'Overview de todos os clientes',
        href: ROUTES.CLIENTS,
        role: 'admin'
    },
    [ROUTES.DASHBOARD]: {
        title: 'Agendamentos',
        description: 'Acompante todos os seus agendamentos de forma simples',
        href: ROUTES.DASHBOARD,
        role: 'user'
    },
    [ROUTES.LOGS]: {
        title: 'Logs',
        description: 'Acompanhe todos as suas Logs',
        href: ROUTES.LOGS,
        role: 'user'
    },
    [ROUTES.MY_ACCOUNT]: {
        title: 'Minha Conta',
        description: 'Ajuste informações da sua conta de forma simples',
        href: ROUTES.MY_ACCOUNT,
        role: 'user'
    }

}

export function Header(){
    const [isOpen, setIsOpen] = useState(false)
    
    const pathname = usePathname();
    
    const isMobile = useMedia("(max-width: 1024px", false)
    console.log(isMobile)

    const title = route[pathname as keyof typeof route].title;
    const description = route[pathname as keyof typeof route].description;

    return (
        <header className='bg-white border flex items-center'>
            <div className={cn("p-6 bg-[#F6F4F1] w-64.75 border-r", isMobile ? "hidden": "")}>
                <Image 
                    src='/logo.svg'
                    alt="Logo Goold"
                    width={51.7}
                    height={51.7}
                />
            </div>

            <div className='pl-8.5 space-y-1.5 flex flex-col'>
                <h1 className='font-semibold text-[28px]'>
                    {title}
                </h1>
                <p className='font-normal text-3.5'>
                    {description}
                </p>
            </div>
            
           
            <Sheet open={isOpen} onOpenChange={setIsOpen} >
                <SheetTrigger>
                    <Button 
                        variant="ghost" 
                        className="md:hidden p-0"
                    >
                        <MenuIcon className='size-6' size={36} />
                    </Button>

                </SheetTrigger>

                <SheetContent side='left' className='flex flex-col gap-0'>
                    <div className={cn("p-6 bg-[#F6F4F1] border-b")}>
                        <Image 
                            src='/logo.svg'
                            alt="Logo Goold"
                            width={51.7}
                            height={51.7}
                        />
                    </div>
                    

                    <Navigation />  

                </SheetContent>
            </Sheet> 


        </header>
    )
}