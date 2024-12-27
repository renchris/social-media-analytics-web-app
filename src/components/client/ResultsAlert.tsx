/* eslint-disable react/require-default-props */

'use client'

import { useFormStatus } from 'react-dom'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import type { FormResultStatus } from '@lib/meta'

type ResultsAlertProps = {
  status: FormResultStatus
  message?: string
}

const ResultsAlert = ({
  status,
  message = 'Failed to fetch data',
}: ResultsAlertProps) => {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertTitle>Loading</AlertTitle>
        <AlertDescription>Fetching Meta analytics data...</AlertDescription>
      </Alert>
    )
  }

  if (status === 'idle') {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Submitted</AlertTitle>
        <AlertDescription>
          Select your parameters and submit the form to see results.
        </AlertDescription>
      </Alert>
    )
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  if (status === 'success') {
    return (
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Successfully fetched Meta analytics data</AlertDescription>
      </Alert>
    )
  }

  return null
}

export default ResultsAlert
