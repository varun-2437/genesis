import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const DEFAULT_COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6']

export function ChartCard({
  title,
  subtitle,
  type = 'area', // 'area' | 'bar' | 'line' | 'pie'
  data = [],
  dataKeys = [{ key: 'value', name: 'Value', color: '#6366f1' }],
  xAxisKey = 'name',
  height = 300,
  action,
  className = '',
  colors = DEFAULT_COLORS,
  showGrid = true,
  stacked = false
}) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-base">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )

  function renderChart() {
    if (!data || data.length === 0) {
      return (
        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
          No data available
        </div>
      )
    }

    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />}
            <XAxis dataKey={xAxisKey} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />}
            {dataKeys.map((dk, idx) => (
              <Bar
                key={dk.key}
                dataKey={dk.key}
                name={dk.name || dk.key}
                fill={dk.color || colors[idx % colors.length]}
                stackId={stacked ? 'a' : undefined}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        )

      case 'line':
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />}
            <XAxis dataKey={xAxisKey} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />}
            {dataKeys.map((dk, idx) => (
              <Line
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                name={dk.name || dk.key}
                stroke={dk.color || colors[idx % colors.length]}
                strokeWidth={2.5}
                dot={{ r: 3, fill: dk.color || colors[idx % colors.length] }}
              />
            ))}
          </LineChart>
        )

      case 'pie':
        return (
          <PieChart>
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Pie
              data={data}
              dataKey={dataKeys[0]?.key || 'value'}
              nameKey={xAxisKey}
              cx="50%"
              cy="50%"
              outerRadius={height / 3.2}
              innerRadius={height / 5.5}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        )

      case 'area':
      default:
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {dataKeys.map((dk, idx) => {
                const c = dk.color || colors[idx % colors.length]
                return (
                  <linearGradient key={`grad-${dk.key}`} id={`grad-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={c} stopOpacity={0.0} />
                  </linearGradient>
                )
              })}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />}
            <XAxis dataKey={xAxisKey} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />}
            {dataKeys.map((dk, idx) => (
              <Area
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                name={dk.name || dk.key}
                stroke={dk.color || colors[idx % colors.length]}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#grad-${dk.key})`}
                stackId={stacked ? '1' : undefined}
              />
            ))}
          </AreaChart>
        )
    }
  }
}
