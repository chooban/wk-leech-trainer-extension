import { WanikaniResourceResponse } from '.'

export interface Assignment {
  readonly created_at: Date,
  readonly subject_id: number,
  readonly subject_type: string,
  readonly level: number,
  readonly srs_stage: number,
  readonly srs_stage_name: string,
  readonly unlocked_at?: Date,
  readonly started_at?: Date,
  readonly passed_at?: Date,
  readonly burned_at?: Date,
  readonly available_at?: Date,
  readonly resurrected_at?: Date,
  readonly passed: boolean,
  readonly resurrected: boolean,
  readonly hidden: boolean,
}

export interface AssignmentResponse extends WanikaniResourceResponse<Assignment> {
}
