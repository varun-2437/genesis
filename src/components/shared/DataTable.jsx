import React, { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, ChevronsUpDown, Download, Search, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function DataTable({
  data = [],
  columns = [],
  searchPlaceholder = 'Search records...',
  toolbarActions,
  onRowSelectionChange,
  emptyMessage = 'No matching records found.',
  pageSize = 10,
}) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater)
      if (onRowSelectionChange) {
        onRowSelectionChange(typeof updater === 'function' ? updater(rowSelection) : updater)
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  const exportToCSV = () => {
    if (!data.length) return
    const visibleColumns = columns.filter((c) => c.accessorKey || c.id)
    const headers = visibleColumns.map((c) => c.header || c.accessorKey || c.id).join(',')
    const rows = data.map((row) =>
      visibleColumns
        .map((c) => {
          const val = row[c.accessorKey || c.id] ?? ''
          return `"${String(val).replace(/"/g, '""')}"`
        })
        .join(',')
    )
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `export_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const selectedRowsCount = Object.keys(rowSelection).length

  return (
    <div className="space-y-3">
      {/* Top Filter & Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="input pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {selectedRowsCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent-soft text-accent text-xs font-semibold rounded border border-accent/20">
              <CheckSquare size={14} strokeWidth={1.75} />
              <span>{selectedRowsCount} selected</span>
            </div>
          )}

          <Button variant="secondary" size="sm" onClick={exportToCSV}>
            <Download size={14} strokeWidth={1.75} /> Export CSV
          </Button>

          {toolbarActions}
        </div>
      </div>

      {/* Table Shell */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sortDirection = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={canSort ? 'cursor-pointer select-none hover:text-fg' : ''}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="text-fg-subtle">
                            {sortDirection === 'asc' ? (
                              <ChevronUp size={14} strokeWidth={1.75} className="text-accent" />
                            ) : sortDirection === 'desc' ? (
                              <ChevronDown size={14} strokeWidth={1.75} className="text-accent" />
                            ) : (
                              <ChevronsUpDown size={14} strokeWidth={1.75} className="opacity-40" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-fg-muted text-xs">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Bar */}
        {table.getPageCount() > 1 && (
          <div className="px-4 py-2.5 bg-surface-2 border-t border-line flex items-center justify-between text-xs text-fg-muted">
            <div className="tabular-nums">
              Showing {table.getState().pagination.pageIndex * pageSize + 1} to{' '}
              {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, data.length)} of {data.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <span className="font-medium text-fg tabular-nums">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
