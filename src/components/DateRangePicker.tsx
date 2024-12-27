/* eslint-disable react/require-default-props */

'use client'

import { forwardRef } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { type DateRange } from 'react-day-picker'

import cn from '@lib/utils'
import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover'

type DatePickerWithRangeProps = {
  className?: string
  date?: DateRange
  onSelect?:(date: DateRange | undefined) => void
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  isSelected?: boolean
}

const DatePickerWithRange = forwardRef<HTMLDivElement, DatePickerWithRangeProps>(
  ({
    className,
    date,
    onSelect,
    onOpenChange,
    disabled,
    isSelected,
  }, ref) => (
    <div ref={ref} className={cn('grid gap-2', className)}>
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {!date?.from && <span>Pick a date</span>}
            {date?.from && !date.to && format(date.from, 'LLL dd, y')}
            {date?.from && date.to && (
              <>
                {format(date.from, 'LLL dd, y')}
                {' '}
                -
                {' '}
                {format(date.to, 'LLL dd, y')}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  ),
)

DatePickerWithRange.displayName = 'DatePickerWithRange'

export default DatePickerWithRange
