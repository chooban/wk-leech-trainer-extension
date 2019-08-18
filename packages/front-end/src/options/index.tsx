import { h, render } from 'preact'

export enum OptionTypes {
  SHOW_LEECH_COUNT = 'showLeechCount',
  SHOW_SRS_STATS = 'showSrsStats',
  SKIP_REVIEW_SUMMARY = 'skipReviewsSummary',
}

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
    configKey: OptionTypes.SHOW_LEECH_COUNT,
    label: 'Show leech count',
    active: false,
  },
  {
    configKey: OptionTypes.SHOW_SRS_STATS,
    label: 'Show SRS stats',
    active: false,
  },
  {
    configKey: OptionTypes.SKIP_REVIEW_SUMMARY,
    label: 'Skip reviews summary before reviews',
    active: false,
  },
]

document.addEventListener('DOMContentLoaded', async () => {
  const defaultOptions = options.reduce(
    (acc, opt) => ({
      ...acc,
      [opt.configKey]: false,
    }),
    {},
  )

  const settings = await browser.storage.sync.get(defaultOptions)
  const opts = options.map((o) => ({
    ...o,
    active: settings[o.configKey],
  }))

  render(<Options options={opts} />, document.getElementById('app'))
})
