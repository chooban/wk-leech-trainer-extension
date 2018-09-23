let leechData

// eslint-disable-next-line
const refresh = (apiKey) => (
  // eslint-disable-next-line
  fetch(__LESSONS_URL__ + apiKey)
    .then((r) => r.text())
    .then((l) => {
      leechData = JSON.parse(l)
    })
)

const count = () => leechData.leeches_available
const lessonItems = () => leechData.leech_lesson_items

export {
  refresh,
  count,
  lessonItems
}
