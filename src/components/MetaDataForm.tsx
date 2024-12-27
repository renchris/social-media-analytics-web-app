import handleFormSubmit from '@actions/formActions'
import LevelButtons from '@components/LevelButtons'
import TimeIncrementButtons from '@components/TimeIncrementButtons'
import MetaDataResults from '@components/MetaDataResults'
import MetricsButtons from '@client/MetricsButtons'
import BreakdownButtons from '@client/BreakdownButtons'
import DateRangeButtons from '@client/DateRangeButtons'
import SubmitButton from '@client/SubmitButton'

const MetaDataForm = () => (
  <div className="w-full space-y-8">
    <form action={handleFormSubmit} className="space-y-8">
      <MetricsButtons />
      <BreakdownButtons />
      <DateRangeButtons />
      <LevelButtons />
      <TimeIncrementButtons />
      <SubmitButton />
      <MetaDataResults />
    </form>
  </div>
)

export default MetaDataForm
