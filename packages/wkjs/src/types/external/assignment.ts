import { Assignment as InternalAssignment } from '../assignment'

export interface Assignment extends InternalAssignment {
  readonly id: number;
}
