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

interface FormattedMetricData {
  date_start: string
  date_stop: string
  impressions?: number
  female_impressions?: number
  male_impressions?: number
  unknown_impressions?: number
}

interface AreaChartProps {
  data: FormattedMetricData[]
}

const genderChartConfig = {
  male_impressions: {
    label: 'Male',
    color: 'hsl(var(--chart-1))',
  },
  female_impressions: {
    label: 'Female',
    color: 'hsl(var(--chart-2))',
  },
  unknown_impressions: {
    label: 'Unknown',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

const baseChartConfig = {
  impressions: {
    label: 'Impressions',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const AreaChartComponent = ({ data }: AreaChartProps) => {
  const hasGenderData = data.length > 0
    && (data[0].female_impressions !== undefined
     || data[0].male_impressions !== undefined
     || data[0].unknown_impressions !== undefined)

  const chartConfig = hasGenderData ? genderChartConfig : baseChartConfig

  // Calculate max value for Y axis
  const maxValue = data.reduce((max, item) => {
    if (hasGenderData) {
      const total = (item.male_impressions || 0)
                   + (item.female_impressions || 0)
                   + (item.unknown_impressions || 0)
      return Math.max(max, total)
    }
    return Math.max(max, item.impressions || 0)
  }, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{hasGenderData ? 'Gender Breakdown' : 'Impressions Over Time'}</CardTitle>
        <CardDescription>
          {hasGenderData ? 'Showing impressions by gender over time' : 'Showing daily impressions'}
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
              domain={[0, maxValue]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Legend />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {Object.entries(chartConfig).reverse().map(([key, config]) => (
              <Area
                key={key}
                dataKey={key}
                name={config.label}
                type="monotone"
                fill={`url(#fill${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId={hasGenderData ? 'a' : undefined}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {hasGenderData ? 'Distribution by Gender' : 'Daily Impressions'}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AreaChartComponent
