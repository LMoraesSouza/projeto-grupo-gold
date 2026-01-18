"use client";

import { DataTable } from "@/components/data-table";
import { columns } from './columns'
import { useEffect } from "react";
import { RiSearch2Line } from "@remixicon/react";
import { useUserStore } from "@/stores/userStore";

export default function AppointmentsPage() {
    const { 
        users, 
    } = useUserStore();
    
    const filters = [
        {
            filterKey: 'fullName',
            startAdornment:<RiSearch2Line />,
            className:"lg:w-110 min-w-45",
            placeholder:"Filtre por nome" ,
        },
        {
            filterKey: 'dateTime',
            className:"w-44.25",
            type:'date' ,
            placeholder:"Selecione",
        }
    ]

    useEffect(() => {
       
    }, [])

    return(
        
        
            <div className=" mx-8.5 mt-8.5 mb-12.5 flex flex-1 flex-col overflow-y-auto ">             
                {users && 
                    <DataTable 
                        columns={columns} 
                        data={users}
                        filters={filters}  
                    />
                }
                
            </div>

            

        )
}