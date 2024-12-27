/* eslint-disable react/require-default-props */

'use client'

import { type ChangeEvent } from 'react'
import cn from '@lib/utils'

interface CheckboxButtonProps {
  id: string
  name: string
  value: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  children: React.ReactNode
}

const CheckboxButton = ({
  id,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  children,
}: CheckboxButtonProps) => (
  <div>
    <input
      type="checkbox"
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
      className={cn(
        'flex h-auto min-h-[40px] w-[180px] cursor-pointer items-center justify-start px-4 py-2 text-sm font-medium',
        'ring-offset-background transition-colors rounded-md border border-input bg-background',
        'hover:bg-accent hover:text-accent-foreground',
        'peer-checked:bg-primary peer-checked:text-primary-foreground',
        disabled && 'cursor-not-allowed opacity-50 hover:bg-background hover:text-foreground',
      )}
    >
      {children}
    </label>
  </div>
)

export default CheckboxButton
