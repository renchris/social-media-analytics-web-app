import { getTimeIncrement, TIME_INCREMENTS } from '@lib/meta'
import RadioButton from './RadioButton'

const TimeIncrementButtons = () => {
  const selectedTimeIncrement = getTimeIncrement()
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Time Increment</h2>
      <div className="flex flex-wrap gap-2">
        {TIME_INCREMENTS.map((increment) => (
          <RadioButton
            key={increment.value}
            id={`timeIncrement-${increment.value}`}
            name="timeIncrement"
            value={increment.value}
            defaultChecked={increment.value === selectedTimeIncrement}
          >
            {increment.label}
          </RadioButton>
        ))}
      </div>
    </div>
  )
}

export default TimeIncrementButtons
