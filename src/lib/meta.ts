import type { DateRange } from 'react-day-picker'

export type MetricType = 'impressions' | 'spend' | 'clicks' | 'ctr' | 'conversions' | 'cost_per_conversion' | 'conversion_rate'

export type BreakdownType = 'age' | 'gender' | 'country' | 'region' | 'dma' | 'impression_device' | 'platform_position' | 'publisher_platform'

export type LevelType = 'ad' | 'adset' | 'campaign' | 'account'

let level: LevelType = 'ad'

export function getLevel(): LevelType {
  return level
}

export function setLevel(value: LevelType): void {
  level = value
}

export type DateRangeEnumType = 'last7' | 'last14' | 'last30' | 'lifetime'

export type TimeIncrementType = '1' | '7' | '28' | 'monthly' | 'all_days'

let timeIncrement: TimeIncrementType = '1'

export function getTimeIncrement(): TimeIncrementType {
  return timeIncrement
}

export function setTimeIncrement(value: TimeIncrementType): void {
  timeIncrement = value
}

export interface MetaDataItem {
  date_start: string
  date_stop: string
  age?: string
  gender?: string
  impressions: string | number
  spend: string | number
  clicks: string | number
  ctr: string | number
  conversions: string | number
  cost_per_conversion: string | number
}

export interface ChartDataPoint {
  date: string
  [key: string]: string | number | undefined
}

export interface ApiResponse {
  data: MetaDataItem[]
  error?: string
}

export const METRICS = [
  { label: 'Impressions', value: 'impressions', description: 'Number of times your ad was shown' },
  { label: 'Spend', value: 'spend', description: 'Total amount spent on the ad' },
  { label: 'Clicks', value: 'clicks', description: 'Number of clicks on your ad' },
  { label: 'Click-through Rate', value: 'ctr', description: 'Click-through rate (clicks/impressions)' },
  { label: 'Conversions', value: 'conversions', description: 'Number of conversions' },
  { label: 'Cost per Conversion', value: 'cost_per_conversion', description: 'Average cost per conversion' },
  // {
  //   label: 'Conversion Rate',
  //   value: 'conversion_rate',
  //   description: 'Conversion rate (conversions/clicks)',
  // },
] as const

export const BREAKDOWNS = [
  { label: 'Age', value: 'age' },
  { label: 'Gender', value: 'gender' },
  { label: 'Country', value: 'country' },
  { label: 'Region', value: 'region' },
  { label: 'DMA', value: 'dma' },
  { label: 'Impression Device', value: 'impression_device' },
  { label: 'Platform Position', value: 'platform_position' },
  { label: 'Publisher Platform', value: 'publisher_platform' },
] as const

export const LEVELS = [
  {
    value: 'ad',
    label: 'Ad',
    description: 'Individual ad level metrics',
  },
  {
    value: 'adset',
    label: 'Ad Set',
    description: 'Ad set level aggregated metrics',
  },
  {
    value: 'campaign',
    label: 'Campaign',
    description: 'Campaign level aggregated metrics',
  },
  {
    value: 'account',
    label: 'Account',
    description: 'Account level aggregated metrics',
  },
] as const

export const DATE_RANGE_ENUMS = [
  { value: 'last7', label: 'Last 7 Days' },
  { value: 'last14', label: 'Last 14 Days' },
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'lifetime', label: 'Lifetime' },
] as const

export const TIME_INCREMENTS = [
  { value: '1', label: 'Daily' },
  { value: '7', label: 'Weekly' },
  { value: '28', label: '28 Days' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'all_days', label: 'All Days' },
] as const

export const VALID_BREAKDOWN_COMBINATIONS: readonly BreakdownType[][] = [
  ['age', 'gender'],
  ['publisher_platform', 'platform_position'],
  ['publisher_platform', 'impression_device'],
  ['publisher_platform', 'platform_position', 'impression_device'],
] as const

export interface BaseMetaBodyParameters {
  metrics: MetricType[]
  breakdowns: BreakdownType[]
  level: LevelType
  timeIncrement: TimeIncrementType
}

export interface EnumDateRangeParameters extends BaseMetaBodyParameters {
  dateRangeEnum: DateRangeEnumType
  dateRange?: never
}

export interface CustomDateRangeParameters extends BaseMetaBodyParameters {
  dateRange: DateRange
  dateRangeEnum?: never
}

export type MetaBodyParameters = EnumDateRangeParameters | CustomDateRangeParameters

export type FormResultStatus = 'idle' | 'success' | 'error'

export interface FormResult {
  status: FormResultStatus
  data: MetaDataItem[] | null
  message?: string
  query?: MetaBodyParameters
}

let formResult: FormResult = {
  status: 'idle',
  data: null,
}

export function getFormResult(): FormResult {
  return formResult
}

export function setFormResult(value: FormResult): void {
  formResult = value
}

export type MetricData = {
  date_start: string
  date_stop: string
  gender?: string
} & Partial<Record<MetricType, string | number>>

export type AggregatedMetric = {
  date_start: string
  date_stop: string
  gender?: string
} & Record<MetricType, number>
