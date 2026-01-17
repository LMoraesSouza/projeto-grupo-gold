"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Actions } from "./actions"
import { DataGridHeaderButton } from "@/components/data-grid-header-button"
import { RiArrowUpDownFill } from "@remixicon/react"
import { Badge } from "@/components/ui/badge"
import { lightFormat } from "date-fns";
import { User } from "@/types/entities"
import { Permissions } from "./permissions"

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Data de Cadastro"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <RiArrowUpDownFill className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({row}) => {
          return <p>{lightFormat(new Date(row.original.createdAt), 'dd/MM/yyyy,HH:mm').split(',').join(' às ')}</p>
        }
    }, 
    {
        id: 'fullName',
        accessorFn: (row) => `${row.name} ${row.lastName}`.toLowerCase(),
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
            <p className="text-3.5 font-medium color-black leading-5.5">{`${row.original.name} ${row.original.lastName}`}</p>
            {row.original.role === 'CLIENT' && <span className="text-3 font-normal color-black leading-5.5">Cliente</span>}
            {row.original.role === 'ADMIN' && <span className="text-3 font-normal color-black leading-5.5">Administrador</span>}
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
        cell: ({ row }) => (
            <p className="text-3 font-normal color-white text-wrap max-w-78.75">
              {`${row.original.address}, ${row.original.number}, ${row.original.district} - ${row.original.city}, ${row.original.state}`}
            </p>
        ),
    },    
    {
      id: "permissions",
      header: () => <p className="ml-3">Permissões</p>,
      cell: ({row}) => <Permissions userId={row.original.id} permissions={row.original.permissions}/>
    },
    {
      id: "isActive",
      header: () => <p className="ml-3">Status</p>,
      cell: ({row}) => <Actions id={row.original.id} status={row.original.isActive} />
    }
]
