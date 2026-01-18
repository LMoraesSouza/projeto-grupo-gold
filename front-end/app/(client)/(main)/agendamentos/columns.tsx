"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Actions } from "./actions"
import { DataGridHeaderButton } from "@/components/data-grid-header-button"
import { RiArrowUpDownFill } from "@remixicon/react"
import { Badge } from "@/components/ui/badge"
import { lightFormat } from "date-fns";
import { Appointment } from "@/types/entities"

export const columns: ColumnDef<Appointment>[] = [
    {
        accessorKey: "dateTime",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Data agendamento"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <RiArrowUpDownFill className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({row}) => {
          return <p>{lightFormat(new Date(row.original.dateTime), 'dd/MM/yyyy,HH:mm').split(',').join(' às ')}</p>
        }
    }, 
    {
        id: 'fullName',
        accessorFn: (row) => `${row.user?.name} ${row.user?.lastName}`.toLowerCase(),
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Nome"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({ row }) => (
          <div className="space-y-0.5">
            <p className="text-3.5 font-medium color-black leading-5.5">{`${row.original.user?.name} ${row.original.user?.lastName}`}</p>
            {row.original.user?.role === 'CLIENT' && <span className="text-[12px] font-normal color-black leading-5.5">Cliente</span>}
            {row.original.user?.role === 'ADMIN' && <span className="text-[12px] font-normal color-black leading-5.5">Administrador</span>}
          </div>
        ),
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Sala de agendamento"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({  }) => (
          <Badge className="px-2.5 py-1.5 flex justify-center items-center">
            <p className="text-3 font-normal color-white">Sala <span className="font-bold">012</span></p>
          </Badge>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Status transação"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({ row }) => {
          const mapStatus: {[key: string]: React.ReactNode} = {
            
            "PENDING":  <Badge className="px-3.25 py-1.25 flex justify-center items-center border-[#A4AAAD] border bg-[#F5F5F5]">
                <p className="text-3 font-normal text-[#676767]">Em análise</p>
              </Badge>
            ,
            "SCHEDULED":  <Badge className="px-2.5 py-1.25 flex justify-center items-center border-[#10C3A9] border bg-[#DBFFFA]">
                <p className="text-3 font-normal text-[#10C3A9] ">Agendado</p>
              </Badge>
            ,
            "CANCELED": <Badge className="px-2.5 py-1.25 flex justify-center items-center border-[#FF0000] border bg-[#FFF5F5]">
                <p className="text-3 font-normal text-[#EA0000]">Cancelado</p>
              </Badge>
            
          }
          return mapStatus[row.original.status]
          
        }
    },
    
    {
      id: "actions",
      header: () => <p className="ml-3">Ações</p>,
      cell: ({row}) => <Actions id={row.original.id} status={row.original.status} />
    }
]
