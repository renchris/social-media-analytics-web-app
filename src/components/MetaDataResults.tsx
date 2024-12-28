import {
  getFormResult, type FormResult, type MetricData, type MetricType,
} from '@lib/meta'
import ResultsAlert from '@client/ResultsAlert'
import AreaChart from '@components/AreaChart'

interface FormattedMetricData {
  date_start: string
  date_stop: string
  [key: string]: string | number | undefined
}

interface AggregatedData extends MetricData {
  age?: string
  gender?: string
  original_age?: string
  age_range?: string
}

const MetaDataResults = () => {
  const formResult: FormResult = getFormResult()

  const rawData = formResult.status === 'success' && formResult.data
    ? ('data' in formResult.data ? formResult.data.data : formResult.data) as AggregatedData[]
    : []

  const hasBreakdown = rawData.length > 0 && rawData[0]
    && (rawData.some((d) => d.age) || rawData.some((d) => d.gender))
  const breakdownType = hasBreakdown && rawData.some((d) => d.age) ? 'age' : 'gender'

  const formattedData = rawData.reduce<FormattedMetricData[]>((acc, curr) => {
    if (!curr) return acc

    const existingDate = acc.find((item) => item.date_start === curr.date_start)
    const availableMetrics = Object.keys(curr).filter((key) => !['date_start', 'date_stop', 'age', 'gender'].includes(key)) as MetricType[]

    if (existingDate) {
      if (hasBreakdown && curr[breakdownType]) {
        // Add or update breakdown-specific metrics
        availableMetrics.forEach((metric) => {
          const key = `${curr[breakdownType]}_${metric}` as keyof FormattedMetricData
          // Sum up values for the same breakdown
          existingDate[key] = (existingDate[key] as number || 0) + Number(curr[metric] || 0)
        })
      } else {
        // Add regular metrics
        availableMetrics.forEach((metric) => {
          existingDate[metric] = (existingDate[metric] as number || 0) + Number(curr[metric] || 0)
        })
      }
    } else {
      // Create new entry
      const newEntry: FormattedMetricData = {
        date_start: curr.date_start,
        date_stop: curr.date_stop,
      }

      if (hasBreakdown && curr[breakdownType]) {
        availableMetrics.forEach((metric) => {
          const key = `${curr[breakdownType]}_${metric}` as keyof FormattedMetricData
          newEntry[key] = Number(curr[metric] || 0)
        })
      } else {
        availableMetrics.forEach((metric) => {
          newEntry[metric] = Number(curr[metric] || 0)
        })
      }

      acc.push(newEntry)
    }
    return acc
  }, [])

  return (
    <div className="space-y-8">
      <ResultsAlert status={formResult.status} message={formResult.message} />
      {formResult.status === 'success' && formResult.data && (
        <div className="space-y-4">
          <AreaChart data={formattedData} />
          <div>
            <h3 className="mb-2 font-medium">API Query</h3>
            <pre className="max-h-[200px] overflow-auto rounded-lg border bg-muted p-4 text-sm">
              {JSON.stringify(formResult.query, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Raw API Response</h3>
            <pre className="max-h-[200px] overflow-auto rounded-lg border bg-muted p-4 text-sm">
              {JSON.stringify(formResult.data, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Formatted Data for Chart</h3>
            <pre className="max-h-[200px] overflow-auto rounded-lg border bg-muted p-4 text-sm">
              {JSON.stringify(formattedData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default MetaDataResults
