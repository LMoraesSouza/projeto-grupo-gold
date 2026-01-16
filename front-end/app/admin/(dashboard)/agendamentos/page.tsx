"use client";

import { DataTable } from "@/components/data-table";
import { columns } from './columns'
import { mockData } from "./appointmentMockData";

export default function AppointmentsPage() {

    const appointments = mockData;

    

    return(
        
        
            <div className=" mx-8.5 mt-8.5 mb-12.5 flex flex-1 flex-col overflow-y-auto ">             

                <DataTable 
                    columns={columns} 
                    data={appointments}
                    filterKey="name"   
                />

            </div>

            

        )
}