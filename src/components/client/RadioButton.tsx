/* eslint-disable react/require-default-props */

'use client'

import { type ChangeEvent } from 'react'

interface RadioButtonProps {
  id: string
  name: string
  value: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  children: React.ReactNode
}

const RadioButton = ({
  id,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  children,
}: RadioButtonProps) => (
  <div>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      className="peer hidden"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <label
      htmlFor={id}
      className="flex h-auto min-h-[40px] w-[180px] cursor-pointer items-center justify-start px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground rounded-md border border-input bg-background"
    >
      {children}
    </label>
  </div>
)

export default RadioButton
