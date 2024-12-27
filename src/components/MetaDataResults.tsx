import {
  aggregateMetricsByDate,
  FormResult, getFormResult, MetricData,
} from '@lib/meta'
import ResultsAlert from '@client/ResultsAlert'

const MetaDataResults = () => {
  const formResult: FormResult = getFormResult()

  const formattedData = formResult.status === 'success' && formResult.data && formResult.query
    ? aggregateMetricsByDate(
      ('data' in formResult.data ? formResult.data.data : formResult.data) as MetricData[],
    )
    : {}

  return (
    <div className="space-y-8">
      <ResultsAlert status={formResult.status} message={formResult.message} />
      {formResult.status === 'success' && formResult.data && (
        <div className="space-y-4">
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
