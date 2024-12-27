'use client'

import { type DateRange } from 'react-day-picker'
import { type DateRangeEnumType } from '@lib/meta'
import DatePickerWithRange from '@components/DateRangePicker'

interface CustomDateRangePickerProps {
  dateRange: DateRange | undefined
  selectedDateRange: DateRangeEnumType | null
  setSelectedDateRange: (dateRange: DateRangeEnumType | null) => void
  setDateRange: (dateRange: DateRange | undefined) => void
}

const CustomDateRangePicker = ({
  dateRange,
  selectedDateRange,
  setSelectedDateRange,
  setDateRange,
}: CustomDateRangePickerProps) => (
  <div className="space-y-2">
    <span className="text-sm text-muted-foreground">Or select a custom date range</span>
    <DatePickerWithRange
      date={dateRange}
      isSelected={Boolean(!selectedDateRange && dateRange?.from && dateRange.to)}
      onSelect={(newDateRange) => {
        setDateRange(newDateRange)
        if (newDateRange?.from && newDateRange.to) {
          setSelectedDateRange(null)
        }
      }}
      onOpenChange={(open) => {
        if (!open && (!dateRange?.to || !dateRange?.from) && !selectedDateRange) {
          setSelectedDateRange('last7')
        }
      }}
    />
  </div>
)

export default CustomDateRangePicker
