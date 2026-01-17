"use client";

import { DataTable } from "@/components/data-table";
import { columns } from './columns'
import { useEffect } from "react";
import { useAppointmentStore } from "@/stores/appointmentsStore";
import { RiSearch2Line } from "@remixicon/react";
import { Button } from "@/components/ui/button";

export default function AppointmentsPage() {
    const { 
        appointments, 
        getAppointments
    } = useAppointmentStore();
    
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
        getAppointments()
    }, [])

    function handleClick() {
        //  todo
    }

    return(
        
        
            <div className=" mx-8.5 mt-8.5 mb-12.5 flex flex-1 flex-col overflow-y-auto ">             
                {appointments && 
                    <DataTable 
                        columns={columns} 
                        data={appointments}
                        filters={filters}  
                        tableControl={
                            <Button 
                                onClick={handleClick}
                                className="px-9.25 text-4 font-semibold text-white"
                            >
                                Ajustes de Agendamento
                            </Button>
                        }
                    />
                }
                
            </div>

            

        )
}