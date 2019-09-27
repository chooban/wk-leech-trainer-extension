import { Substitute, Arg } from '@fluffy-spoon/substitute'
import { WanikaniAPI, ReviewStatistic } from '@chooban/wkjs'

import { leeches } from '../leeches'

describe('Leech API', () => {
  const baseAssignment: ReviewStatistic = Object.freeze({
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
  })

  test('copes with an empty set of assignments', async () => {
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics(Arg.any()).returns(Promise.resolve([]))
    try {
      const foundLeeches = await leeches(api)

      expect(foundLeeches).toEqual([])
    } catch (e) {
      console.error({ e })
      throw e
    }
  })

  test('apprentice items are not included', async () => {
    const foundAssignment: ReviewStatistic = { ...baseAssignment, meaning_correct: 3 }
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics(Arg.any()).returns(Promise.resolve([foundAssignment]))

    const returnedStats = await leeches(api)

    expect(returnedStats).toHaveLength(0)
  })

  test('radicals are not included', async () => {
    const foundAssignments: ReviewStatistic[] = [baseAssignment, { ...baseAssignment, subject_type: 'radical' }]
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics(Arg.any()).returns(Promise.resolve(foundAssignments))

    const returnedStats = await leeches(api)

    expect(returnedStats).toHaveLength(1)
  })

  test('scores are added', async () => {
    const foundAssignment: ReviewStatistic = { ...baseAssignment }
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics(Arg.any()).returns(Promise.resolve([foundAssignment]))

    const returnedStats = await leeches(api)

    expect(returnedStats).toHaveLength(1)
    expect(returnedStats[0].reading_score).toBe(1.15)
    expect(returnedStats[0].meaning_score).toBe(1.15)
  })

  test('leech if reading score > leech score', async () => {
    const foundAssignment: ReviewStatistic = { ...baseAssignment, meaning_current_streak: 4 }
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics(Arg.any()).returns(Promise.resolve([foundAssignment]))

    const returnedStats = await leeches(api)

    expect(returnedStats).toHaveLength(1)
    expect(returnedStats[0].reading_score).toBe(1.15)
    expect(returnedStats[0].meaning_score).toBe(0.75)
  })

  test('leech if meaning score > leech score', async () => {
    const foundAssignment: ReviewStatistic = {
      ...baseAssignment,
      reading_current_streak: 4,
    }
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics(Arg.any()).returns(Promise.resolve([foundAssignment]))

    const returnedStats = await leeches(api)

    expect(returnedStats).toHaveLength(1)
    expect(returnedStats[0].reading_score).toBe(0.75)
    expect(returnedStats[0].meaning_score).toBe(1.15)
  })

  test('not a leech if both scores < leech score', async () => {
    const foundAssignment: ReviewStatistic = { ...baseAssignment, meaning_current_streak: 4, reading_current_streak: 4 }
    const api = Substitute.for<WanikaniAPI>()
    api.reviewStatistics(Arg.any()).returns(Promise.resolve([foundAssignment]))

    const returnedStats = await leeches(api)

    expect(returnedStats).toHaveLength(0)
  })
})
