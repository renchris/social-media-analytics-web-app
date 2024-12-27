import { getLevel, LEVELS } from '@lib/meta'
import RadioButton from './RadioButton'

const LevelButtons = () => {
  const selectedLevel = getLevel()
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Level</h2>
      <div className="flex flex-wrap gap-2">
        {LEVELS.map((level) => (
          <RadioButton
            key={level.value}
            id={`level-${level.value}`}
            name="level"
            value={level.value}
            defaultChecked={level.value === selectedLevel}
          >
            {level.label}
          </RadioButton>
        ))}
      </div>
    </div>
  )
}

export default LevelButtons
