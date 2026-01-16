"use client"

import { ROUTES } from '@/types/enums';
import { usePathname } from 'next/navigation';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { useState } from 'react';
import { Navigation } from './navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { RiMenuLine } from '@remixicon/react';

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
    

    const title = route[pathname as keyof typeof route].title;
    const description = route[pathname as keyof typeof route].description;

    return (
        <header className='bg-white flex items-center border-b lg:h-25 pt-5.5 pb-5.25 gap-3 '>
            
            <div className='pl-8.5 space-y-1 flex flex-col flex-1 '>
                <h1 className='font-semibold text-[28px] '>
                    {title}
                </h1>
                <p className='font-normal text-3.5'>
                    {description}
                </p>
            </div>
            
           
            <Sheet open={isOpen} onOpenChange={setIsOpen} >
                <SheetTrigger className='lg:hidden mr-6 ml-auto'>
                    
                    <RiMenuLine className='size-6' size={36} />

                </SheetTrigger>

                <SheetContent side='left' className='flex flex-col gap-0'>
                    <SheetHeader className='p-0 '>
                        
                        <SheetTitle className='hidden'></SheetTitle>
                        <div className={cn("p-6 bg-[#F6F4F1] border-b")}>
                            <Image 
                                src='/logo.svg'
                                alt="Logo Goold"
                                width={52}
                                height={52}
                            />
                        </div>

                    </SheetHeader>
                    

                    <Navigation 
                        hideBar={() => setIsOpen(false)}
                    />

                </SheetContent>
            </Sheet> 


        </header>
    )
}