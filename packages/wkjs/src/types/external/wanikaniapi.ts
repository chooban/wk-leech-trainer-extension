import { ReviewStatistic} from '../reviewstatistics'
import { Subject } from './subject'

interface WanikaniAPI {
  reviewStatistics(): Promise<ReviewStatistic[]>
  subject(id: number): Promise<Subject>
}

export { WanikaniAPI }
