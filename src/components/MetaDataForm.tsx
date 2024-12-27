import { Button } from '@components/ui/button'
import handleFormSubmit from '@actions/formActions'
import LevelButtons from '@components/LevelButtons'
import TimeIncrementButtons from '@components/TimeIncrementButtons'
import MetricsButtons from '@client/MetricsButtons'
import BreakdownButtons from '@client/BreakdownButtons'
import DateRangeButtons from '@client/DateRangeButtons'

const MetaDataForm = () => (
  <div className="w-full space-y-8">
    <form
      action={handleFormSubmit}
      className="space-y-8"
    >
      <MetricsButtons />
      <BreakdownButtons />
      <DateRangeButtons />
      <LevelButtons />
      <TimeIncrementButtons />
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  </div>
)

export default MetaDataForm
