import { ReviewStatistics } from './reviewstatistics'

interface WanikaniAPI {
  getReviewStatistics(): Promise<ReviewStatistics[]>
  subject(id: number): Promise<any>
}

export { WanikaniAPI }
