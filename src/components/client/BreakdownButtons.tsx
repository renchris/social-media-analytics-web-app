'use client'

import { useState } from 'react'
import { type BreakdownType, BREAKDOWNS, VALID_BREAKDOWN_COMBINATIONS } from '@lib/meta'
import CheckboxButton from './CheckboxButton'

const BreakdownButtons = () => {
  const [selectedBreakdowns, setSelectedBreakdowns] = useState<BreakdownType[]>([])

  const isBreakdownDisabled = (breakdown: BreakdownType) => {
    if (selectedBreakdowns.includes(breakdown)) return false
    if (selectedBreakdowns.length === 0) return false
    const newBreakdowns = [...selectedBreakdowns, breakdown].sort()
    return !VALID_BREAKDOWN_COMBINATIONS.some(
      (combo: BreakdownType[]) => combo.length === newBreakdowns.length
        && [...combo].sort().every((value, index) => value === newBreakdowns[index]),
    )
  }

  const toggleBreakdown = (breakdown: BreakdownType) => {
    setSelectedBreakdowns((current) => {
      if (current.includes(breakdown)) {
        return current.filter((b) => b !== breakdown)
      }
      const newBreakdowns = [...current, breakdown]
      const isValidCombination = VALID_BREAKDOWN_COMBINATIONS.some(
        (combo: BreakdownType[]) => newBreakdowns.every((b) => combo.includes(b)),
      )
      return isValidCombination || newBreakdowns.length === 1 ? newBreakdowns : current
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Breakdowns</h2>
        <p className="text-sm text-muted-foreground">
          Select one or a combination of age + gender or platform + position and/or device.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {BREAKDOWNS.map((breakdown) => {
          const isDisabled = !selectedBreakdowns.includes(breakdown.value)
            && isBreakdownDisabled(breakdown.value)
          return (
            <CheckboxButton
              key={breakdown.value}
              id={`breakdown-${breakdown.value}`}
              name="breakdowns"
              value={breakdown.value}
              checked={selectedBreakdowns.includes(breakdown.value)}
              onChange={() => toggleBreakdown(breakdown.value)}
              disabled={isDisabled}
            >
              {breakdown.label}
            </CheckboxButton>
          )
        })}
      </div>
    </div>
  )
}

export default BreakdownButtons
