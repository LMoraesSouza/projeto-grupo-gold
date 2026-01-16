"use client"



import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Actions } from "./actions"
import { DataGridHeaderButton } from "@/components/data-grid-header-button"
import { RiArrowUpDownFill } from "@remixicon/react"
import { Badge } from "@/components/ui/badge"

interface ResponseType  {
  id: number,
  role: string,
  date: string,
  name: string,
  room: string,
  status: string
  
}

export const columns: ColumnDef<ResponseType>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Data de Cadastro"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <RiArrowUpDownFill className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        }
    }, 
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Name"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({ row }) => (
          <div className="space-y-0.5">
            <p className="text-3.5 font-medium color-black leading-5.5">{row.original.name}</p>
            {row.original.role === 'client' && <span className="text-3 font-normal color-black leading-5.5">Cliente</span>}
            {row.original.role === 'admin' && <span className="text-3 font-normal color-black leading-5.5">Administrador</span>}
          </div>
        ),
    },
    {
        accessorKey: "room",
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
            
            "Em análise":  <Badge className="px-3.25 py-1.25 flex justify-center items-center border-[#A4AAAD] border bg-[#F5F5F5]">
                <p className="text-3 font-normal text-[#676767]">{row.original.status}</p>
              </Badge>
            ,
            "Agendado":  <Badge className="px-2.5 py-1.25 flex justify-center items-center border-[#10C3A9] border bg-[#DBFFFA]">
                <p className="text-3 font-normal text-[#10C3A9] ">{row.original.status}</p>
              </Badge>
            ,
            "Cancelado": <Badge className="px-2.5 py-1.25 flex justify-center items-center border-[#FF0000] border bg-[#FFF5F5]">
                <p className="text-3 font-normal text-[#EA0000]">{row.original.status}</p>
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
