import { h, render } from 'preact'

interface OptionInputProps {
  key: string
  configKey: string
  label: string
  active: boolean
}
const OptionInput = ({ configKey, active, label }: OptionInputProps) => (
  <div>
    <input
      type="checkbox"
      id={configKey}
      value={configKey}
      name={configKey}
      checked={active}
      onClick={(e) => {
        const config = {}
        config[configKey] = (e.target as HTMLInputElement).checked

        chrome.storage.sync.set(config, () => {
          chrome.tabs.query(
            {
              url: [
                '*://www.wanikani.com/',
                '*://www.wanikani.com/dashboard',
                '*://www.wanikani.com/kanji/*',
                '*://www.wanikani.com/vocabulary/*',
                '*://www.wanikani.com/radicals/*',
              ],
            },
            (tabs) => {
              tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, { action: 'settingsUpdated' }))
            },
          )
        })
      }}
    />
    <label htmlFor={configKey}>{label}</label>
  </div>
)

const Options = ({ options }: { options: Omit<OptionInputProps, 'key'>[] }) => (
  <div>
    {options.map((opt) => (
      <OptionInput key={opt.configKey} configKey={opt.configKey} active={opt.active} label={opt.label} />
    ))}
  </div>
)

const options = [
  {
    configKey: 'showLeechCount',
    label: 'Show leech count',
    active: false,
  },
  {
    configKey: 'showSrsStats',
    label: 'Show SRS stats',
    active: false,
  },
  {
    configKey: 'skipReviewsSummary',
    label: 'Skip reviews summary before reviews',
    active: false,
  },
]

document.addEventListener('DOMContentLoaded', () => {
  const defaultOptions = options.reduce(
    (acc, opt) => ({
      ...acc,
      [opt.configKey]: false,
    }),
    {},
  )

  chrome.storage.sync.get(defaultOptions, (settings) => {
    const opts = options.map((o) => ({
      ...o,
      active: settings[o.configKey],
    }))

    render(<Options options={opts} />, document.getElementById('app'))
  })
})
