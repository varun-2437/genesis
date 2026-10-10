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

export function ChartCard({
  title,
  subtitle,
  type = 'area', // 'area' | 'bar' | 'line' | 'pie'
  data = [],
  dataKeys = [{ key: 'value', name: 'Value' }],
  xAxisKey = 'name',
  height = 260,
  action,
  className = '',
  showGrid = true,
}) {
  // Theme colours via CSS variables
  const c = (v) => `rgb(var(--${v}))`
  const seriesPalette = [c('accent'), c('info'), c('warning'), c('fg-subtle')]

  return (
    <div className={`card p-5 flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-fg text-[14px]">{title}</h3>
          {subtitle && <p className="text-xs text-fg-muted mt-0.5">{subtitle}</p>}
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
        <div className="h-full flex items-center justify-center text-fg-subtle text-xs">
          No data available
        </div>
      )
    }

    if (type === 'bar') {
      return (
        <BarChart data={data}>
          {showGrid && <CartesianGrid stroke={c('line')} vertical={false} strokeDasharray="3 3" />}
          <XAxis dataKey={xAxisKey} tick={{ fill: c('fg-muted'), fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: c('fg-muted'), fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: c('surface'), borderColor: c('line'), borderRadius: '6px', fontSize: '12px', color: c('fg') }}
            cursor={{ fill: 'rgba(var(--surface-2), 0.5)' }}
          />
          {dataKeys.map((dk, index) => (
            <Bar
              key={dk.key}
              dataKey={dk.key}
              name={dk.name || dk.key}
              fill={dk.color || seriesPalette[index % seriesPalette.length]}
              radius={[3, 3, 0, 0]}
            />
          ))}
          {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />}
        </BarChart>
      )
    }

    if (type === 'line') {
      return (
        <LineChart data={data}>
          {showGrid && <CartesianGrid stroke={c('line')} vertical={false} strokeDasharray="3 3" />}
          <XAxis dataKey={xAxisKey} tick={{ fill: c('fg-muted'), fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: c('fg-muted'), fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: c('surface'), borderColor: c('line'), borderRadius: '6px', fontSize: '12px', color: c('fg') }} />
          {dataKeys.map((dk, index) => (
            <Line
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              name={dk.name || dk.key}
              stroke={dk.color || seriesPalette[index % seriesPalette.length]}
              strokeWidth={2}
              dot={{ r: 3, fill: dk.color || seriesPalette[index % seriesPalette.length] }}
            />
          ))}
          {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />}
        </LineChart>
      )
    }

    if (type === 'pie') {
      return (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey={dataKeys[0]?.key || 'value'}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || seriesPalette[index % seriesPalette.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: c('surface'), borderColor: c('line'), borderRadius: '6px', fontSize: '12px', color: c('fg') }} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
        </PieChart>
      )
    }

    // Default 'area'
    return (
      <AreaChart data={data}>
        {showGrid && <CartesianGrid stroke={c('line')} vertical={false} strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisKey} tick={{ fill: c('fg-muted'), fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: c('fg-muted'), fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ backgroundColor: c('surface'), borderColor: c('line'), borderRadius: '6px', fontSize: '12px', color: c('fg') }} />
        {dataKeys.map((dk, index) => (
          <Area
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            name={dk.name || dk.key}
            stroke={dk.color || seriesPalette[index % seriesPalette.length]}
            fill={dk.color || seriesPalette[index % seriesPalette.length]}
            fillOpacity={0.12}
            strokeWidth={1.75}
          />
        ))}
        {dataKeys.length > 1 && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />}
      </AreaChart>
    )
  }
}
