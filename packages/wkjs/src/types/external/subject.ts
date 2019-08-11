import { Subject as InternalSubject } from '../subject'

export interface Subject extends InternalSubject {
  readonly id: number;
}
