export interface WanikaniResourceResponse<T> {
  id: number;
  'object': string;
  url: string;
  data_updated_at: Date;
  data: T;
}

export interface WanikaniCollectionResponse<T> {
  'object': string;
  url: string;
  pages: {
    per_page: number;
    next_url?: string;
    previous_url?: string;
  };
  total_count: number;
  data_updated_at: Date;
  data: T[];
}
