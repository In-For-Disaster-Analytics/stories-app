export interface Project {
  id: number;
  title: string;
  description: string;
  chargeCode: string;
  gid: number;
  source: any;
  fieldId: number;
  field: string;
  typeId: number;
  type: string;
  piId: number;
  pi: Pi;
  allocations: Allocation[];
  nickname: any;
  members: User[];
}
interface User {
  id: number;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Pi {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  institutionId: number;
  department: string;
  departmentId: number;
  citizenship: string;
  citizenshipId: number;
  source: string;
  uid: number;
  homeDirectory: string;
  gid: number;
}

export interface Allocation {
  id: number;
  start: string;
  end: string;
  status: string;
  justification: string;
  decisionSummary: any;
  dateRequested: string;
  dateReviewed: any;
  computeRequested: number;
  computeAllocated: number;
  storageRequested: number;
  storageAllocated: number;
  memoryRequested: number;
  memoryAllocated: number;
  resourceId: number;
  resource: string;
  projectId: number;
  project: string;
  requestorId: number;
  requestor: string;
  reviewerId: number;
  reviewer: any;
  computeUsed: number;
}
