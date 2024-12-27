'use client'

import { useState } from 'react'
import { type MetricType, METRICS } from '@lib/meta'
import CheckboxButton from './CheckboxButton'

const MetricsButtons = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<MetricType[]>(['impressions'])
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Metrics</h2>
      <div className="flex flex-wrap gap-2">
        {METRICS.map((metric) => (
          <CheckboxButton
            key={metric.value}
            id={`metric-${metric.value}`}
            name="metrics"
            value={metric.value}
            checked={selectedMetrics.includes(metric.value)}
            onChange={(e) => {
              if (!e.target.checked && selectedMetrics.length <= 1) return
              setSelectedMetrics(
                e.target.checked
                  ? [...selectedMetrics, metric.value]
                  : selectedMetrics.filter((m) => m !== metric.value),
              )
            }}
          >
            {metric.label}
          </CheckboxButton>
        ))}
      </div>
    </div>
  )
}

export default MetricsButtons
