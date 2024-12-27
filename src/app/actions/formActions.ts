'use server'

import { revalidatePath } from 'next/cache'
import {
  type MetricType,
  type BreakdownType,
  type LevelType,
  type DateRangeEnumType,
  type TimeIncrementType,
  type MetaBodyParameters,
  setFormResult,
} from '@lib/meta'

const BASE_URL = 'https://bizdev.newform.ai'
const META_ENDPOINT = '/sample-data/meta'

export default async function handleFormSubmit(formData: FormData): Promise<void> {
  const metrics = formData.getAll('metrics') as MetricType[]
  const breakdowns = formData.getAll('breakdowns') as BreakdownType[]
  const dateRangeEnum = formData.get('selectedDateRange') as DateRangeEnumType
  const dateRangeString = formData.get('dateRange') as string
  const dateRange = dateRangeString ? JSON.parse(dateRangeString) : null
  const level = formData.get('level') as LevelType
  const timeIncrement = formData.get('timeIncrement') as TimeIncrementType

  const bodyParameters: MetaBodyParameters = {
    metrics,
    breakdowns,
    level,
    timeIncrement,
    ...(dateRange ? { dateRange } : { dateRangeEnum }),
  }

  try {
    const response = await fetch(`${BASE_URL}${META_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyParameters),
    })

    if (!response.ok) {
      throw new Error(`Failed to submit data: ${response.status}`)
    }

    const data = await response.json()
    setFormResult({
      status: 'success',
      data,
      query: bodyParameters,
    })
    revalidatePath('/', 'layout')
  } catch (error) {
    setFormResult({
      status: 'error',
      data: null,
      message: error instanceof Error ? error.message : 'Failed to submit form',
      query: bodyParameters,
    })
    revalidatePath('/', 'layout')
  }
}
