'use client'

import { useState, useEffect } from 'react'
import { type DateRange } from 'react-day-picker'
import { type DateRangeEnumType, DATE_RANGE_ENUMS } from '@lib/meta'
import DatePickerWithRange from '@components/DateRangePicker'
import RadioButton from './RadioButton'

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const DateRangeButtons = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeEnumType | null>('last7')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  useEffect(() => {
    const form = document.querySelector('form')
    if (!form) return undefined

    const handleSubmit = () => {
      requestAnimationFrame(() => {
        setDateRange(undefined)
      })
    }

    form.addEventListener('submit', handleSubmit)
    return () => form.removeEventListener('submit', handleSubmit)
  }, [])

  const isCustomDateRangeSelected = dateRange !== undefined
    && dateRange.from !== undefined
    && dateRange.to !== undefined

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Date Range</h2>
      <div className="flex flex-wrap gap-2">
        {DATE_RANGE_ENUMS.map((range) => (
          <RadioButton
            key={range.value}
            id={`dateRange-${range.value}`}
            name="selectedDateRange"
            value={range.value}
            checked={selectedDateRange === range.value}
            onChange={(e) => {
              setSelectedDateRange(e.target.value as DateRangeEnumType)
              setDateRange(undefined)
            }}
          >
            {range.label}
          </RadioButton>
        ))}
      </div>
      <div className="space-y-2">
        <span className="text-sm text-muted-foreground">Or select a custom date range</span>
        <DatePickerWithRange
          date={dateRange}
          isSelected={selectedDateRange === null && isCustomDateRangeSelected}
          onSelect={(newDateRange) => {
            setDateRange(newDateRange)
            if (newDateRange && newDateRange.from && newDateRange.to) {
              setSelectedDateRange(null)
            }
          }}
          onOpenChange={(open) => {
            if (!open && (!dateRange || !dateRange.from || !dateRange.to) && !selectedDateRange) {
              setSelectedDateRange('last7')
            }
          }}
        />
        {isCustomDateRangeSelected && dateRange.from && dateRange.to && (
          <input
            type="hidden"
            name="dateRange"
            value={JSON.stringify({
              from: formatDate(dateRange.from),
              to: formatDate(dateRange.to),
            })}
          />
        )}
      </div>
    </div>
  )
}

export default DateRangeButtons
