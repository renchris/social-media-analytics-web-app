'use server'

import type { DateRange } from 'react-day-picker'
import type {
  MetricType,
  BreakdownType,
  LevelType,
  DateRangeEnumType,
  TimeIncrementType,
} from '@lib/meta'

interface BaseMetaBodyParameters {
  metrics: MetricType[]
  breakdowns: BreakdownType[]
  level: LevelType
  timeIncrement: TimeIncrementType
}

interface EnumDateRangeParameters extends BaseMetaBodyParameters {
  selectedDateRange: DateRangeEnumType
  dateRange?: never
}

interface CustomDateRangeParameters extends BaseMetaBodyParameters {
  dateRange: DateRange
  selectedDateRange?: never
}

type MetaBodyParameters = EnumDateRangeParameters | CustomDateRangeParameters

export default async function handleFormSubmit(formData: FormData): Promise<void> {
  const metrics = formData.getAll('metrics') as MetricType[]
  const breakdowns = formData.getAll('breakdowns') as BreakdownType[]
  const selectedDateRange = formData.get('selectedDateRange') as DateRangeEnumType
  const dateRangeString = formData.get('dateRange') as string
  const dateRange = dateRangeString ? JSON.parse(dateRangeString) : null
  const level = formData.get('level') as LevelType
  const timeIncrement = formData.get('timeIncrement') as TimeIncrementType

  const bodyParameters: MetaBodyParameters = {
    level,
    timeIncrement,
    metrics,
    breakdowns,
    ...(dateRange ? { dateRange } : { selectedDateRange }),
  }
}
