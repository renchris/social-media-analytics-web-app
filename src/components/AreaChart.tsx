'use client'

import {
  Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart'
import { MetricType } from '@lib/meta'

interface FormattedMetricData {
  date_start: string
  date_stop: string
  [key: string]: string | number | undefined
}

interface AreaChartProps {
  data: FormattedMetricData[]
}

const breakdownColors = {
  male: 'hsl(var(--chart-1))',
  female: 'hsl(var(--chart-2))',
  unknown: 'hsl(var(--chart-3))',
  '13-17': 'hsl(var(--chart-1))',
  '18-24': 'hsl(var(--chart-2))',
  '25-34': 'hsl(var(--chart-3))',
  '35-44': 'hsl(var(--chart-4))',
  '45-54': 'hsl(var(--chart-5))',
  '55-64': 'hsl(var(--chart-6))',
  '65+': 'hsl(var(--chart-7))',
}

const breakdownLabels = {
  male: 'Male',
  female: 'Female',
  unknown: 'Unknown',
  '13-17': '13-17',
  '18-24': '18-24',
  '25-34': '25-34',
  '35-44': '35-44',
  '45-54': '45-54',
  '55-64': '55-64',
  '65+': '65+',
}

const metricColors = {
  impressions: 'hsl(var(--chart-1))',
  spend: 'hsl(var(--chart-2))',
  clicks: 'hsl(var(--chart-3))',
  ctr: 'hsl(var(--chart-4))',
  conversions: 'hsl(var(--chart-5))',
  cost_per_conversion: 'hsl(var(--chart-6))',
  conversion_rate: 'hsl(var(--chart-7))',
}

const metricLabels = {
  impressions: 'Impressions',
  spend: 'Spend ($)',
  clicks: 'Clicks',
  ctr: 'Click-through Rate',
  conversions: 'Conversions',
  cost_per_conversion: 'Cost per Conversion ($)',
  conversion_rate: 'Conversion Rate',
}

const formatMetricValue = (metric: MetricType, value: number) => {
  switch (metric) {
    case 'spend':
    case 'cost_per_conversion':
      return `$${value.toFixed(2)}`
    case 'ctr':
    case 'conversion_rate':
      return `${value.toFixed(2)}%`
    default:
      return value.toLocaleString()
  }
}

const breakdownOrders = {
  gender: ['unknown', 'female', 'male'],
  age: ['65+', '55-64', '45-54', '35-44', '25-34', '18-24', '13-17'],
}

const getBreakdownChartConfig = (metric: MetricType, breakdownKeys: string[]) => {
  const isAgeBreakdown = breakdownKeys.some((key) => key.includes('-') || key === '65+')
  const orderArray = isAgeBreakdown ? breakdownOrders.age : breakdownOrders.gender
  const sortedBreakdownKeysByOrder = [...breakdownKeys].sort((a, b) => {
    const aIndex = orderArray.indexOf(a)
    const bIndex = orderArray.indexOf(b)
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  return Object.fromEntries(
    sortedBreakdownKeysByOrder.map((key) => [
      `${key}_${metric}`,
      {
        label: breakdownLabels[key as keyof typeof breakdownLabels] || key,
        color: breakdownColors[key as keyof typeof breakdownColors] || 'hsl(var(--chart-1))',
      },
    ]),
  ) as ChartConfig
}

const getBaseChartConfig = (metrics: MetricType[]) => Object.fromEntries(
  metrics.map((metric) => [
    metric,
    {
      label: metricLabels[metric],
      color: metricColors[metric],
    },
  ]),
) as ChartConfig

const getMetricLabel = (metric: MetricType | undefined) => {
  if (!metric) return 'Metrics'
  return metricLabels[metric] || metric
}

const getTimeIncrement = (data: FormattedMetricData[]) => {
  if (data.length < 2) return 'time'

  // Get first two dates to determine increment
  const date1 = new Date(data[0].date_start)
  const date2 = new Date(data[1].date_start)
  const diffDays = Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays >= 28) return 'monthly'
  if (diffDays >= 7) return 'weekly'
  return 'daily'
}

const AreaChartComponent = ({ data }: AreaChartProps) => {
  if (!data || data.length === 0) {
    return null
  }

  const timeIncrement = getTimeIncrement(data)
  const allKeys = Object.keys(data[0]).filter((key) => !['date_start', 'date_stop'].includes(key))
  const hasBreakdown = allKeys.some((key) => key.includes('_'))

  const breakdownKeys = hasBreakdown
    ? allKeys
      .filter((key) => key.includes('_'))
      .map((key) => key.split('_')[0])
      .filter((value, index, self) => self.indexOf(value) === index)
    : []

  const availableMetrics = (hasBreakdown
    ? allKeys
      .filter((key) => key.includes('_'))
      .map((key) => key.split('_')[1])
      .filter((value, index, self) => self.indexOf(value) === index)
    : allKeys) as MetricType[]

  const chartConfig = hasBreakdown
    ? getBreakdownChartConfig(availableMetrics[0], breakdownKeys)
    : getBaseChartConfig(availableMetrics)

  const baseMetric = availableMetrics[0]
  const metricLabel = getMetricLabel(baseMetric)
  const breakdownType = breakdownKeys[0]

  const getChartTitle = () => {
    if (!hasBreakdown) {
      if (availableMetrics.length > 1) {
        return 'Multiple Metrics Comparison'
      }
      return metricLabel
    }
    if (!breakdownType) return metricLabel
    return `${metricLabel} by ${breakdownType.charAt(0).toUpperCase() + breakdownType.slice(1)}`
  }

  const getChartDescription = () => {
    if (!hasBreakdown) {
      if (availableMetrics.length > 1) return 'Comparing multiple metrics over time'
      return `${timeIncrement.charAt(0).toUpperCase() + timeIncrement.slice(1)} ${metricLabel.toLowerCase()} over time`
    }
    return `Distribution of ${metricLabel.toLowerCase()} across ${breakdownType} groups`
  }

  const getFooterText = () => {
    if (!hasBreakdown) {
      if (availableMetrics.length > 1) {
        return 'Multiple metrics comparison'
      }
      return `${timeIncrement.charAt(0).toUpperCase() + timeIncrement.slice(1)} ${metricLabel.toLowerCase()}`
    }
    return `${metricLabel} by ${breakdownType}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {getChartTitle()}
        </CardTitle>
        <CardDescription>
          {getChartDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
          >
            <defs>
              {Object.entries(chartConfig).map(([key, value]) => (
                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date_start"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatMetricValue(baseMetric, value)}
            />
            {!hasBreakdown && availableMetrics.length > 1
              && availableMetrics.slice(1).map((metric) => (
                <YAxis
                  key={metric}
                  yAxisId={metric}
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => formatMetricValue(metric, value)}
                />
              ))}
            <Legend />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {Object.entries(chartConfig).map(([key, config]) => {
              const metric = !hasBreakdown ? key as MetricType : key.split('_')[1] as MetricType
              const yAxisProps = !hasBreakdown && metric !== availableMetrics[0]
                ? { yAxisId: metric }
                : {}

              return (
                <Area
                  key={key}
                  dataKey={key}
                  name={String(config.label)}
                  type="monotone"
                  fill={`url(#fill${key})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${key})`}
                  stackId={hasBreakdown ? 'a' : undefined}
                  {...yAxisProps}
                />
              )
            })}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AreaChartComponent
