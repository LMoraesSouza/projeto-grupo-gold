"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { RiSearch2Line } from "@remixicon/react";
import { useEffect } from "react";
import { useLogStore } from "@/stores/logStore";

export default function LogsPage() {

    const { 
        logs, 
        getLogs
    } = useLogStore();
    
    const filters = [
        {
            filterKey: 'fullName',
            startAdornment:<RiSearch2Line />,
            className:"lg:w-110 min-w-45",
            placeholder:"Filtre por nome" ,
        },
        {
            filterKey: 'createdAt',
            className:"w-44.25",
            type:'date' ,
            placeholder:"Selecione",
        }
    ]

    console.log(logs)

    useEffect(() => {
        getLogs()
    }, [])

    return(   
        <div className=" mx-8.5 mt-8.5 mb-12.5 flex flex-1 flex-col overflow-y-auto ">             
            {logs && 
                <DataTable 
                    columns={columns} 
                    data={logs}
                    filters={filters}  
                />
            }
        </div>
    )
}