import { h, render } from 'preact'

const OptionInput = ({ opt }) => (
  <div>
    <input
      type="checkbox"
      id={opt.configKey}
      value={opt.configKey}
      name={opt.configKey}
      checked={opt.active}
      onClick={(e) => {
        const config = {}
        config[opt.configKey] = e.target.checked

        chrome.storage.sync.set(config, () => {
          chrome.tabs.query({
            url: [
              '*://www.wanikani.com/',
              '*://www.wanikani.com/dashboard',
              '*://www.wanikani.com/kanji/*',
              '*://www.wanikani.com/vocabulary/*',
              '*://www.wanikani.com/radicals/*'
            ]
          }, (tabs) => {
            console.log(tabs.map((tab) => tab.id).join())
            tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, { action: 'settingsUpdated' }))
          })
        })
      }}
    />
    <label htmlFor={opt.configKey}>{opt.label}</label>
  </div>
)


const Options = ({ options }) => (
  <div>
    {options.map((opt) => (
      <OptionInput
        key={opt.configKey}
        opt={opt}
      />
    ))}
  </div>
)


const options = [
  {
    configKey: 'showLeechCount',
    label: 'Show leech count',
    active: false
  }, {
    configKey: 'showSrsStats',
    label: 'Show SRS stats',
    active: false
  }
]

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    showLeechCount: false,
    showSrsStats: false
  },
  (settings) => {
    const opts = options.map((o) => ({
      ...o,
      active: settings[o.configKey]
    }))

    render(
      (<Options options={opts} />),
      document.getElementById('app')
    )
  })
})