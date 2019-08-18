import { Substitute } from '@fluffy-spoon/substitute'
import { WanikaniAPI, ReviewStatistic } from '@chooban/wkjs'

import { leeches } from '../leeches'

describe('Leech API', () => {
  test('copes with an empty set of assignments', async () => {
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics().returns(Promise.resolve([]))

    const foundLeeches = await leeches(api)

    expect(foundLeeches).toEqual([])
  })
  test('apprentice items are not included', async () => {
    const foundAssignment: ReviewStatistic = {
      id: 81704544,
      created_at: new Date('2017-09-18T10:25:08.428110Z'),
      subject_id: 441,
      subject_type: 'kanji',
      meaning_correct: 2,
      meaning_incorrect: 6,
      meaning_max_streak: 4,
      meaning_current_streak: 3,
      reading_correct: 4,
      reading_incorrect: 6,
      reading_max_streak: 4,
      reading_current_streak: 3,
      percentage_correct: 50,
      hidden: false,
    }
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics().returns(Promise.resolve([foundAssignment]))
    const returnedStats = await leeches(api)
    expect(returnedStats).toHaveLength(0)
  })

  test('scores are added', async () => {
    const foundAssignment: ReviewStatistic = {
      id: 81704544,
      created_at: new Date('2017-09-18T10:25:08.428110Z'),
      subject_id: 441,
      subject_type: 'kanji',
      meaning_correct: 4,
      meaning_incorrect: 6,
      meaning_max_streak: 4,
      meaning_current_streak: 3,
      reading_correct: 4,
      reading_incorrect: 6,
      reading_max_streak: 4,
      reading_current_streak: 3,
      percentage_correct: 50,
      hidden: false,
    }
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics().returns(Promise.resolve([foundAssignment]))

    const returnedStats = await leeches(api)
    expect(returnedStats).toHaveLength(1)
    expect(returnedStats[0].reading_score).toBe(1.15)
    expect(returnedStats[0].meaning_score).toBe(1.15)
  })
})
