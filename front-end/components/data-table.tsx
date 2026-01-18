"use client"
import * as React from "react"
import { Input, InputProps } from "@/components/ui/input"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyData } from "./empty-data"
import { cn } from "@/lib/utils"
import { DataPageControl } from "./data-page-controll"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filters: Filter[]
  tableControl?: React.ReactNode
  onDelete?: (rows: Row<TData>[]) => void
  disabled?: boolean
}

interface Filter extends InputProps {
    filterKey: string,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  tableControl
//   filterKey,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection
        },
    })

    return (
        <>
            <div className="overflow-y-auto border rounded-md px-8.5 pt-8.5 flex flex-1 flex-col pb-12.5">
                <div className="flex items-center flex-wrap border-b pb-5 justify-between gap-3.75">
                    <div className="flex flex-wrap gap-3.75 lg:flex-row lg:items-center lg:justify-between ">
                        {
                            filters.map(filter => {
                                return <Input
                                            key={filter.filterKey}
                                            {...filter}
                                            onChange={(event) =>{
                                                return table.getColumn(filter.filterKey)?.setFilterValue(event.target.value)
                                            }}
                                        />    
                            })
                        }                        
                    </div>
                    {tableControl}
                    
                </div>
                {!table.getRowModel().rows?.length ? 

                <div className="flex flex-1 justify-center items-center">
                    <EmptyData />
                
                </div>
                :
                <div className="pt-5">
                    <Table className="">
                        <TableHeader className="">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="m-0" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead
                                    className="px-0"
                                    key={header.id}
                                >
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </TableHead>
                                )
                            })}
                            </TableRow>
                        ))}
                        </TableHeader>
                        <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                if(table.getAllColumns().find(column => column.id === 'status')){
                                    const color: {[key: string]: string} = {
                                        "SCHEDULED": 'bg-[#F2FFFD]',
                                        "CANCELED": 'bg-[#FFF3F3]',
                                        "PENDING": 'bg-[#FFFFFF]'
                                    }

                                    return (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            className={cn("h-12 p-0 ", color[row.getValue('status') as string])}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                            <TableCell className='pl-3' key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                }

                                return <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="h-12 p-0 "
                                >
                                    {row.getVisibleCells().map((cell) => (
                                    <TableCell className='pl-3' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                    ))}
                                </TableRow>
                            })
                        ) : (
                            'No data'
                        )}
                        </TableBody>
                    </Table>
                </div>
                }
            </div>
            <DataPageControl 
                page={table.getState().pagination.pageIndex}
                previousPage={() => table.previousPage()}
                canGoPrevious={table.getCanPreviousPage()}
                nextPage={() => table.nextPage()}
                canGoNext={table.getCanNextPage()}

            />
        </>

    )
}
