import { ReviewStatistics } from './reviewstatistics'

export interface WanikaniResponse {
  'object': string;
  url: string;
  pages: {
    per_page: number;
    next_url?: string;
    previous_url?: string;
  };
  total_count: number;
  data_updated_at: Date;
  data: Array<ReviewStatistics>;
}
