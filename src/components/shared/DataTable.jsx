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
  searchKey,
  searchPlaceholder = 'Search records...',
  toolbarActions,
  enableRowSelection = false,
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
    <div className="space-y-4">
      {/* Top Filter & Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          {selectedRowsCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-lg">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>{selectedRowsCount} selected</span>
            </div>
          )}

          <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-1.5 text-xs text-slate-600">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>

          {toolbarActions}
        </div>
      </div>

      {/* Table Shell */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-slate-50 border-b border-slate-200">
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort()
                    const sortDirection = header.column.getIsSorted()
                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 ${
                          canSort ? 'cursor-pointer select-none hover:text-slate-900 transition-colors' : ''
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span className="text-slate-400">
                              {sortDirection === 'asc' ? (
                                <ChevronUp className="w-3.5 h-3.5 text-indigo-600" />
                              ) : sortDirection === 'desc' ? (
                                <ChevronDown className="w-3.5 h-3.5 text-indigo-600" />
                              ) : (
                                <ChevronsUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
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
            <tbody className="divide-y divide-slate-100">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-default"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3.5 text-slate-700 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 text-sm">
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {table.getPageCount() > 1 && (
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing {table.getState().pagination.pageIndex * pageSize + 1} to{' '}
              {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, data.length)} of {data.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="text-xs px-2.5 py-1"
              >
                Previous
              </Button>
              <span className="font-medium text-slate-700">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="text-xs px-2.5 py-1"
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
