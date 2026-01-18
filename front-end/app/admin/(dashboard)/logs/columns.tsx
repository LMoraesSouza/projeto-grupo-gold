"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { DataGridHeaderButton } from "@/components/data-grid-header-button"
import { RiArrowUpDownFill } from "@remixicon/react"
import { lightFormat } from "date-fns";
import { Log } from "@/types/entities"
import { Badge } from "@/components/ui/badge"
import { AppointmentIcon } from "@/public/icons/Appointments"
import { RiUserLine } from "@remixicon/react"

export const columns: ColumnDef<Log>[] = [
    
    {
        id: 'fullName',
        accessorFn: (row) => `${row.user.name} ${row.user.lastName}`.toLowerCase(),
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
            <p className="text-3.5 font-medium color-black leading-5.5">{`${row.original.user.name} ${row.original.user.lastName}`}</p>
            {row.original.user.role === 'CLIENT' && <p className="text-[12px] font-normal color-black leading-5.5">Cliente</p>}
            {row.original.user.role === 'ADMIN' && <p className="text-[12px] font-normal color-black leading-5.5">Administrador</p>}
          </div>
        ),
    },
    {
        accessorKey: "activityDescription",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Tipo de atividade"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({ row }) => (
          <Badge className="px-2.5 py-1.5 flex justify-center items-center font-medium text-black text-[10px] border bg-[#F6F4F1] border-[#D7D7D7]">
            {row.original.activityDescription}
          </Badge>
        ),
    },
    {
        accessorKey: "module",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Módulo"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({ row }) => {
          const iconModuleName: {[key: string]: React.ReactNode} = {
            "APPOINTMENTS": <Badge className="space-x-1.5 px-2.5 py-1.5 font-medium flex justify-center items-center text-[10px] text-black border bg-[#F6F4F1] border-[#D7D7D7]">
              <AppointmentIcon />
              Agendamentos
            </Badge>,

            "MY ACCOUNT":<Badge className="space-x-1.5 px-2.5 py-1.5 font-medium flex justify-center items-center text-[10px] text-black border bg-[#F6F4F1] border-[#D7D7D7]">
              <RiUserLine />
              Minha conta
            </Badge>
          }

          return (
            iconModuleName[row.original.module]

          )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Data e horário"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <RiArrowUpDownFill className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({ row }) => {
          
          
          return (
            <Badge className="px-2.5 py-1.5 flex justify-center items-center font-medium text-[10px] text-black border bg-[#F6F4F1] border-[#D7D7D7]">
              {lightFormat(new Date(row.original.createdAt), 'dd/MM/yyyy,HH:mm').split(',').join(' às ')}
            </Badge>
          )
        },
    }, 
    
]
